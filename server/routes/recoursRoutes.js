const express = require("express");
const db = require("../db/connect");
const upload1 = require("../middleware/uploader");
const router = express.Router();
const path = require('path');
const { soumetreRecours, soumetre_piece, verfication } = require("../controllers/recours/recoursControllers");

 


// routes 

 
const multipleUpload=upload1.fields([{name:"file1"},{ name: 'file2'},{ name:"file3"}]);

router.post("/soumetreRecours",soumetreRecours ,multipleUpload,soumetre_piece);
router.get('/verification',verfication)



 








// exportation 
module.exports = router;