const express = require("express");
const router = express.Router();

const {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerCustomer,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
// const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/user..
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/register", registerCustomer);

module.exports = router;
