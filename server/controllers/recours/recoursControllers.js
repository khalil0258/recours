const db = require('./../../db/connect');


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
const soumetre_piece=(req,res)=>{
    console.log(req.files);
    const propertyValues = Object.values(req.files);
    // console.log(typeof(req.files));
    // console.log(typeof(propertyValues));
    // console.log(propertyValues);

    let values=[];
    console.log(propertyValues.length)
    for(let i=0;i<propertyValues.length;i++){ 


   let type= path.extname(propertyValues[i][0].originalname);

        let v=[propertyValues[i][0].originalname,propertyValues[i][0].path,req.app.locals.path.id_recours,type];
         
        values.push(v);
    }

    const sql='insert into pieces (nom,chemin,id_recours,type) Values (?)';
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





module.exports={soumetreRecours,soumetre_piece, getRecours}