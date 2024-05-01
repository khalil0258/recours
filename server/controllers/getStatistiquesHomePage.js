
const db = require('./../db/connect');
 

// --------- get statistiques for dashboard home page  ------------
const getStatistiques = async (req, res) => {

  stat = {
    nb_recours: 0,
    nb_recours_en_cours_de_traitement: 0,
    nb_recours_annule: 0,
    nb_recours_traite: 0,
    nb_decisions: 0,
    nb_decisions_accorde: 0,
    nb_decisions_rejete: 0
  }

  //statistiques des recours
  const sql = "select statut from recours where id_assure = ?"
  db.query(sql,[req.session?.userinfos?.id_assure], (err, result) => {
    if(err) 
        return res.json({statut: "erreur", message: "Une erreur est survenue"})
    else {
      stat.nb_recours = result.length;
      result.forEach((r) => {
          if (r.statut.toLowerCase() === "en cours de traitement") {
              stat.nb_recours_en_cours_de_traitement++;
          }else if(r.statut.toLowerCase() === "annulé") {
            stat.nb_recours_annule++
          }else if(r.statut.toLowerCase() === "traité") {
            stat.nb_recours_traite++
          }
      });
    }
        
  })

  //statistiques des decisions
  const sql2 = "select decision_forme, decision_sujet from decisions where id_assure = ?"
  db.query(sql2,[req.session?.userinfos?.id_assure], (err, result) => {
    if(err) 
        return res.json({statut: "erreur", message: "Une erreur est survenue"})
    else {
      stat.nb_decisions = result.length;
      result.forEach((d) => {
          if (d.decision_sujet !== null && d.decision_sujet.toLowerCase() === "accepté") {
              stat.nb_decisions_accorde++;
          }else {
            stat.nb_decisions_rejete++
          }
      });
    }

    res.json({statut: "success", resultat: stat})
  })

};






//exportation
module.exports = getStatistiques ;