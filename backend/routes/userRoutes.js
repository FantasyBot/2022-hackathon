const express = require("express");
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  registerOperator,
  updateUserProfile
} = require("../controllers/userController");

const { forMulter } = require("../middleware/forMulter");
const { protect } = require("../middleware/authMiddleware");
// const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/user..
router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register/operator", registerOperator);

module.exports = router;
