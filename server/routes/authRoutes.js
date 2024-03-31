const express = require("express");
const { login, isConnected } = require("../controllers/auth/authControllers");
const router = express.Router();




// routes 
router.post("/login", login) ;
router.get("/isConnected", isConnected) ;
 










// exportation 
module.exports = router;

