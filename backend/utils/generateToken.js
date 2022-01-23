const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    name: user.username,
    email: user.email,
    role: user.role,
    active: user.active,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
};

module.exports = generateToken;
