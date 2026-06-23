const express = require("express");

const router = express.Router();

const dashboardController =
require("../Controllers/dashboardController");

router.get("/", dashboardController.getDashboard);

module.exports = router;