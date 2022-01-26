const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const pool = require("../config/db");
const { sendKycRequest } = require("../utils/kycApis");

// Session
// POST/api/get/kyc
// Private
const getKyc = async (req, res, next) => {
  try {
    const { id: singed_user_id } = req.user;
    const request = await sendKycRequest();

    res.json({
      id: singed_user_id,
      data: request.data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Session controller failed...",
      stk: err.message,
    });
  }
};

module.exports = {
  getKyc,
};
