const upload = require("../libs/saveImages");

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

      if (!filename1 || !filename2 || req?.files?.multiImages?.length > 2) {
        res.status(401);
        return next({
          msg: "Please upload two images (You can select both together)",
        });
      } else {
        req.body = { ...req.body, filename1, filename2 };
        return next();
      }
    } catch (err) {
      console.log("forMulter => ", err.message);
      res.status(404);
      return next({
        msg: "Operator registration failed",
        stk: err.message,
      });
    }
  });
};

module.exports = { forMulter };
