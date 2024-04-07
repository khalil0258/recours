const express = require("express");
const { userInfos, changePassword, updateProfile } = require("../controllers/userInfosController");
 
const router = express.Router();

router.get('/getUserInfos',userInfos);
// router.get('/changePassword',userInfos);
router.put('/changePassword',changePassword)
router.put('/update-profile',updateProfile)








// exportation 
module.exports = router;