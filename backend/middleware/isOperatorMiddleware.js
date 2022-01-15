const pool = require("../config/db");

const isOperator = async (req, res, next) => {
  next();
  // try {
  //   const { email } = req.user;
  //   const { rows } = await pool.query(
  //     "SELECT role FROM users WHERE email = $1",
  //     [email]
  //   );

  //   if (rows[0].role !== "operator") {
  //     return next({
  //       msg: "Not authorized, is not Operator",
  //     });
  //   } else {
  //     return next();
  //   }
  // } catch (err) {
  //   res.status(401);
  //   return next({
  //     msg: "Not authorized, is not operator",
  //     stk: err.message,
  //   });
  // }
};

module.exports = { isOperator };
