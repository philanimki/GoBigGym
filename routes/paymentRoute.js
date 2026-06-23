const express=require("express");

const router=express.Router();

const paymentController=
require("../Controllers/paymentController");

router.get("/member/:id",
paymentController.getPaymentInfo);

router.post("/pay",
paymentController.makePayment);

module.exports=router;