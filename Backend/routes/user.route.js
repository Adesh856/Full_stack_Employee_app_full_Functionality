const express = require("express")
const UserRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("../model/user.model")

//register user
UserRouter.post("/signup",async(req,res)=>{
    const {email,password,name,confirmpass} = req.body
     try {
        if(password!==confirmpass){
           return res.status(400).send({"msg":"password and confirmpass is not matching"})
        }
        const hashpass= bcrypt.hashSync(password,5)
        const user = new UserModel({
            name,
            email,
            password:hashpass
        })
        await user.save()
        res.status(200).send({"msg":"Register Successfully"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        const comnparepass = bcrypt.compareSync(password,user.password)
        if(!user){
            res.status(400).send({"msg":"Invalid Credentials"})
        }
        const token = jwt.sign({
            Userid: user._id
          }, 'MangalYaan', { expiresIn: '1h' });
          res.status(201).send({"msg":"Login Successfully",token})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})



module.exports = UserRouter