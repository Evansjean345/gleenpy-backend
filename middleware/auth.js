const jwt = require("jsonwebtoken");

// i return the arrow function that support the middlewares
module.exports = (req, res) => {
  try {
    const token = req.headers.authorization.split("")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
  } catch (error) {}
};
