const asyncHandler = require("express-async-handler");
const Instructor = require("../model.js/Instructor");
const validateMongoDbId = require("../utils/validateMongoDbId");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const { currentTime } = require("../utils/TimeDate");
const Course = require("../model.js/Course");
const Lecture = require("../model.js/Lecture");
const { default: mongoose } = require("mongoose");

// login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    // verify email and passowrd
    const instructor = await Instructor.findOne({ email });
    if (!instructor) throw new Error("No instructor found with this Email");
    const verifyPassword = await bcrypt.compare(password, instructor.password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(instructor.id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });

    //update signin
    instructor.token = token;
    await instructor.save();
    res.send(instructor);
  } catch (error) {
    throw new Error(error);
  }
});

// admin login
const adminLogin = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    // verify email and passowrd
    const instructor = await Instructor.findOne({ email });
    if (!instructor) throw new Error("No instructor found with this Email");
    if (!instructor.isAdmin) throw new Errro("Not Authorized");
    const verifyPassword = bcrypt.compare(instructor.password, password);
    if (!verifyPassword) throw new Error("Wrong Credentials");

    // save to cookie
    const token = genrateToken(instructor.id);
    res.cookie("token", token, {
      httpOnly: true,
      expiresIn: 72 * 60 * 60 * 1000,
    });
    // give token
    instructor.token = token;
    instructor.save();
    res.send(instructor);
  } catch (error) {
    throw new Error(error);
  }
});

// register
const register = asyncHandler(async (req, res) => {
  const { email, password, phone, name } = req.body;
  // if instructor exists
  const instructor = await Instructor.findOne({ email });
  if (instructor) throw new Error("instructor already exist with this email");
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  try {
    // create new Instructor
    const newInstructor = new Instructor({
      name,
      email,
      phone,
      password: hash,
    });
    await newInstructor.save();
    res.send({ msg: "Successfully Registered", newInstructor });
  } catch (error) {
    throw new Error(error);
  }
});

// get all
const getAll = asyncHandler(async (req, res) => {
  try {
    const instructor = await Instructor.find({ isAdmin: false });
    if (!instructor) throw new Error("No Instructor Found!");
    res.send(instructor);
  } catch (error) {
    throw new Error(error);
  }
});

// get a instructor
const getAInstructor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) throw new Error("Not a Valid ID");

  try {
    const instructor = await Instructor.findById(id);
    const lectures = await Lecture.find({
      instructorId: id,
    }).populate("course");
    if (!instructor) throw new Error("No Instructor Found!");
    res.send({ instructor, lectures });
  } catch (error) {
    throw new Error(error);
  }
});

// logout
const logout = asyncHandler(async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.token) throw new Error("No Token in Cookies");
    const token = cookie.token;
    const instructor = await Instructor.findOne({ token });
    if (!instructor) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    await Instructor.findOneAndUpdate(
      { token },
      {
        token: "",
      }
    );
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
module.exports = {
  login,
  adminLogin,
  logout,
  register,
  getAInstructor,
  getAll,
};
