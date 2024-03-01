const Course = require("../model.js/Course");
const asyncHandler = require("express-async-handler");
const { convertDate } = require("../utils/ConvertDate");
const Instructor = require("../model.js/Instructor");
const { compareDates } = require("../utils/compareDates");
const validateMongoDbId = require("../utils/validateMongoDbId");
const Lecture = require("../model.js/Lecture");
const { default: mongoose } = require("mongoose");
// get a course
const getACourse = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const valid = mongoose.Types.ObjectId.isValid(id);
  if (!valid) throw new Error("Not a Valid ID");
  try {
    const course = await Course.findById(id);
    const lectures = await Lecture.find({ course: id }).populate(
      "instructorId"
    );
    res.send({ course, lectures });
  } catch (error) {
    throw new Error(error);
  }
});

// get all
const getAllCourse = asyncHandler(async (req, res) => {
  try {
    const course = await Course.find({});
    if (!course) throw new Error("No course Found!");
    res.send(course);
  } catch (error) {
    throw new Error(error);
  }
});

// add course
const addCourse = asyncHandler(async (req, res) => {
  const { date, instructorId } = req.body;
  try {
    let imgPath = "";
    if (req.file) {
      imgPath = req.file.filename;
    }
    const course = new Course({ ...req.body, image: imgPath });
    await course.save();
    const lecture = new Lecture({ instructorId, date, course: course._id });
    await lecture.save();
    res.send(course);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});

// add lecture to course
const addLecture = asyncHandler(async (req, res) => {
  const { date, instructorId } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) throw new Error("Course Doesn't Exits");
    const existsLecture = await Lecture.findOne({ date, instructorId });
    if (existsLecture) throw new Error("Instrustor is assigned for the day");
    const lecture = new Lecture({ date, instructorId, course: req.params.id });
    await lecture.save();
    res.send(lecture);
  } catch (error) {
    throw new Error(error);
  }
});

// Ban Instrucotr
const BanInstructor = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, { ban: true });
    res.send(course);
  } catch (error) {
    throw new Error(error);
  }
});

// Unban Instrucotr
const UnbanInstructor = asyncHandler(async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, {
      ban: false,
    });
    res.send(course);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  getACourse,
  getAllCourse,
  addCourse,
  addLecture,
  BanInstructor,
  UnbanInstructor,
};
