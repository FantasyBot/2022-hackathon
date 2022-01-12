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
const { isOperator } = require("../middleware/isOperatorMiddleware");

// /api/product..
router.post("/create/hotel", forMulter, isOperator, protect, createHotel);
router.get("/allhotels", getAllHotels);
router.get("/myhotels", protect, isOperator, getMyHotels);
router.get("/hotels/:id", getSingleHotel);
// router.delete('hotels/myhotels/:id', )

module.exports = router;
