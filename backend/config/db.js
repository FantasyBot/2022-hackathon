// const { Pool } = require("pg");

// const dotenv = require("dotenv");
// dotenv.config();

// // const devConfig = {
// //   database: process.env.DATABASE,
// //   user: process.env.USER,
// //   password: process.env.PASSWORD,
// //   host: process.env.HOST,
// //   port: process.env.PORT_SQL,
// // };

// const devConfig = `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`;

// const proConfig = process.env.DATABASE_URL; //heroku addons

// const pool = new Pool({
//   connectionString:
//     process.env.NODE_ENV === "production" ? proConfig : devConfig,
// });

// module.exports = pool;

//DEFAULT
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();


const devConfig = {
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT_SQL,
  ssl: {
    rejectUnauthorized: false,
  },
};
const pool = new Pool(devConfig);
module.exports = pool;

// const { Client } = require("pg");

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

// client.query(
//   "SELECT table_schema,table_name FROM information_schema.tables;",
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );
