const express = require("express");
const router = express.Router();

const {
  saveReservation,
  operatorReservations,
  userReservations,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/order..
router.post("/save/reservation", protect, saveReservation);
router.get("/hotel/reservations", protect, isOperator, operatorReservations);
router.get("/hotel/user/reservations", protect, userReservations);

module.exports = router;
