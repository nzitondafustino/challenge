const express=require('express');
const router=express.Router();

//importing controllers

const authController=require('../controllers/auth');

router.post('/signup',authController.postSignup);

router.post('/signin',authController.postLogin);

module.exports=router;