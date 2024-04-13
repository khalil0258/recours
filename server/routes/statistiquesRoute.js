const express = require("express");
const router = express.Router();

const getStatistiques = require("./../controllers/getStatistiquesHomePage");
const { checkSessionExpiration } = require("../middleware/checkSessionExpiration");


//Routes
router.get("/getStatistiques",checkSessionExpiration,getStatistiques) ;


// exportation 
module.exports = router;