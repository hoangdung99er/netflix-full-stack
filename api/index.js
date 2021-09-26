const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const HttpError = require("./model/HttpError");
const authRoutes = require("./routes/auth-routes");
const userRoutes = require("./routes/user-routes");
const movieRoutes = require("./routes/movie-routes");
const listRoutes = require("./routes/list-routes");

const app = express();

require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.0vger.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/auth", authRoutes.router);
app.use("/api/user", userRoutes.router);
app.use("/api/movie", movieRoutes.router);
app.use("/api/list", listRoutes.router);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route", 404);
  return next(error);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error" });
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected");
    app.listen(process.env.PORT || 9999, "localhost");
  })
  .catch((err) => {
    console.log(err);
  });
