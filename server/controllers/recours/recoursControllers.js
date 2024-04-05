const db = require('./../../db/connect');
const path = require('path');
 

// soumetre recours 
const soumetreRecours=async (req,res,next)=>{
    console.log(req.query.data);
    
    try {
        const params=JSON.parse(req.query.data);
      //   console.log(value);
    
    const {objet,emetteur,commission,id_assure,id_agence}=params;
    const values=[objet,emetteur,commission];
      
    const query='INSERT INTO recours (objet,emetteur,commission) VALUES (?)';
   db.query(query,[values],(error, results,)=>{
      if(error){
          console.log("error1")
          return res.json(error)} ;
   
      db.query('SELECT LAST_INSERT_ID()', function (error, results, fields) {
          if (error) {
              console.log("error")
              throw error};
      
          const lastInsertedId = results[0]['LAST_INSERT_ID()'];
          console.log('Last inserted ID:', lastInsertedId);
   
          
          req.app.locals.path={
                  id_assure:12,
                  id_recours:lastInsertedId
              };
  
              
              next();
          });
          
      })   
    } catch (error) {
      console.log("first")
      console.log(error)
    }
   
         
      }



// pieces controller 
const soumetre_piece=async(req,res)=>{
    // console.log(req?.files);
    const propertyValues = Object.values(req?.files);
 
    let values=[];
    // console.log(propertyValues?.length)
    console.log("ana",propertyValues)
    for(let i=0;i<propertyValues?.length;i++){ 
      console.log(path.extname(propertyValues[i][0]?.originalname),propertyValues[i]?.length)
if(i===2 &&propertyValues[i]?.length>1){
  
  // console.log(path.extname(propertyValues[i][0]?.originalname))
  propertyValues[i]?.map(val=>{
    console.log(val)
    let type3= path.extname(val?.originalname);
    let v3=[val.originalname,val?.path,req.app.locals.path.id_recours,type3];
    values.push(v3);
  }) 

}
else if(i<2){ 
  let type= path.extname(propertyValues[i][0]?.originalname);

  let v=[propertyValues[i][0].originalname,propertyValues[i][0]?.path,req.app.locals.path.id_recours,type];
  values.push(v);}



    }

    const sql='insert into pieces (nom,chemin,id_recours,type) Values ?';
    console.log("values",values);

    db.query(sql,[...values],(err,result)=>{
        if(err)return res.json(err);
        return res.json({success:"Recours ajoute avec succes"})
    })
}



//get recours
const getRecours = (req, res)=>{

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

module.exports={soumetreRecours,soumetre_piece,verfication, getRecours}