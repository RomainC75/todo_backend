import { UserInterface } from "../@types/user.type";

const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { NewUserInterface, UserInterface } = require("../@types/user.type");
require("dotenv").config();
const SECRETPHRASE = process.env.SECRETPHRASE;

const getSignup = (req, res, next) => {
  res.render("user", {
    title: "Signup",
    action: "signup",
  });
};

const postSignup = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next({
      message: 'the server need 2 variables called "email" and "password"',
    });
  }
  try {
    const foundUser: UserInterface|null = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hash: string = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      password: hash,
    });
    // res.status(201).json({message: "user registered"})
    return res.redirect("/users/login");
  } catch (error) {
    next(error);
  }
};

const getLogin = (req, res, next) => {
  res.render("user", {
    title: "Login",
    action: "login",
  });
};

const postLogin = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    next({
      message: 'the server need 2 variables called "email" and "password"',
    });
  }
  try {
    const foundUser: UserInterface|null = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(400).json({ message: "email not found" });
    }
    const bcryptComp:boolean = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!bcryptComp) {
      return res.status(400).json({ message: "wrong password" });
    }
    const token: string = jwt.sign(
      {
        data: foundUser,
      },
      SECRETPHRASE,
      { expiresIn: 60 * 60 * 24 }
    );
    // res.status(200).json({token : token})
    res.render("displayToken", {
      title: "Token page ",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { getSignup, getLogin, postSignup, postLogin };
