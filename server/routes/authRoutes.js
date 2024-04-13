const express = require("express");
const { login, isConnected, logout } = require("../controllers/auth/authControllers");
const router = express.Router();




// routes 
router.post("/login", login) ;
router.get("/logout", logout) ;
router.get("/isConnected", isConnected) ;


 
// exportation 
module.exports = router;















 
 

