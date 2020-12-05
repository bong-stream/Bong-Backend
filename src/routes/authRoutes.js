const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User= mongoose.model('User');

const router = express.Router();


router.post('/signup', async(req,res)=>{
  //console.log(req.body)
   const {name,email,password,age,gender}=req.body;
    try {
        const user=new User({name,email,password,age,gender});
    await user.save();

    const token=jwt.sign({userId:user._id},'My_Secret_Key');
    res.send({token});
        
    } catch (err) {
        return res.status(401).send(err.message);
    }
})

router.post('/signin', async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(401).send({error:'you must provide email and password :)'});
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(401).send({error:'invalid password or email :)'})
    }
    try {
        await user.comparePassword(password);
        const token=jwt.sign({userId:user._id},'My_Secret_Key');
        res.send({token});
    } catch (err) {
        return res.status(401).send({error:'invalid password or email :)'})
    }
})

module.exports=router;