const express=require("express");
const authController=require('../controllers/auth.controllers')
const router=express.Router();

//user auth APIS
router.post('/user/register',authController.registerUser);
router.post('/user/login',authController.loginUser);
router.get('/user/logout',authController.logoutUser);





//Dishify partner auth APIS
router.post('/Dishify-Partner/register',authController.registerDishifyPartner);
router.post('/Dishify-Partner/login',authController.loginDishifyPartner);
router.get('/Dishify-Partner/logout', authController.logoutDishifyPartner);


module.exports=router;