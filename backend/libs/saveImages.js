const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./backend/public/uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

function checkFileType(file, cb) {
  //Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //Check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000 * 1000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("images", 2);
// .fields([{ name: "multiImages", maxCount: 4 }]);
module.exports = upload;
