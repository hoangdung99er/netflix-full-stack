const List = require("../model/List");
const HttpError = require("../model/HttpError");
const Movie = require("../model/Movie");

exports.createList = async (req, res, next) => {
  const { title } = req.body;
  let list;
  try {
    list = await List.findOne({ title });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while finding list, could not create list",
      500
    );
    return next(err);
  }

  if (list) {
    const err = new HttpError(
      "List already exist, please try with another title",
      403
    );
    return next(err);
  }

  let savedList;
  if (req.userData.isAdmin) {
    const newList = new List(req.body);
    try {
      savedList = await newList.save();
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not create movie",
        500
      );
      return next(err);
    }
  } else {
    const err = new HttpError("Unauthorizated", 401);
    return next(err);
  }
  res.status(201).json({
    message: "CREATED",
    savedList,
  });
};

exports.deleteLists = async (req, res, next) => {
  const { lid } = req.params;
  let list;
  try {
    list = await List.findById(lid);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while finding list, please try again",
      500
    );
    return next(err);
  }

  if (!list) {
    const err = new HttpError("List is not exist, please try again", 403);
    return next(err);
  }

  if (req.userData.isAdmin) {
    try {
      await List.findByIdAndDelete(lid);
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not get movie",
        500
      );
      return next(err);
    }
  } else {
    return next(new HttpError("Unauthorized, please try again later", 401));
  }

  res.status(200).json({
    message: "DELETED",
  });
};

exports.findList = async (req, res, next) => {
  const { lid } = req.params;
  let list;
  try {
    list = await List.findById(lid);
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while finding list, please try again",
      500
    );
    return next(err);
  }

  if (!list) {
    const err = new HttpError("List is not exist, please try again", 403);
    return next(err);
  }

  res.status(200).json({
    list,
  });
};

exports.updateList = async (req, res, next) => {
  const { lid } = req.params;
  let list;
  if (req.userData.isAdmin) {
    try {
      list = await List.findByIdAndUpdate(
        lid,
        {
          $set: req.body,
        },
        { new: true }
      );
    } catch (error) {
      const err = new HttpError(
        "Something went wrong while update list, please try again",
        500
      );
      return next(err);
    }
  } else {
    return next(new HttpError("Unauthorized", 401));
  }

  res.status(200).json({
    list,
  });
};

exports.getListByGenre = async (req, res, next) => {
  const { type } = req.query;
  const { genre } = req.query;
  let list = [];
  try {
    if (type) {
      if (genre) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: type, genre: genre } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: type } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }
  } catch (error) {
    const err = new HttpError("Something went wrong, could not get movie", 500);
    return next(err);
  }

  // let content = await Promise.all(
  //   list.map((listItem) => {
  //     listItem.content.map(movieId => {
  //       return Movie.find({_id : movieId})
  //     });
  //   })
  // );

  res.status(200).json({
    list,
  });
};
