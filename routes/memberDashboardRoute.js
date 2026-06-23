const express = require("express");

const router = express.Router();

const memberDashboardController =
require("../Controllers/memberDashboardController");

router.get("/", memberDashboardController.getDashboard);

module.exports = router;