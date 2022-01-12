const express = require("express");
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getMyHotels,
  getSingleHotel,
  deleteHotel,
} = require("../controllers/productController");

const { forMulter } = require("../middleware/forMulter");
const { protect } = require("../middleware/authMiddleware");
const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/product..
router.post("/create/hotel", forMulter, protect, isOperator, createHotel);
router.get("/allhotels", getAllHotels);
router.get("/myhotels", protect, isOperator, getMyHotels);
router.get("/hotels/:id", getSingleHotel);
router.delete("/hotels/myhotels/:id", protect, isOperator, deleteHotel);

module.exports = router;
