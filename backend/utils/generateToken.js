const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.username,
        active: user.role
    }

    return jwt.sign((payload), process.env.JWT_SECRET, {
        expiresIn: '5d'
    })
}

module.exports = generateToken;