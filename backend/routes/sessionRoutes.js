const express = require("express");
const router = express.Router();

const { getKyc, webHook } = require("../controllers/sessionController");
const { protect } = require("../middleware/authMiddleware");
// const { isOperatorActive } = require("../middleware/isOperatorMiddleware");

// /api/session...
router.post("/", protect, getKyc);
router.post("/kwb", webHook);


module.exports = router;
