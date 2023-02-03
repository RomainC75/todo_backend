var express = require("express");
var router = express.Router();
const Data = require("../models/Data.model");
const User = require("../models/User.model");
import authentication from "../middlewares/authentication.mid";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Route : /" });
});

router.get("/requests", authentication, async (req, res, next) => {
  const data = await Data.find({});
  const users = await User.find({});
  const populated = data.map((request) => {
    const foundEmail = users.find( (user) => user._id.toString() === request.userId.toString() ).email
    return {
      ...request._doc,
      email: foundEmail,
    };
  });
  res.status(200).json(populated);
});

module.exports = router;
