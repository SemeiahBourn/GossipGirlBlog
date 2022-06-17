const express = require('express')
const blogModel = require('../models/blogSchema')
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()
// pulls out the two function we need from express validator
const {check, validationResult} = require('express-validator')
const jwt = require("jsonwebtoken");

//get 
router.get('/',authMiddleware, async (req,res)=>{
    try {
        const blog = await blogModel.find()
        res.status(200).json(blog)
    } catch (error) {
       console.log(error) 
    }
})
router.post('/',[
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password","please enter a password ").notEmpty()
] ,async(req,res)=>{
const blogData =req.body
try {
    const blog= await blogModel.create(blogData)
    res.status(201).json(blog)
} catch (error) {
    console.error(error)
    res.status(400).json('bad request')
}
})

//get blog by id
router.get('/:id', async(req,res)=>{
    const id =req.params.id
    const newBlogData =req.body
    try{
        const blog =await blogModel.findById(id,newBlogData)
        res.status(200).json(blog)
    }catch (error) {
        console.error(error)
        res.status(400).json({
            msg:'id not found'
        })
    }
})
//update by id
router.put('/:id',async(req,res)=>{
    const id = req.params.id
    const newBlogData = req.body
    try{
        //find by id
        const blog = await blogModel.findByIdAndUpdate(id,newBlogData,{new:true})
        res.status(202).json(blog)
    } catch (error){
        console.log(error)
    }
})
//delete a blog entry
router.delete('/:id', async(req,res)=>{
    const id = req.params.id
    try {
        const contact =await blogModel.findByIdAndUpdate(id)
        res.status(200).json({msg:'contact was deleted!'})
    } catch (error) {
        console.log(error);
        
    }
})
module.exports=router