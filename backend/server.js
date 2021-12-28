const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const upload = require("./libs/saveImages");

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

// app.get("/test", (req, res) => {
//   res.render("index");
// });

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    console.log(req.files);
    if (req.files.multiImages === undefined) {
      res.send("No image selected");
    } else {
      res.json({ message: "Success", images: req.files.multiImages });
    }
  });
});

// app.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.render("index", {
//         msg: err,
//       });
//     } else {
//       if (req.file == undefined) {
//         res.render("index", {
//           msg: "Error: No File Selected!",
//         });
//       } else {
//         res.render("index", {
//           msg: "File Uploaded!",
//           file: `public/uploads/${req.file.filename}`,
//         });
//       }
//     }
//   });
// });

app.use("/api/user", userRoutes);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
