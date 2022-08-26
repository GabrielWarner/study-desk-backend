const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { User } = require("../models")
const jwt = require("jsonwebtoken")

router.get("/",(req,res)=>{
    res.send("Hi there👋🏼")
})

router.post("/login",(req,res)=>[
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"invalid login credentials!"})
        }
        else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials!"})
        } else {
            const token = jwt.sign({
               id:foundUser.id,
               email:foundUser.email
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            return res.json({
                token:token,
                user:foundUser
            })
        }
    })
])

router.get("/protected",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        res.json({msg:`welcome to the club, ${userData.email}`})
    } catch{
      res.status(403).json({msg:"invalid token"})
    }

})

router.get("/hello",(req,res)=>{
    res.json({msg:"hello from express!"})
})

router.get("/check-token",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        const userData = jwt.verify(token,process.env.JWT_SECRET)
        res.json(userData)
    } catch{
      res.status(403).json({msg:"invalid token"})
    }

})

module.exports = router;