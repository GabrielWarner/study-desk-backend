const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    postUser(req, res) {
        User.create({
            username:req.body.username,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password, 4)
        })
            .then((userData) => res.json(userData))
            .catch((err) => res.status(500).json(err))
    },
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: "invalid ID" })
                }
                res.json(user)
            })
            .catch((err) => res.status(500).json(err))
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                runValidators: true,
                new: true
            })
            .then((updateUser) => {
                if (!updateUser) {
                    return res.status(404).json({ message: "invalid ID" })
                }
                res.json(updateUser)
            })
            .catch((err) => res.status(500).json(err))
    },
    removeUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.userId })
            .then((removeUser) => {
                if (!removeUser) {
                    return res.status(404).json({ message: "invalid ID" })
                }
            })
            .then(() => res.json({message:'user removed'}))
            .catch((err) => {
              console.log(err);
              res.status(500).json(err);
          })        
    },
    // JWT
    // login route
    findOne(req, res) {
        User.findOne({
                email:req.body.email
        }).then(foundUser => {
            console.log(req.body.password)
            console.log(foundUser)
            if (!foundUser) {
                return res.status(401).json({msg:"invalid login credential!"})
            }
            else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
                return res.status(401).json({msg:"invalid login credential!"})
            } 
            else {
                const token = jwt.sign({
                   id:foundUser.id,
                   email:foundUser.email
                },process.env.JWT_SECRET,{
                    expiresIn:'2h'
                })
                return res.json({
                    token:token,
                    user:foundUser
                })
            }    
        }).catch(err=>{
            res.status(500).json({msg:"an error occurred",err})
            console.log(err)
        })
    },
    // protect route
    checkToken(req, res) {
        const token = req.headers.authorization.split(" ")[1]
        try{
            const userData = jwt.verify(token,process.env.JWT_SECRET)
            res.json(userData)
        } catch{
          res.status(403).json({msg:"invalid token"})
        }
    }
  }