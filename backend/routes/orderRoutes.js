const express = require("express");
const router = express.Router();

const {
  saveReservation,
  operatorReservations,
  userReservations,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isOperatorActive } = require("../middleware/isOperatorMiddleware");

// /api/order..
router.post("/save/reservation", protect, saveReservation);
router.get("/hotel/reservations", protect, isOperatorActive, operatorReservations);
router.get("/hotel/user/reservations", protect, userReservations);

module.exports = router;
