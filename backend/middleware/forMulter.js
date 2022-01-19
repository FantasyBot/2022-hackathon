const upload = require("../libs/saveImages");

//E X T R A
// const upload = multer({ dest: "uploads/" });

const forMulter = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next({
        msg: "Error in multer",
        stk: err.message,
      });
    }
    try {
      const filename1 = req?.files[0]?.filename;
      const filename2 = req?.files[1]?.filename;

      const filename3 = req?.files[2]?.filename;
      const filename4 = req?.files[3]?.filename;
      if (req.files.length !== 4) {
        res.status(401);
        return next({
          msg: "Images must be four!",
        });
      } else {
        req.body = { ...req.body, filename1, filename2, filename3, filename4 };
        return next();
      }
    } catch (err) {
      console.log("forMulter => ", err.message);
      res.status(404);
      return next({
        msg: "Error in multer! Operator registration failed",
        stk: err.message,
      });
    }
  });
};

module.exports = { forMulter };
