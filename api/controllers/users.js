const User = require("../model/User");
const bcrypt = require("bcryptjs");
const HttpError = require("../model/HttpError");

exports.updateUser = async (req, res, next) => {
  const { email, password, username, profilePic } = req.body;
  const { uid } = req.params;

  let user;
  try {
    user = await User.findById(uid);
  } catch (error) {
    const err = new HttpError("Something went wrong, could not find user", 500);
    return next(err);
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

  if (
    req.userData.userId.toString() === user._id.toString() ||
    req.userData.isAdmin
  ) {
    try {
      user = await User.findByIdAndUpdate(
        uid,
        {
          $set: { username, email, password: hashedPassword, profilePic },
        },
        { new: true }
      );
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not update user",
        500
      );
      return next(err);
    }
  } else {
    return next(new HttpError("Unauthorized", 401));
  }

  res.status(200).json({
    message: "SUCCESS",
  });
};

exports.createUser = async (req, res, next) => {
  const { username, email, password, isAdmin, profilePic } = req.body;
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
    profilePic,
    isAdmin,
  });

  if (req.userData.isAdmin) {
    try {
      await newUser.save();
    } catch (error) {
      const err = new HttpError(
        "Something went wrong while creating user, please try again",
        500
      );
      return next(err);
    }
  } else {
    return next(new HttpError("Unauthorized", 401));
  }

  res.status(201).json({
    userId: newUser._id,
    email: newUser.email,
    username: newUser.username,
  });
};

// UPDATE USER
exports.deleteUser = async (req, res, next) => {
  const { uid } = req.params;

  let user;
  try {
    user = await User.findById(uid);
  } catch (error) {
    const err = new HttpError("Something went wrong, could not find user", 500);
    return next(err);
  }

  if (
    req.userData.userId.toString() === user._id.toString() ||
    req.userData.isAdmin
  ) {
    try {
      user = await User.findByIdAndDelete(uid);
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete user",
        500
      );
      return next(err);
    }
    res.status(200).json({
      message: "DELETED",
    });
  } else {
    return next(new HttpError("Unauthorized", 401));
  }
};

// GET USER BY ID
exports.findUserById = async (req, res, next) => {
  const { uid } = req.params;

  let user;
  try {
    user = await User.findById(uid).select("-password");
  } catch (error) {
    const err = new HttpError("Something went wrong, could not find user", 500);
    return next(err);
  }

  res.status(200).json({
    user,
  });
};

// GET ALL USER
exports.findAllUser = async (req, res, next) => {
  const query = req.query.new;
  let users;

  if (req.userData.isAdmin) {
    try {
      users = query
        ? await User.aggregate([
            { $sort: { createdAt: -1 } },
            { $sample: { size: 10 } },
            { $match: { isAdmin: false } },
          ])
        : await User.aggregate([{ $match: { isAdmin: false } }]);
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not find users",
        500
      );
      return next(err);
    }
  } else {
    return next(new HttpError("Unauthorized", 401));
  }

  res.status(200).json({
    users,
  });
};

exports.getStats = async (req, res, next) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);

  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let data;
  try {
    data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not find users",
      500
    );
    return next(err);
  }

  res.status(200).json({
    data,
  });
};
