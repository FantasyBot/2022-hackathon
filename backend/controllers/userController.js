const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const pool = require("../config/db");
const error = require("../libs/error");

// Auth user & get token
// POST/api/users/login
// Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      "SELECT id, username, password, role FROM users WHERE email = $1",
      [email]
    );

    //true if the password match
    const encryptedPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!user.rows[0] || !encryptedPassword) {
      res.status(404);
      return next({
        msg: "email or password is incorrect",
      });
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
// POST/api/users/register
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
      "SELECT id, username, role FROM users WHERE username = $1",
      [username]
    );
    console.log(generateToken(user.rows[0]));

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

module.exports = { authUser, registerUser, getUserProfile };
