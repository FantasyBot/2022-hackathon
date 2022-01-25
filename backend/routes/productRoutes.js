const express = require("express");
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getMyHotels,
  getSingleHotel,
  deleteHotel,
} = require("../controllers/productController");

// const { forMulter } = require("../middleware/forMulter");
const { protect } = require("../middleware/authMiddleware");
const { isOperatorActive } = require("../middleware/isOperatorMiddleware");

// /api/product..
router.post("/create/hotel", protect, isOperatorActive, createHotel);
router.get("/allhotels", getAllHotels);
router.get("/myhotels", protect, isOperatorActive, getMyHotels);
router.get("/hotels/:id", getSingleHotel);
router.delete("/hotels/myhotels/:id", protect, isOperatorActive, deleteHotel);

module.exports = router;
