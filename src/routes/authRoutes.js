const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const SendOtp = require("sendotp");
const nodemailer = require("nodemailer");
const router = express.Router();
var otpGenerator = require("otp-generator");
const Emailotp = require("../models/Emailotp");
var emailOtp;

const sendOtp = new SendOtp("9146A4XsuWgB5fe97a0fP123");

router.post("/sendotp", (req, res) => {
  if (req.body.phoneNumber) {
    sendOtp.send(req.body.phoneNumber, "id_of_send", "4635", (err, data) => {
      if (err) return res.json({ err });
      data.type == "success"
        ? res.json({ success: true, message: data.message })
        : res.json({ success: false, message: data.message });
    });
  } else {
  }
});

router.post("/verify", (req, res) => {
  sendOtp.verify(req.body.phoneNumber, req.body.otp, function (err, data) {
    if (err) return res.json({ err });
    if (data.type == "success") {
      let { phoneNumber } = req.body;
      User.findOne({ phoneNumber }, (err, user) => {
        if (err) return res.json({ err });
        if (!user) {
          // user signup
          res.json({ success: true, message: data.message });
        }
        if (user) {
          // user signin
          res.json({ success: false, message: data.message });
        }
      });
    }
    if (data.type == "error") {
      res.json({ success: false, message: data.message });
    }
  });
});

const sendEmailOtp = (otp, email) => {
  if (otp && email) {
    const output = `
            <p>You Email Verification code</p>
            <h3>Bong</h3>
            <ul>  
              <li>Registered for: ${email}</li>
            </ul>
            <h3>OTP</h3>
            <p>${otp}</p>
            `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.google.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      requireTLS: true,
      service: "gmail",
      auth: {
        user: "queryaidataron@gmail.com", // generated ethereal user
        pass: "nwnxovucjfoqqwww", // generated ethereal password
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"User Query" <queryaidataron@gmail.com>', // sender address
      to: email, // list of receivers
      // subject: subject, // Subject line
      // text: details, // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return error;
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        let emailOtp = new Emailotp({
          email,
          otp,
        });
        await emailOtp.save();
        // res.status(200).json({ message: "Check Your Email" });
        // return true;
      }
    });
    return true;
  } else {
    // res.status(401).json({ message: "Something went Wrong" });
    return false;
  }
};

router.post("/sendemailotp", (req, res) => {
  let { email } = req.body;
  let otp = otpGenerator.generate(4, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });

  if (email && otp) {
    Emailotp.findOne({ email }).then(async (user) => {
      if (user) {
        res.json({ success: false, message: "User Email already used" });
      } else {
        let response = sendEmailOtp(otp, email);
        if (response) {
          res.json({ success: true });
        } else {
          res.json({ success: false, message: "Something went wrong" });
        }
      }
    });
  } else {
    res.json({ success: false, message: "Somthing Went Wrong" });
  }
});

router.post("/verifyemailotp", (req, res) => {
  let { otp, email } = req.body;
  Emailotp.findOne({ email }).then(async (user) => {
    if (user) {
      user.otp === otp
        ? res.json({ success: true, message: "User Verified" })
        : res.json({ success: false, message: "Wrong OTP" });
    } else {
      res.json({ success: false, message: "Somthing Went Wrong" });
    }
  });
});

router.post("/signup", async (req, res) => {
  //console.log(req.body)
  const { name, email, number, password, age, gender } = req.body;
  if (email) {
    let phoneNumber = "";
    User.findOne({ email: email }).then(async (user) => {
      if (user) {
        res.status(401).json({
          message: "User Already Exists",
        });
      } else {
        try {
          const user = new User({
            name,
            email,
            password,
            age,
            gender,
          });
          await user.save();

          const token = jwt.sign({ userId: user._id }, "My_Secret_Key");
          res.send({ token, user });
        } catch (err) {
          return res.status(401).send(err.message);
        }
      }
    });
  } else {
    let email = "";
    User.findOne({ phoneNumber: number }).then(async (user) => {
      if (user) {
        res.status(401).json({
          message: "User Already Exists",
        });
      } else {
        try {
          const user = new User({
            name,
            phoneNumber: number,
            password,
            age,
            gender,
          });
          await user.save();

          const token = jwt.sign({ userId: user._id }, "My_Secret_Key");
          res.send({ token, user });
        } catch (err) {
          return res.status(401).send(err.message);
        }
      }
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, number, password } = req.body;

  if (email) {
    if (!email || !password) {
      return res
        .status(401)
        .send({ error: "you must provide email/number and password :)" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "invalid password or email :)" });
    }
    try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, "My_Secret_Key");
      res.send({ token });
    } catch (err) {
      return res.status(401).send({ error: "invalid password or email :)" });
    }
  } else {
    if (!number || !password) {
      return res
        .status(401)
        .send({ error: "you must provide email/number and password :)" });
    }
    const user = await User.findOne({ phoneNumber: number });
    if (!user) {
      return res.status(401).send({ error: "invalid password or email :)" });
    }
    try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, "My_Secret_Key");
      res.send({ token });
    } catch (err) {
      return res.status(401).send({ error: "invalid password or email :)" });
    }
  }
});

module.exports = router;
