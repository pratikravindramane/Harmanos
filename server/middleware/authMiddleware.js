const asyncHandler = require("express-async-handler");
const User = require("../model.js/Instructor");
const jwt = require("jsonwebtoken");
const Instructor = require("../model.js/Instructor");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, process.env.JWT);
      const user = await Instructor.findById(decode.id);
      req.user = user;
      next();
    } else {
      throw new Error("Invalid Token");
    }
  } else {
    throw new Error("you don't have a token to access this route");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const isAdmin = req?.user?.isAdmin;
  if (isAdmin) next();
  else throw new Error("Not Authozired");
});

module.exports = { authMiddleware, isAdmin };
