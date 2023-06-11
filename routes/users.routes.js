const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const jwt = require('jsonwebtoken');
require("dotenv").config()
userRouter.post("/register",async(req,res)=>{
    const {email, name, pass} = req.body
  try { 
        bcrypt.hash(pass, 5, async(err, hash)=> {
            if(err){
                res.json({err:err.message})
            }else{
                const user = new UserModel({email, name, pass:hash})
                await user.save()
                res.json({msg:"A new user has been registered",user:req.body})
            }
        });
    
    
  } catch (error) {
    res.json({error:error.message})
  }
})

userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, async(err, result)=> {
                const token = jwt.sign({ userID: user._id, user: user.name }, process.env.secretKey);
                if(result){
                    res.json({msg:"User has been logged in successfully",token})
                }else{
                    res.json({msg:"Wrong credentials!"})
                }
            });
        }else{
            res.json({msg:"User not found"})
        }
    } catch (error) {
        res.json({error:error.message})       
    }
})

module.exports = {
    userRouter
}