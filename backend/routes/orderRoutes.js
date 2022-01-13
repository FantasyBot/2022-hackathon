const express = require("express");
const router = express.Router();

const {
  saveReservation,
  hotelReservations,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/product..
router.post("/save/reservation", protect, saveReservation);
router.get("hotel/reservations", protect, isOperator, hotelReservations);

module.exports = router;
