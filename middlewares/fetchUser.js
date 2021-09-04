const jwt = require("jsonwebtoken");
const { jwt_secret: JWTSecret } = require("../config.json");

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and add id to the req object.
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({
      error: "Please authenticate using a valid token.",
    });
  }
  try {
    data = jwt.verify(token, JWTSecret);
    req.user = data.user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({
      error: "Token Verification Failed",
    });
  }
};

module.exports = fetchUser;
