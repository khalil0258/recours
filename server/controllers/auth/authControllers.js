 
const db = require('./../../db/connect');
 

// ---------login ------------
const login = async (req, res) => {
  console.log("je")
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
        //console.log(req.session.userinfos)
        return res.json({statut: "success"})
    } else {
        return res.json({statut: "erreur", message: "Email ou Mot de Passe incorrect"})
    }
  })

};


// ------------verifier si l'assure est connecté(il a une session)----------------
const isConnected = async (req, res) => {

  if(req.session.userinfos){ //si c'est 'vrai' ca veut dire qu'il a une session 
    return res.json({connected: true, userinfos: req.session.userinfos})
  }else{
      return res.json({connected: false})
  }

};
  




//   exporting those controllers 
module.exports = {
    login,
    isConnected,
} 