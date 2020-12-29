const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User= mongoose.model('User');
const  SendOtp = require("sendotp");


const router = express.Router();

const  sendOtp = new  SendOtp("9146A4XsuWgB5fe97a0fP123");

router.post('/sendotp',(req,res) => {
    sendOtp.send(req.body.phoneNumber,"id_of_send", (err, data) => {
        console.log(data);
        if (err) return  res.json({ err });
        data.type == "success"
        ? res.json({ success:  true,message:data.message })
        : res.json({ success:  false,message:data.message });
    });
})

router.post('/verify',(req,res) => {
    sendOtp.verify(req.body.phoneNumber, req.body.otp, function(err, data) {
        if (err) return  res.json({ err });
        if (data.type == "success") {
            let { phoneNumber } = req.body;
            User.findOne({ phoneNumber }, (err, user) => {
                if (err) return  res.json({ err });
                if (!user) {
                    // user signup
                    console.log("new user");
                    res.json({success:true,message:  data.message})
                }
                if (user) {
                    // user signin
                    console.log('old user');
                    res.json({ success:  false, message:  data.message });
                }
            });
        }
        if (data.type == "error") res.json({ success:  false, message:  data.message });
    });
})

router.post('/signup', async(req,res)=>{
  //console.log(req.body)
   const {name,email,number,password,age,gender}=req.body;
   if(email){
        try {
            const user=new User({name,email,password,age,gender});
            await user.save();

            const token=jwt.sign({userId:user._id},'My_Secret_Key');
            res.send({token});
            
        } catch (err) {
            return res.status(401).send(err.message);
        }
    }else{
        try {
            const user=new User({name,phoneNumber:number,password,age,gender});
            await user.save();
        
            const token=jwt.sign({userId:user._id},'My_Secret_Key');
            res.send({token});
            
        } catch (err) {
            return res.status(401).send(err.message);
        }  
    }
})

router.post('/signin', async(req,res)=>{
    const{email,number,password}=req.body;
   
    if(email){
        if(!email || !password){
            return res.status(401).send({error:'you must provide email/number and password :)'});
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
    }else{
        if(!number || !password){
            return res.status(401).send({error:'you must provide email/number and password :)'});
        }
        const user=await User.findOne({phoneNumber:number});
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
    }
})

module.exports=router;