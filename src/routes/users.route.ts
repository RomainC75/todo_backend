const express = require("express");
var router = express.Router();
import {getSignup, getLogin, postSignup, postLogin } from '../controllers/user.controller'


/* GET users listing. */
router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/login", getLogin);
router.post("/login", postLogin);

module.exports = router;
