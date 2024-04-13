 
const db = require('./../../db/connect');
 

// ---------login ------------
const login = async (req, res) => {
  const values = [
    req.body.email,
    req.body.mdp
  ]
  const sql = "select * from assures where email = ? and mot_de_passe = ?"

  db.query(sql, values, (err, result) => {
    if(err) return res.json({statut: "erreur", message: "Une erreur est survenu, réessayez plus tard"})

    if(result.length > 0){
        //console.log(req.session)
        req.session.userinfos = result[0] ;
        req.session.save();
        console.log("ello",req.session.userinfos)
        return res.json({connected: true,data:req.session.userinfos})
    } else {
        return res.json({statut: "erreur", message: "Email ou Mot de Passe incorrect"})
    }
  })

};


// ------------verifier si l'assure est connecté(il a une session)----------------
const isConnected = async (req, res) => {
// console.log("request",req.session.userinfos)
  if(req.session.userinfos){ //si c'est 'vrai' ca veut dire qu'il a une session 
    return res.json({connected: true, userinfos: req.session.userinfos})
  }else{
      return res.json({connected: false})
  }

};


// -------------------logout controller --------------------
const logout =async (req, res) => {
  // Destroy the session
  console.log("logout")
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        console.log("Session destoyed");
      }
    });
    

    res.clearCookie("user-session");

    

    return res.status(200).json({connected: false, message: "session is removed"});
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while removing the cookie" });
  }
};





//   exporting those controllers 
module.exports = {
    login,
    isConnected,
    logout
} 