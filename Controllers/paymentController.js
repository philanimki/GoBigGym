const pool=require("../db");

exports.getPaymentInfo=async(req,res)=>{

const memberID=req.params.id;

const [rows]=await pool.execute(

`
SELECT

CONCAT(m.FirstName,' ',m.LastName) AS FullName,

ms.PlansName,

ms.Price

FROM member m

INNER JOIN membership ms

ON m.Membership_ID=ms.Membership_ID

WHERE m.Member_ID=?

`,

[memberID]

);

res.json(rows[0]);

};

exports.makePayment=async(req,res)=>{

const {memberID}=req.body;

await pool.execute(

`
INSERT INTO payment
(
Member_ID,
Amount,
Payment_Date,
Payment_Status
)
VALUES
(
?,
(
SELECT Price
FROM membership ms
INNER JOIN Member m
ON ms.Membership_ID=m.Membership_ID
WHERE m.Member_ID=?
),
NOW(),
'Paid'
)
`,

[memberID,memberID]

);

res.json({

success:true,

message:"Payment Successful."

});

};