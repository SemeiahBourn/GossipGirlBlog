const express = require('express')
const blogModel = require('../models/blogSchema')
const authMiddleware = require('../middleware/authMiddleware')
const router=express.Router()
// pulls out the two function we need from express validator


//get 
router.get('/',authMiddleware, async (req,res)=>{
    try {
        const blog = await blogModel.find()
        res.status(200).json(blog)
    } catch (error) {
       console.log(error) 
    }
})
//post and create
router.post('/', authMiddleware, async(req,res)=>{
const blogData =req.body
blogData.user = req.user.id

blogData.created_by = req.user.id
console.log(blogData)
try {
    const blog= await blogModel.create(blogData)
    res.status(201).json(blog)
} catch (error) {
    console.error(error)
    res.status(400).json('bad request')
}
})

//get blog by id
router.get('/:id',authMiddleware, async(req,res)=>{
    const id =req.params.id
   
    try{
        const blog =await blogModel.findById(id)
        res.status(200).json(blog)
    }catch (error) {
        console.error(error)
        res.status(400).json({
            msg:'id not found'
        })
    }
})
//update by id
router.put('/:id',authMiddleware,async(req,res)=>{
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
router.delete('/:id',authMiddleware, async(req,res)=>{
    const id = req.params.id
    try {
        const blogToDelete =await blogModel.findByIdAndDelete(id)
        res.status(200).json({msg:'contact was deleted!'})
        if (blogToDelete.user._id.toString() !== req.user.id){
            // if they are NOT the same we send error message
            return res.status(400).json({msg: 'Not Authorized!'})
        }
        // if they are the same IDs we delete it
        const blog = await blogModel.findByIdAndDelete(id)
        res.status(200).json('Blog deleted by the user!')
    } catch (error) {
        console.log(error);
        
    }
})
module.exports=router