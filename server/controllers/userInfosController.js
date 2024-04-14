const db = require("../db/connect");
const bcrypt = require("bcryptjs");

// get user infos 
const userInfos=async(req,res)=>{
    const sql = "select * from assures where id_assure=?";
    console.log(req.session)
    console.log("first")
    // hna values ndirouha b session.userinfos 
    db.query(sql,[req.session.userinfos.id_assure], (err, result) => {
      if(err) return res.json({statut: "erreur", message: "Une erreur est survenu, réessayez plus tard"})
  // console.log(result)
   console.log("bew",result)
          return res.json({statut: "success",data:result})
   
    })
  }

// change password 
const changePassword=async(req,res)=>{
  const {oldPassword,newPassword,passwordBd}=req.body;
  // console.log("ya k",req.body,newPassword)
  try {
    // const isOldPasswordValid=await bcrypt.compare(oldPassword,passwordBd);
    // if(!!isOldPasswordValid){
      const q='UPDATE assures SET mot_de_passe=? WHERE id_assure=?';
      // let values=[newPassword,req.session.user_id]
      db.query(q,[newPassword,req.session.userinfos.id_assure] ,(err, result) => {
        if(err) return res.json({statut: "erreur", message: "Une erreur est survenu, réessayez plus tard"})
    console.log(result)
     
            return res.json({statut: "le mot de pass est change avec succes" })
     
      })
    // }


  } catch (error) {
    console.log(error)
  }
}



// update profile controller 
const updateProfile=async(req,res)=>{ 
  const {email,numero_telephone}=req.body;
  console.log("first dkfdlkfja;ldjljsjfkdaljf;ldkj;l")
  try {
    // hna lazem nbedlo 2 b id_assure 
    const values=[email,numero_telephone,req.session.userinfos.id_assure]
    console.log(values)
    const sql='update assures set email=? , numero_telephone=? where id_assure=?';
    db.query(sql,values ,(err, result) => {
      if(err) return res.json({statut: "erreur", message: "Une erreur est survenu, réessayez plus tard"})
  console.log(result)
   
          return res.json({statut: "le profil a été mis à jour avec succès" })
   
    })
  } catch (error) {
    
  }
}




  module.exports = {
    userInfos,changePassword,updateProfile
  };