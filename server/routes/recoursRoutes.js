const express = require("express");
const db = require("../db/connect");
const upload1 = require("../middleware/uploader");
const router = express.Router();
const path = require('path');
const { soumetreRecours, soumetre_piece, getRecours } = require("../controllers/recours/recoursControllers");

 


// routes 

 
const multipleUpload=upload1.fields([{name:"file1"},  { name: 'file2'}]);

//API de soummissiom de recours
router.post("/soumetreRecours",soumetreRecours,multipleUpload,soumetre_piece);

//API pour la consultation des recours
router.get("/getRecours", getRecours) ;




 



// exportation 
module.exports = router;