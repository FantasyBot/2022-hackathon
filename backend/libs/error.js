const error = (message, status = 500) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = error;
