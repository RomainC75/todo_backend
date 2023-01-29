const bcrypt = require("bcrypt");
const express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { NewUserInterface, UserInterface } = require("../@types/user.type");
require('dotenv').config()
const SECRETPHRASE = process.env.SECRETPHRASE

/* GET users listing. */
router.get("/signup", (req, res, next) => {
  res.render("user", {
    title: "Signup",
    action: "signup",
  });
});

router.get("/login", (req, res, next) => {
  res.render("user", {
    title: "Login",
    action: "login",
  });
});

router.post("/signup", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next({
      message: 'the server need 2 variables called "email" and "password"',
    });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    const ans = await User.create({
      email: req.body.email,
      password: hash,
    });
    // res.status(201).json({message: "user registered"})
    return res.redirect("/users/login");
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log("POST LOGIN ==>", req.body);
  if (!req.body.email || !req.body.password) {
    next({
      message: 'the server need 2 variables called "email" and "password"',
    });
  }
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ message: "email not found" });
    }
    const bcryptComp = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!bcryptComp) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token = jwt.sign(
      {
        data: foundUser,
      },
      SECRETPHRASE,
      { expiresIn: 60 * 60 * 24 }
    );
    // res.status(200).json({token : token})
    res.render('displayToken',{
      title:'Token page ',
      token
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
