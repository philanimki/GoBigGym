const express = require("express");

const router = express.Router();

const trainerController = require("../Controllers/trainerController");

router.get("/dashboard", trainerController.getDashboard);


router.get("/schedule", trainerController.getSchedule);

module.exports = router;