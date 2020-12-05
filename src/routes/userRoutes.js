const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User= mongoose.model('User');

const router = express.Router();


router.get('/users',async(req,res)=>{
    const user = await User.find();

  res.send(user);
})

module.exports=router;