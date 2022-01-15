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
