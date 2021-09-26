const express = require("express");
const usersController = require("../controllers/users");
const router = express.Router();
const auth = require("../middleware/auth")

router.use(auth);
router.get("/find/:uid", usersController.findUserById);
router.get("/stats", usersController.getStats);
router.post("/", usersController.createUser);
router.get("/", usersController.findAllUser);
router.put("/:uid", usersController.updateUser)
router.delete("/:uid", usersController.deleteUser)

exports.router = router;