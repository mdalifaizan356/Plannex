const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const userAuth = require("../Middlewares/userAuth");

router.post("/sendotp", userController.sendOTP);
router.patch("/createUser", userController.createUser);
router.post("/loginUser", userController.loginUser);
router.get("/fetchUser", userAuth, userController.fetchUser);
router.patch("/changePassword", userController.changePassword);
router.patch("/recoverpassword", userController.recoverPassword);
router.patch("/editProfile", userController.editProfile);

 
module.exports = router;  