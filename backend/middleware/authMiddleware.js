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
      console.log(req.headers.authorization);
      console.log("tokeen", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decoded", decoded);

      const userInfo = await pool.query(
        "SELECT id, username, email, role FROM users WHERE email = $1",
        [decoded.email]
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
