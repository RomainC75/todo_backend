// var jwtVerify = require('../util/jwtVerify')
export {};
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    next({
      status: 500,
      stack: "token must be provided in headers/authorization : 'Bearer xxxxx'",
    });
  }
  try {
    const token = req.headers.authorization.split(" ")[1]
    const ans = jwt.verify(token, process.env.SECRETPHRASE);
    req.user=ans.data
    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
