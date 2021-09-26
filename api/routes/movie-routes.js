const express = require("express");
const movieController = require("../controllers/movies");
const router = express.Router();
const auth = require("../middleware/auth")

router.use(auth)
router.get("/random", movieController.getRandom);
router.get("/find/:mid", movieController.getMovie);
router.get("/", movieController.getAllMovieLatest);
router.get("/all", movieController.getAllMovie);
router.post("/", movieController.createMovie);
router.put("/:mid", movieController.updateMovie);
router.delete("/:mid", movieController.deleteMovie);

exports.router = router;