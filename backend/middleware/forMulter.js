const upload = require("../libs/saveImages");

const forMulter = (req, res, next) => {
  upload(req, res, (err) => {
    try {
      const { name, email, password } = req.body;
      const filename1 = req.files.multiImages[0].filename;
      const filename2 = req.files.multiImages[1].filename;

      req.body = { ...req.body, filename1, filename2 };
      return next();
    } catch (err) {
      console.log(err);
      res.status(404);
      return next({
        msg: "Operator registration failed",
        stk: err.message,
      });
    }
  });
};

module.exports = { forMulter };
