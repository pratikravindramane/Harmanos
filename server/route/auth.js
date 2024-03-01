const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");
const {
  login,
  adminLogin,
  register,
  getAll,
  getAInstructor,
  logout,
} = require("../controller/authController");

const route = require("express").Router();

// routes
route.post("/login/", login);
route.post("/admin/", adminLogin);
route.post("/register/", register);
route.get("/get-all/", authMiddleware, isAdmin, getAll);
route.get("/logout/", authMiddleware, logout);
route.get("/ins/:id/", authMiddleware, getAInstructor);

module.exports = route;
