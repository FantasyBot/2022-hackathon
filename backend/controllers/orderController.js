const pool = require("../config/db");

// Save reservation info in reservations table
// POST/api/order/save/reservation
// Private
const saveReservation = async (req, res, next) => {
  try {
    const {
      name: hotel_name,
      location,
      price,
      discount_price,
      email: hotel_email,
      phone,
      description,
      first_photo: hotel_photo,
      nights_in_hotel,
      voucher_price,
    } = req.body;

    const { email: user_email, id: user_id } = req.user;

    //Current Time :)
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const current_time = today.toLocaleDateString();

    const { rows: name_of_hotel } = await pool.query(
      "SELECT id, name FROM hotels WHERE hotels.name = $1",
      [hotel_name]
    );
    if (name_of_hotel[0].name) {
      const { rows } = await pool.query(
        "INSERT INTO reservations (r_hotel_name, r_location, r_price, r_discount_price, r_hotel_email, r_phone, " +
          "r_description, r_hotel_photo, r_nights_in_hotel, r_voucher_price, r_user_email, r_buy_date, r_user_id, r_hotel_id) " +
          "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)",
        [
          name_of_hotel[0]?.name,
          location,
          price,
          discount_price,
          hotel_email,
          phone,
          description,
          hotel_photo,
          nights_in_hotel,
          voucher_price,
          user_email,
          current_time,
          user_id,
          name_of_hotel[0]?.id,
        ]
      );

      res.json({
        message: "Payment is successfull, reservation added!",
      });
    } else {
      res.status(404);
      return next({
        msg: "No such hotel...",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Reservation failed",
      stk: err.message,
    });
  }
};

// Display hotel reservation for operator
// GET/api/order/hotel/reservations
// Private
const operatorReservations = async (req, res, next) => {
  try {
    const { email } = req.user;

    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE email= $1",
      [email]
    );
    if (user[0]) {
      const { rows } = await pool.query(
        "SELECT r_hotel_name, r_location, r_price, r_discount_price, r_description " +
          "r_hotel_photo, r_nights_in_hotel, r_voucher_price, r_user_email, r_buy_date " +
          "FROM users u JOIN hotels h ON h.user_id=u.id " +
          "JOIN reservations r ON r.r_hotel_id=h.id " +
          "AND u.email = $1",
        [email]
      );

      res.json({
        message: "Success",
        reservations: rows,
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not get operator's reservations, operator does not exists",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get operator's reservations",
      stk: err.message,
    });
  }
};

// Display hotel reservation for user
// GET/api/order/hotel/user/reservations
// Private
const userReservations = async (req, res, next) => {
  try {
    const { id, email } = req.user;

    const { rows: user } = await pool.query(
      "SELECT * FROM users WHERE email= $1",
      [email]
    );

    if (user[0]) {
      const { rows } = await pool.query(
        "SELECT * FROM reservations WHERE r_user_id=$1",
        [id]
      );

      res.json({
        message: "Success",
        reservations: rows,
      });
    } else {
      res.status(404);
      return next({
        msg: "Can not get users's reservations, user does not exist",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get user users's reservations",
      stk: err.message,
    });
  }
};

module.exports = {
  saveReservation,
  operatorReservations,
  userReservations,
};
