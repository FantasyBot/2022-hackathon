const express = require("express");
const router = express.Router();

const { getKyc } = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
// const { isOperatorActive } = require("../middleware/isOperatorMiddleware");

// /api/session...
router.post("/", protect, getKyc);

module.exports = router;
