const User = require("../model/User");
const HttpError = require("../model/HttpError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { username, email, password, isAdmin } = req.body;
  let exisitingUserName;
  try {
    exisitingUserName = await User.findOne({ username });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong with username, please try again",
      500
    );
    return next(err);
  }

  if (exisitingUserName) {
    const error = new HttpError(
      "Username already exist, please try with another username",
      403
    );
    return next(error);
  }

  let exisitingEmail;
  try {
    exisitingEmail = await User.findOne({ email });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong with email, please try again",
      500
    );
    return next(err);
  }

  if (exisitingEmail) {
    const error = new HttpError(
      "Email already exist, please try with another username",
      403
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong with password, please try again",
      500
    );
    return next(err);
  }
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profilePic : "",
    isAdmin,
  });

  try {
    await newUser.save();
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while creating user, please try again",
      500
    );
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "2h" }
    );
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while signing token, please try again",
      500
    );
    return next(err);
  }
  res.status(201).json({
    userId: newUser._id,
    email: newUser.email,
    username: newUser.username,
    token,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let exisitingEmail;
  try {
    exisitingEmail = await User.findOne({ email });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong with email, please try again",
      500
    );
    return next(err);
  }

  if (!exisitingEmail) {
    const error = new HttpError(
      "Email not exist, please try with another username",
      403
    );
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, exisitingEmail.password);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong with password, please try again",
      500
    );
    return next(err);
  }

  if (!isValidPassword) {
    const err = new HttpError("Wrong password, please try again", 403);
    return next(err);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: exisitingEmail._id,
        isAdmin: exisitingEmail.isAdmin,
      },
      `${process.env.SECRET_KEY}`,
      { expiresIn: "2h" }
    );
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while signing token, please try again",
      500
    );
    return next(err);
  }
  res.status(200).json({
    userId: exisitingEmail._id,
    email: exisitingEmail.email,
    isAdmin: exisitingEmail.isAdmin,
    token,
  });
};
