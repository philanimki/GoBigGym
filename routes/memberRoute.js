const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");

router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMember);
router.post("/", memberController.createMember);
router.post("/update", memberController.updateMember);



module.exports = router;