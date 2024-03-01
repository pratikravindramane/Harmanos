const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  getACourse,
  getAllCourse,
  addCourse,
  addLecture,
  BanInstructor,
  UnbanInstructor,
  lectureCompleted,
} = require("../controller/courseController");
const { upload } = require("../utils/uploadImg");

const route = require("express").Router();

// routes
route.get("/get-all", authMiddleware, isAdmin, getAllCourse);
route.put("/instructor/ban", isAdmin, BanInstructor);
route.put("/instructor/unban", isAdmin, UnbanInstructor);
route.put("/lecture/add/:id", authMiddleware, isAdmin, addLecture);
route.get("/get/:id", authMiddleware, getACourse);
route.post("/add", upload.single("image"), authMiddleware, isAdmin, addCourse);

module.exports = route;
