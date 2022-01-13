const pool = require("../config/db");

// Save reservation info in reservations table
// POST/api/product/save/reservation
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
      "SELECT name FROM hotels WHERE hotels.name = $1",
      [hotel_name]
    );
    if (name_of_hotel[0].name) {
      const { rows } = await pool.query(
        "INSERT INTO reservations (name, location, price, discount_price, hotel_email, phone, " +
          "description, hotel_photo, nights_in_hotel, voucher_price, user_email, buy_date, user_id) " +
          "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)",
        [
          hotel_name,
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

module.exports = {
  saveReservation,
};
