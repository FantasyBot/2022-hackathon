const express = require("express");
const router = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  registerOperator,
} = require("../controllers/userController");
const { forMulter } = require("../middleware/forMulter");

const { protect } = require("../middleware/authMiddleware");

router.post("/login", authUser);
router.post("/register", registerUser);
router.get("/profile", protect, getUserProfile);
router.post("/register/operator", forMulter, registerOperator);
// router.post('/profile/create/:id', createHotel);

module.exports = router;
