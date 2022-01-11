const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config(); // Do we need this here? To use .env files here too

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.use("/static", express.static(path.join(__dirname, "public")));

//Reach images from backend in frontend
app.use(
  "/backend/public/uploads",
  express.static(process.cwd() + "/backend/public/uploads")
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
