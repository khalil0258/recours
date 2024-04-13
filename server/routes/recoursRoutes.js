const express = require("express");
const db = require("../db/connect");
const upload1 = require("../middleware/uploader");
const router = express.Router();
const path = require('path');
const { soumetreRecours, soumetre_piece, getRecours, verfication, getDocuments, getDecisions, getRecours2 } = require("../controllers/recours/recoursControllers");

 


// routes 

 
const multipleUpload=upload1.fields([{name:"file1"},{ name: 'file2'},{ name:"file3"}]);

//API de soummissiom de recours
router.post("/soumetreRecours",soumetreRecours ,multipleUpload,soumetre_piece);
router.get('/verification',verfication)
//API pour la consultation des recours
router.get("/getRecours", getRecours) ;

//API pour la recuperation des documents
router.get("/getDocuments", getDocuments) ;

//API pour la recuperation des decisions
router.get("/getDecisions", getDecisions) ;

// renvoyer un seul recours 
router.get("/getRecours/:id", getRecours2) ;




 



// exportation 
module.exports = router; 