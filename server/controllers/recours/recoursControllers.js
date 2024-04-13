const db = require('./../../db/connect');
const path = require('path');
 

// soumetre recours 
const soumetreRecours=async (req,res,next)=>{
   
    
    try {
        const params=JSON.parse(req.query.data);
    const {objet,emetteur,commission,id_assure,id_agence,volet,motif}=params;
    const values=[objet,emetteur,commission,id_assure,id_agence,volet,motif];
  
      
    const query='INSERT INTO recours (objet,emetteur,commission,id_assure,id_agence,volet,motif) VALUES (?)';
   db.query(query,[values],(error, results,)=>{
      if(error){
        
          return res.json(error)} ;
   
      db.query('SELECT LAST_INSERT_ID()', function (error, results, fields) {
          if (error) {
            
              throw error};
      
          const lastInsertedId = results[0]['LAST_INSERT_ID()'];
          console.log(lastInsertedId)
   
          
          req.app.locals.path={
                  id_assure:12,
                  id_recours:lastInsertedId
              };
  
              
              next();
          });
          
      })   
    } catch (error) {
  
 
    }
   
         
      }


// pieces controller 
const soumetre_piece=async(req,res)=>{
    
    const propertyValues = Object.values(req?.files);
 
    let values=[];
//  console.log(propertyValues)
    for(let i=0;i<propertyValues?.length;i++){ 

  //       let type= path.extname(propertyValues[i]?.originalname);

  // let v=[propertyValues[i].originalname,propertyValues[0]?.path,req.app.locals.path.id_recours,type];
  // // values.push(v);}

  //   values.push(v);
if(i===2 &&propertyValues[i]?.length >= 1){
   
  propertyValues[i]?.map(val=>{
 
    let type3= path.extname(val?.originalname);
    let v3=[val.originalname,val?.path,req.app.locals.path.id_recours,type3];
    values.push(v3);
  }) 
}
else if(i<2){ 
  let type= path.extname(propertyValues[i][0]?.originalname);

  let v=[propertyValues[i][0].originalname,propertyValues[i][0]?.path,req.app.locals.path.id_recours,type];
  values.push(v);
}
    }
    // console.log("values",values)

    const sql='insert into pieces (nom,chemin,id_recours,type) Values ?';
    console.log("values",values);

    db.query(sql,[values],(err,result)=>{
      if(err)return res.json(err);
      return res.json({success:"Recours ajoute avec succes"})
       })
}




//get recours
const getRecours = async(req, res)=>{

    const sql='select * from recours';
    db.query(sql, (err, result)=>{
        if(err)
            return res.json({statut: "erreur", message: "Une erreur est survenue"});
        else
            return res.json({statut: "success", resultat: result})
    })
}



// verifcation 
const verfication=async(req,res)=>{
    const {type,id_decision,id_reunion}=req.query;
    // console.log(typeof(+id_decision))
    // console.log("error",id_decision)
    if(+type===1){
        console.log("type1")
        const values = [+id_reunion,+id_decision];
        console.log(values)
        const sql = 'SELECT id_recours FROM decisions WHERE id_reunion = ? AND id_decision = ?';
        db.query(sql,values,(err,results)=>{
            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: 'Internal server error' });
              }
              
              if (results.length > 0) {
                return res.status(200).json({ message: 'Ce recours est déjà effectué au niveau local' });
              } else {
                return res.status(200).json({ message: "Ce recours n'existe pas" });
              }
          })
    }else if(+type===2){
        const q='SELECT id_decision_conteste FROM recours WHERE id_assure = 2 AND DATE(date) = ?';
         console.log(id_reunion)
        db.query(q,[id_reunion],(err,result)=>{
            if(err)return res.json(err.message);
              console.log("first",result)
            if (result.length > 0) {
     
 
                for (const resu of result) {
                  if (resu.id_decision_conteste === null) {
                    return res.status(200).json({ message: "Ce recours est déjà effectué au niveau local" });
                  }  
                }
                return res.status(200).json({ message: 'ce recours a déjà une décision' });
            
              } else {
                return res.status(200).json({ message: "Ce recours n'existe pas" });
              }
             })
    }
}


const getDocuments =async (req, res) => {
  
  const sql='select * from pieces where id_recours = ?';
    db.query(sql, [req.query.id_recours], (err, result)=>{
        if(err)
            return res.json({statut: "erreur", message: "Une erreur est survenue"});
        else
            return res.json({statut: "success", resultat: result})
    })

}



//get Decisions
const getDecisions = async(req, res)=>{

  const sql= "SELECT decisions.*, reunions.date AS date_reunion, decisions.date AS date_decision FROM decisions JOIN reunions ON decisions.id_reunion = reunions.id_reunion" ;
  db.query(sql, (err, result)=>{
      if(err)
          return res.json({statut: "erreur", message: "Une erreur est survenue"});
      else
          return res.json({statut: "success", resultat: result})
  })
}


