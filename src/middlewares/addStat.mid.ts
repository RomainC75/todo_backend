const User = require("../models/User.model");
const Data = require('../models/Data.model')

const addStat = async (req, res, next) => {
  try {
    const ans = await Data.create({
        url: req.url,
        userId: req.user._id,
        method: req.method
    })
    console.log(ans)
    next();
  } catch (error) {
    next(error)
  }
};

module.exports = addStat;
