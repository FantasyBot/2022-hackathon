const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors()); 
app.use(express.json());
dotenv.config();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));


app.use("/api/user", userRoutes);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
