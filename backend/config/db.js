const { Pool } = require("pg");

const dotenv = require("dotenv");
dotenv.config();
// console.log('dotenv.config', dotenv.config());

const pool = new Pool({
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT_SQL,
});

module.exports = pool;
