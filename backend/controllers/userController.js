const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const pool = require("../config/db");

// Auth user & get token
// POST/api/user/login
// Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT id, username, password, email, role FROM users WHERE email = $1",
      [email]
    );
    const encryptedPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    ); //true if the password match

    if (!user.rows[0] || !encryptedPassword) {
      res.status(404);
      return next({ msg: "email or password is incorrect" });
    }

    res.json({
      message: "success",
      token: generateToken(user.rows[0]),
    });
  } catch (e) {
    console.log(e.message);
    res.status(404);
    return next({
      msg: "email or password is incorrect",
      stk: e.message,
    });
  }
};

// Register new user
// POST/api/user/register
// Public
const registerUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // username is fullname
    await pool.query(
      "INSERT INTO users (username, password, email) VALUES($1, $2, $3)",
      [username, hashedPassword, email]
    );
    const { rows } = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );

    res.json({
      message: "Success",
      token: generateToken(rows[0]),
    });
  } catch (e) {
    console.log(e.message);
    res.status(404);
    return next({
      msg: "User registration failed...",
      stk: e.message,
    });
  }
};

// Get user profile
// GET/api/user/profile
// Private
const getUserProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    //Check second time
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    res.json({
      _id: rows[0].id,
      name: rows[0].username,
      email: rows[0].email,
      role: rows[0].role,
      operator_personal_id1: rows[0].user_photo1,
      operator_personal_id2: rows[0].user_photo2,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "User not found",
      stk: err.message,
    });
  }
};

// Register new operator
// POST/api/user/register/operator
// Public
const registerOperator = async (req, res, next) => {
  try {
    const { name, password, email, filename1, filename2 } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      "INSERT INTO users (username, password, email, role, user_photo1, user_photo2) VALUES($1, $2, $3, $4, $5, $6)",
      [name, hashedPassword, email, "operator", filename1, filename2]
    );

    const { rows } = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );

    res.json({
      message: "Success operator",
      token: generateToken(rows[0]),
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Operator registration failed",
      stk: err.message,
    });
  }
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  registerOperator,
};
