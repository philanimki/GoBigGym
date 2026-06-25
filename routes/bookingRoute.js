const express = require("express");

const router = express.Router();

const bookingController =
require("../Controllers/bookingController");
router.get("/member", bookingController.getBookingMember);
router.post("/", bookingController.createBooking);

module.exports = router;