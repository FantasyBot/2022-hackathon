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
      "SELECT id, username, password, email, role, active FROM users WHERE email = $1",
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
const registerCustomer = async (req, res, next) => {
  try {
    const { fullname, password, email, checked } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //is operator not active
    if (checked) {
      // username is fullname
      await pool.query(
        "INSERT INTO users (username, password, email, role) VALUES($1, $2, $3, $4)",
        [fullname, hashedPassword, email, "operator"]
      );
      //find operator user
      const { rows } = await pool.query(
        "SELECT id, username, email, role, active FROM users WHERE email = $1",
        [email]
      );
      res.json({
        message: "Success",
        token: generateToken(rows[0]),
      });
    } else if (!checked) {
      // is user not active
      // username is fullname
      await pool.query(
        "INSERT INTO users (username, password, email) VALUES($1, $2, $3)",
        [fullname, hashedPassword, email]
      );
      //find user
      const { rows } = await pool.query(
        "SELECT id, username, email, role, active FROM users WHERE email = $1",
        [email]
      );
      res.json({
        message: "Success",
        token: generateToken(rows[0]),
      });
    } else {
      res.status(401);
      return next({
        msg: "User registration failed",
      });
    }
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
      active: rows[0].active,
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

// Update user profile
// Put/api/user/profile
// Private
const updateUserProfile = async (req, res, next) => {
  try {
    //Check if the user exists in DB
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      req.user.email,
    ]);
    //id from token
    const { id } = req.user;

    const user = rows[0];
    if (user) {
      user.username = req.body.fullname || user.username;
      user.email = req.body.email || user.email;

      //if the user changed password
      if (req.body.password) {
        const encryptedPassword = await bcrypt.compare(
          req.body.password,
          user.password
        ); //true if the password match

        //if the user didn't write the same password
        if (!encryptedPassword) {
          //hash new password
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.password, salt);
          user.password = hashedPassword;
        }
      }

      const { rows } = await pool.query(
        "UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4",
        [user.username, user.email, user.password, id]
      );

      //Find user in DB for token
      const { rows: tokenInfo } = await pool.query(
        "SELECT id, username, email, role, active FROM users WHERE email=$1",
        [user.email]
      );
      res.json({
        message: "User info Updated",
        token: generateToken(tokenInfo[0]),
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not update user info..",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not update user info",
      stk: err.message,
    });
  }
};

module.exports = {
  authUser,
  getUserProfile,
  updateUserProfile,
  registerCustomer,
};
