const express = require("express");
const { register, login } = require("../controllers/auth/authControllers");
const router = express.Router();




// routes 
router.post("/register",register);
router.post("/login",login) ;
 










// exportation 
module.exports = router;

