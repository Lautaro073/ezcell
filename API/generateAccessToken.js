const jwt = require("jsonwebtoken")
function generateAccessToken(user) {
    return jwt.sign(user, "123456")
}
module.exports = generateAccessToken

