const express = require("express");

const router = express.Router();

const classController =
require("../Controllers/classController");

router.get("/", classController.getClasses);

module.exports = router;