const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userInfo = await pool.query(
        "SELECT username, email, operator FROM users WHERE username = $1",
        [decoded.name]
      );
      req.user = userInfo.rows[0];
      return next();
    } catch (err) {
      res.status(401);
      return next({
        msg: "Not authorized, token failed",
        stk: err.message,
      });
    }
  }
  if (!token) {
    res.status(401);
    return next({
      msg: "Not authorized, no token",
    });
  }
};

module.exports = { protect };
