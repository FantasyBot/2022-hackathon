const express = require("express");

const {
  authUser,
  registerUser,
  getUserProfile,
  registerOperator,
  createHotel,
} = require("../controllers/userController");

const { forMulter } = require("../middleware/forMulter");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// /api/user..
router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.post("/register/operator", forMulter, registerOperator);
router.post("/create/hotel", protect, createHotel);
// router.post('/profile/create/:id', createHotel);

module.exports = router;
