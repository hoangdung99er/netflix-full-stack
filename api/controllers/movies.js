const Movie = require("../model/Movie");
const HttpError = require("../model/HttpError");

exports.createMovie = async (req, res, next) => {
  const { title } = req.body;
  let movie;
  try {
    movie = await Movie.findOne({ title });
  } catch (error) {
    const err = new HttpError(
      "Something went wrong while finding movie, could not create movie",
      500
    );
    return next(err);
  }

  if (movie) {
    const err = new HttpError(
      "Movie already exist, please try with another title",
      403
    );
    return next(err);
  }

  console.log(movie)

  let savedMovie;
  if (req.userData.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      savedMovie = await newMovie.save();
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
    savedMovie,
  });
};

exports.updateMovie = async (req, res, next) => {
  const { mid } = req.params;
  let updatedMovie;
  if (req.userData.isAdmin) {
    try {
      updatedMovie = await Movie.findByIdAndUpdate(
        mid,
        {
          $set: req.body,
        },
        { new: true }
      );
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not update movie",
        500
      );
      return next(err);
    }
  } else {
    const err = new HttpError("Unauthorizated", 401);
    return next(err);
  }
  res.status(200).json({
    message: "UPDATED",
    updatedMovie,
  });
};

exports.deleteMovie = async (req, res, next) => {
  const { mid } = req.params;
  if (req.userData.isAdmin) {
    try {
      await Movie.findByIdAndDelete(mid);
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete movie",
        500
      );
      return next(err);
    }
  } else {
    const err = new HttpError("Unauthorizated", 401);
    return next(err);
  }
  res.status(200).json({
    message: "DELETED",
  });
};

exports.getMovie = async (req, res, next) => {
  const { mid } = req.params;
  let movie;
  try {
    movie = await Movie.findById(mid);
  } catch (error) {
    const err = new HttpError("Something went wrong, could not get movie", 500);
    return next(err);
  }
  res.status(200).json({
    movie,
  });
};

exports.getAllMovie = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find({});
  } catch (error) {
    const err = new HttpError("Something went wrong, could find all movie", 500);
    return next(err);
  }
  res.status(200).json({
    movies,
  });
};

exports.getRandom = async (req, res, next) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
  } catch (error) {
    const err = new HttpError(
      "Something went wrong, could not get random movie",
      500
    );
    return next(err);
  }
  res.status(200).json({
    movie,
  });
};

exports.getAllMovieLatest = async (req, res, next) => {
  let movies;
  if (req.userData.isAdmin) {
    try {
      movies = await Movie.find({});
    } catch (error) {
      const err = new HttpError(
        "Something went wrong, could not delete movie",
        500
      );
      return next(err);
    }
  } else {
    const err = new HttpError("Unauthorizated", 401);
    return next(err);
  }
  res.status(200).json({
    movies : movies.reverse(),
  });
};
