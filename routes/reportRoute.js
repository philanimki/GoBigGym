const express = require("express");

const router = express.Router();

const reportController =
require("../Controllers/reportController");

router.get("/dashboard", reportController.getDashboard);

router.get("/membership", reportController.getMembershipReport);

module.exports = router;