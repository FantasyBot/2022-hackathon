const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
//Data limit for body
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));


app.use(cors());
app.use(express.json());
dotenv.config();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

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
