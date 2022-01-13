const express = require("express");
const router = express.Router();

const { saveReservation } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/product..
router.post("/save/reservation", protect, saveReservation);
// router.get('hotel/reservations', protect, hotelReservations);

module.exports = router;
