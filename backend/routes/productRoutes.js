const express = require("express");
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getMyHotels,
  getSingleHotel,
} = require("../controllers/productController");

const { forMulter } = require("../middleware/forMulter");
const { protect } = require("../middleware/authMiddleware");

// /api/product..
router.post("/create/hotel", forMulter, protect, createHotel);
router.get("/allhotels", getAllHotels);
router.get("/myhotels", protect, getMyHotels);
router.get("/hotels/:id", getSingleHotel);

module.exports = router;
