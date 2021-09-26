const HttpError = require("../model/HttpError");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(new HttpError("Verify token failed, please try again", 403));
    }
    const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    req.userData = { userId: decodedToken.userId, isAdmin: decodedToken.isAdmin };
    next();
  } catch (error) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }
};
