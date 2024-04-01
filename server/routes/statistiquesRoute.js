const express = require("express");
const router = express.Router();

const getStatistiques = require("./../controllers/getStatistiquesHomePage");


//Routes
router.get("/getStatistiques", getStatistiques) ;


// exportation 
module.exports = router;