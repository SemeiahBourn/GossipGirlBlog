const express = require('express')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middleware/authMiddleware')
const userModel= require('../models/userSchema')

//creates the router
const router = express.Router()

//create or register a new user
router.post("/",  [
    check('username',"username is required from Middleware!").notEmpty(),
    check('email',"please use a valid email from middleware!").isEmail(),
    check('password',"please enter a password").notEmpty(),
    check('password',"please enter a password with six or more characters").isLength({min:5}),
],
async(req,res)=>{
    const userData =req.body;
    const errors=validationResult(req);
    //checking for validation errors
    if(!errors.isEmpty()){
        return res.json(errors.array());
    }

    try {
        //checking if there is a user with this email in the db
        const userExists =await userModel.findOne({email: userData.email})
        // if user exists we will return this
        if(userExists){
            return res.json({msg:"user already exists!"})
        }
        //creating a new user
        //1 Create the salt
        const SALT = await bcrypt.genSalt(10);
        //2 use the salt to create a hash with the user's password
        const hashedPassword = await bcrypt.hash(userData.password,SALT);
        // 3 assign the hashed password to the userData
        userData.password= hashedPassword;
        //write the user to the db
        const user= await userModel.create(userData);

        // create a new JWT Token

        const payload ={
            id:user._id,
            email: user.email,
        };

        const TOKEN = jwt.sign(payload,process.env.SECRET_KEY);

        res.status(201).json({
            user:user,
            token: TOKEN,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json('Request is no bueno')
    }
}
);
module.exports = router;







