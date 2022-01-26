const pool = require("../config/db");

// Create new hotel
// POST/api/product/create/hotel
// Private
const createHotel = async (req, res, next) => {
  try {
    const { id: user_id_from_token } = req.user;
    const {
      name,
      location,
      city,
      latitude,
      longitude,
      price,
      discount_price,
      email,
      phone,
      description,
      image1,
      image2,
      image3,
      image4,
    } = req.body;
    await pool.query(
      "INSERT INTO hotels (name, location, city, latitude, longitude, price, discount_price, email, phone, description, user_id) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        name,
        location,
        city,
        latitude,
        longitude,
        price,
        discount_price,
        email,
        phone,
        description,
        user_id_from_token,
      ]
    );

    const { rows: hotelId } = await pool.query(
      "SELECT id from hotels where name = $1",
      [name]
    );

    await pool.query(
      "INSERT INTO media (first_photo, second_photo, third_photo, fourth_photo, author_photo_id, hotel_photo_id) " +
        "VALUES($1, $2, $3, $4, $5, $6)",
      [image1, image2, image3, image4, user_id_from_token, hotelId[0].id]
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
// GET/api/product/allhotels
// Public
const getAllHotels = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT hotels.id, name, location, city, latitude, longitude, price, discount_price, email, phone, description, first_photo " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo_id"
    );

    if (rows.length !== 0) {
      // let citys = [];
      // for (var i = 0; i < rows.length; i++) {
      //   if (!citys.includes(rows[i].city)) {
      //     citys.push(rows[i].city);
      //   }
      // }

      // let resultArr = [];
      // for (var k = 0; k < citys.length; k++) {
      //   resultArr.push({
      //     [citys[k]]: (filtered = rows.filter(
      //       (item) => item.city === citys[k]
      //     )),
      //   });
      // }

      res.json({
        message: "SUCCESS",
        allHotels: rows,
      });
    } else {
      res.json({
        message: "No hotels added...",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get hotels",
      stk: err.message,
    });
  }
};

// Get all filtered hotels
// GET/api/product/allhotels/filteredbycity
// Public
const getAllFilteredHotels = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      "SELECT hotels.id, name, location, city, latitude, longitude, price, discount_price, email, phone, description, first_photo " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo_id"
    );

    if (rows.length !== 0) {
      let citys = [];
      for (var i = 0; i < rows.length; i++) {
        if (!citys.includes(rows[i].city)) {
          citys.push(rows[i].city);
        }
      }

      let resultArr = [];
      for (var k = 0; k < citys.length; k++) {
        resultArr.push({
          [citys[k]]: (filtered = rows.filter(
            (item) => item.city === citys[k]
          )),
        });
      }

      res.json({
        message: "SUCCESSFULLY FILTERED",
        filteredHotels: resultArr,
      });
    } else {
      res.json({
        message: "filtered hotels failed, no hotels added...",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Can not get hotels",
      stk: err.message,
    });
  }
};

// Get user's hotels
// GET/api/product/myhotels
// Private
const getMyHotels = async (req, res, next) => {
  try {
    const { id } = req.user;

    const { rows } = await pool.query(
      "SELECT * FROM (SELECT hotels.id, name, location, city, latitude, longitude, price, discount_price, email, phone, description, first_photo, user_id " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo_id) as joined_info WHERE joined_info.user_id = $1",
      [id]
    );

    if (rows.length !== 0) {
      res.json({
        message: "SUCCESS",
        hotels: rows,
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
// GET/api/product/hotels/:id
// Public
const getSingleHotel = async (req, res, next) => {
  try {
    const { id: single_hotel_name } = req.params;

    const { rows } = await pool.query(
      "SELECT * FROM (SELECT hotels.id name, location, city, latitude, longitude, price, discount_price, email, phone, " +
        "description, first_photo, second_photo, third_photo, fourth_photo " +
        "FROM hotels JOIN media ON hotels.id = media.hotel_photo_id) as joined_info WHERE joined_info.name = $1",
      [single_hotel_name]
    );

    if (rows[0]) {
      res.json({
        message: "SUCCESS",
        hotel_info: rows[0],
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

// Delete one hotel
// DELETE/api/product/hotels/myhotels/:id
// Private
const deleteHotel = async (req, res, next) => {
  try {
    const { id: hotel_name } = req.params;

    const { rows } = await pool.query(
      "SELECT id FROM hotels h WHERE h.name=$1",
      [hotel_name]
    );

    const { rows: delMedia } = await pool.query(
      "DELETE FROM media m WHERE m.hotel_photo_id=$1",
      [rows[0].id]
    );

    const { rows: delHotel } = await pool.query(
      "DELETE FROM hotels h WHERE h.name=$1",
      [hotel_name]
    );

    res.json({
      message: "Hotel successfully deleted",
    });
  } catch (err) {
    console.log(err.message);
    res.status(404);
    return next({
      msg: "Unsuccessful, can not delete hotel",
      stk: err.message,
    });
  }
};

module.exports = {
  createHotel,
  getAllHotels,
  getMyHotels,
  getSingleHotel,
  deleteHotel,
  getAllFilteredHotels,
};
