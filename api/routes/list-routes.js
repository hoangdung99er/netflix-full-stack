const express = require("express");
const listController = require("../controllers/lists");
const router = express.Router();
const auth = require("../middleware/auth")

router.use(auth);
router.post("/", listController.createList);
router.put("/:lid", listController.updateList);
router.get("/find/:lid", listController.findList);
router.get("/", listController.getListByGenre);
router.delete("/:lid", listController.deleteLists);


exports.router = router;