
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
  const sql = "select statut from recours"
  db.query(sql, (err, result) => {
    if(err) 
        return res.json({statut: "erreur", message: "Une erreur est survenue"})
    else {
      stat.nb_recours = result.length;
      result.forEach((r) => {
          if (r.statut === "en cours de traitement") {
              stat.nb_recours_en_cours_de_traitement++;
          }else if(r.statut === "annulé") {
            stat.nb_recours_annule++
          }else if(r.statut === "traité") {
            stat.nb_recours_traite++
          }
      });
    }
        
  })

  //statistiques des decisions
  const sql2 = "select decision_forme, decision_sujet from decisions"
  db.query(sql2, (err, result) => {
    if(err) 
        return res.json({statut: "erreur", message: "Une erreur est survenue"})
    else {
      stat.nb_decisions = result.length;
      result.forEach((d) => {
          if (d.decison_sujet === "accordé") {
              stat.nb_decisions_accorde++;
          }else if(d.decision_forme === "rejeté" || d.decision_sujet === "rejeté") {
            stat.nb_decisions_rejete++
          }
      });
    }

    res.json({statut: "success", resultat: stat})
  })

};






//exportation
module.exports = getStatistiques ;