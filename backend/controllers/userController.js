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

    const operator = await pool.query(
      "SELECT id, username, email, role FROM users WHERE email = $1",
      [email]
    );

    res.json({
      message: "Success operator",
      token: generateToken(operator.rows[0]),
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

// Create new hotel
// POST/api/user/create/hotel
// Private
const createHotel = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      name,
      location,
      price,
      discount_price,
      email,
      phone,
      description,
      filename1,
      filename2,
      filename3,
      filename4,
    } = req.body;

    await pool.query(
      "INSERT INTO hotels (name, location, price, discount_price, email, phone, description, user_id) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      [name, location, price, discount_price, email, phone, description, id]
    );

    const hotelId = await pool.query("SELECT id from hotels where name = $1", [
      name,
    ]);

    await pool.query(
      "INSERT INTO media (first_photo, second_photo, third_photo, fourth_photo, author_photo, hotel_photo) " +
        "VALUES($1, $2, $3, $4, $5, $6)",
      [filename1, filename2, filename3, filename4, id, hotelId.rows[0].id]
    );

    res.json({
      message: "Hotel successfully registered",
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Hotel registration failed",
      stk: err.message,
    });
  }
};

// Get all hotels
// GET/api/user/allhotels
// Public
const getAllHotels = async (req, res, next) => {
  try {
    const myHotelInfo = await pool.query(
      "SELECT name, location, price, discount_price, email, phone, description, first_photo, user_id " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo"
    );
    if (myHotelInfo.rows.length !== 0) {
      res.json({
        message: "SUCCESS",
        allHotels: myHotelInfo.rows,
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not get user's hotels",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get user's hotels",
      stk: err.message,
    });
  }
};

// Get user's hotels
// GET/api/user/myhotels
// Private
const getMyHotels = async (req, res, next) => {
  try {
    const { id } = req.user;

    const myHotelInfo = await pool.query(
      "SELECT * FROM (SELECT name, location, price, discount_price, email, phone, description, first_photo, user_id " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo) as joined_info WHERE joined_info.user_id = $1",
      [id]
    );

    if (myHotelInfo.rows.length !== 0) {
      res.json({
        message: "SUCCESS",
        hotels: myHotelInfo.rows,
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not get user's hotels",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get user's hotels",
      stk: err.message,
    });
  }
};

// Get one hotel by name
// GET/api/user/hotels/:id
// Public
const getSingleHotel = async (req, res, next) => {
  try {
    const { id: single_hotel_name } = req.params;

    const myHotelInfo = await pool.query(
      "SELECT * FROM (SELECT name, location, price, discount_price, email, phone, description, first_photo, second_photo, third_photo, fourth_photo " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo) as joined_info WHERE joined_info.name = $1",
      [single_hotel_name]
    );

    if (myHotelInfo.rows[0]) {
      res.json({
        message: "SUCCESS",
        hotel_info: myHotelInfo.rows[0],
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not get hotel info",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get hotel info",
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
  getAllHotels,
  getMyHotels,
  getSingleHotel,
};
