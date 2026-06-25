const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

// Routes
app.use("/dashboard", require("./routes/dashboardRoute"));
app.use("/members", require("./routes/memberRoute"));
app.use("/trainer", require("./routes/trainerRoute"));
app.use("/memberDashboard",require("./routes/memberDashboardRoute"));
app.use("/login",
require("./routes/loginRoute"));
app.use("/report", require("./routes/reportRoute"))
app.use("/signup", require("./routes/signupRoute"));
app.use("/booking", require("./routes/bookingRoute"));
app.use("/classes", require("./routes/classRoute"));
app.use("/payment",
require("./routes/paymentRoute"));
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});