const bcrypt = require("bcryptjs");

const generateToken = require("../utils/generateToken");

const pool = require("../config/db");

// Auth user & get token
// POST/api/user/login
// Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT id, username, password, role FROM users WHERE email = $1", [email]);
    const encryptedPassword = await bcrypt.compare(password, user.rows[0].password); //true if the password match

    if (!user.rows[0] || !encryptedPassword) {
      res.status(404);
      return next({ msg: "email or password is incorrect" });
    }

    res.json({
      message: "success",
      token: generateToken(user.rows[0]),
    });
  } catch (e) {
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

    await pool.query(
      "INSERT INTO users (username, password, email) VALUES($1, $2, $3)",
      [username, hashedPassword, email]
    );
    const user = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );

    res.json({
      message: "Success",
      token: generateToken(user.rows[0]),
    });
  } catch (e) {
    console.log(e.message);
    res.status(404);
    return next({
      msg: "username or email is already taken...",
      stk: e.message,
    });
  }
};

// Get user profile
// GET/api/users/profile
// Private
const getUserProfile = async (req, res, next) => {
  try {
    const { email } = req.user;
    //Check second time
    const userInfo = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );
    res.json({
      _id: userInfo.rows[0].id,
      name: userInfo.rows[0].username,
      email: userInfo.rows[0].email,
      active: userInfo.rows[0].operator,
    });
  } catch (err) {
    res.status(404);
    return next({
      msg: "User not found",
      stk: err.message,
    });
  }
};


// Register new operator
// POST/api/users/register/operator
// Public
const registerOperator = async (req, res, next) => {
  try {
    const { name, password, email, filename1, filename2 } = req.body;
    console.log(name, email, password, filename1, filename2);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      "INSERT INTO users (username, password, email, role, user_photo1, user_photo2) VALUES($1, $2, $3, $4, $5, $6)",
      [name, hashedPassword, email, "operator", filename1, filename2]
    );

    const operator = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );

    res.json({
      message: "Success operator",
      token: generateToken(operator.rows[0]),
    });
  } catch (err) {
    console.log(err);
    res.status(404);
    return next({
      msg: "Operator registration failed",
      stk: err.message,
    });
  }
};

// Create new hotel
// POST/api/users/create/hotel
// Private
const createHotel = async (req, res, next) => {
  try {
    const { id, username, email, role } = req.user;

    res.json({
      message: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(404);
    return next({
      msg: "Hotel registration failed",
      stk: err.message,
    });
  }
};

module.exports = {
  authUser,
  registerUser,
  getUserProfile,
  registerOperator,
  createHotel,
};