// envoyer un seul recours selon l'id recu
const getRecours2 = async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const sql = 'SELECT recours.*, agences.nom_agence FROM recours LEFT JOIN agences ON recours.id_agence = agences.id_agence WHERE recours.id_recours = ?';
  db.query(sql, [id], (err, result)=>{
      if(err)
          return res.json({statut: "erreur", message: "Une erreur est survenue"});
      else
          return res.json({statut: "success", resultat: result[0]})
  })
}




module.exports={soumetreRecours, soumetre_piece, getRecours, verfication, getDocuments, getDecisions, getRecours2}
  
  
//   db = require('./../../db/connect');
// const path = require('path');
 

// // soumetre recours 
// const soumetreRecours=async (req,res,next)=>{
   
    
//     try {
//         const params=JSON.parse(req.query.data);
//     const {objet,emetteur,commission,id_assure,id_agence,volet,motif}=params;
//     const values=[objet,emetteur,commission,id_assure,id_agence,volet,motif];
  
      
//     const query='INSERT INTO recours (objet,emetteur,commission,id_assure,id_agence,volet,motif) VALUES (?)';
//    db.query(query,[values],(error, results,)=>{
//       if(error){
        
//           return res.json(error)} ;
   
//       db.query('SELECT LAST_INSERT_ID()', function (error, results, fields) {
//           if (error) {
            
//               throw error};
      
//           const lastInsertedId = results[0]['LAST_INSERT_ID()'];
//           console.log(lastInsertedId)
   
          
//           req.app.locals.path={
//                   id_assure:12,
//                   id_recours:lastInsertedId
//               };
  
              
//               next();
//           });
          
//       })   
//     } catch (error) {
  
 
//     }
   
         
//       }



// // pieces controller 
// const soumetre_piece=async(req,res)=>{
    
//     const propertyValues = Object.values(req?.files);
 
//     let values=[];
// //  console.log(propertyValues)
//     for(let i=0;i<propertyValues?.length;i++){ 

//   //       let type= path.extname(propertyValues[i]?.originalname);

//   // let v=[propertyValues[i].originalname,propertyValues[0]?.path,req.app.locals.path.id_recours,type];
//   // // values.push(v);}

//   //   values.push(v);
// if(i===2 &&propertyValues[i]?.length>1){
   
//   propertyValues[i]?.map(val=>{
 
//     let type3= path.extname(val?.originalname);
//     let v3=[val.originalname,val?.path,req.app.locals.path.id_recours,type3];
//     values.push(v3);
//   }) 
// }
// else if(i<2){ 
//   let type= path.extname(propertyValues[i][0]?.originalname);

//   let v=[propertyValues[i][0].originalname,propertyValues[i][0]?.path,req.app.locals.path.id_recours,type];
//   values.push(v);
// }
//     }
//     console.log("values",values)

//     const sql='insert into pieces (nom,chemin,id_recours,type) Values ?';
//     console.log("values",values);

//     db.query(sql,[values],(err,result)=>{
//       if(err)return res.json(err);
//       return res.json({success:"Recours ajoute avec succes"})
//        })
// }



// //get recours
// const getRecours = (req, res)=>{

//     const sql='select * from recours';
//     db.query(sql, (err, result)=>{
//         if(err)
//             return res.json({statut: "erreur", message: "Une erreur est survenue"});
//         else
//             return res.json({statut: "success", resultat: result})
//     })   
// }





// // verifcation 
// const verfication=async(req,res)=>{
//     const {type,id_decision,id_reunion}=req.query;
//     // console.log(typeof(+id_decision))
//     // console.log("error",id_decision)
//     if(+type===1){
//         console.log("type1")
//         const values = [+id_reunion,+id_decision];
//         console.log(values)
//         const sql = 'SELECT id_recours FROM decisions WHERE id_reunion = ? AND id_decision = ?';
//         db.query(sql,values,(err,results)=>{
//             if (err) {
//                 console.error('Error executing query:', err);
//                 return res.status(500).json({ error: 'Internal server error' });
//               }
              
//               if (results.length > 0) {
//                 return res.status(200).json({ message: 'Ce recours est déjà effectué au niveau local' });
//               } else {
//                 return res.status(200).json({ message: "Ce recours n'existe pas" });
//               }
//           })
//     }else if(+type===2){
//         const q='SELECT id_decision_conteste FROM recours WHERE id_assure = 2 AND DATE(date) = ?';
//          console.log(id_reunion)
//         db.query(q,[id_reunion],(err,result)=>{
//             if(err)return res.json(err.message);
//               console.log("first",result)
//             if (result.length > 0) {
     
 
//                 for (const resu of result) {
//                   if (resu.id_decision_conteste === null) {
//                     return res.status(200).json({ message: "Ce recours est déjà effectué au niveau local" });
//                   }  
//                 }
//                 return res.status(200).json({ message: 'ce recours a déjà une décision' });
            
//               } else {
//                 return res.status(200).json({ message: "Ce recours n'existe pas" });
//               }
//              })
//     }
// }

// module.exports={soumetreRecours,soumetre_