

async function loadDashboard() {

    try {

        const memberID = sessionStorage.getItem("memberID");

        const response = await fetch(
            `/memberDashboard?memberID=${memberID}`
        );

        const member = await response.json();

        console.log(member);

        //==============================
        // Welcome Banner
        //==============================

        document.getElementById("welcomeMember").innerHTML =
            `Welcome Back, ${member.FullName} 👋`;

        //==============================
        // Membership Card
        //==============================

        document.getElementById("memberPlan").innerHTML =
            member.PlansName;

        document.getElementById("memberStatus").innerHTML =
            member.Status;

        //==============================
        // Outstanding Balance
        //==============================

        document.getElementById("balance").innerHTML =
            "R" + member.Price;

        //==============================
        // Next Booking
        //==============================

        document.getElementById("nextClass").innerHTML =
            member.ClassName;

        document.getElementById("nextDate").innerHTML =
            member.ScheduleDate.substring(0,10);

        document.getElementById("nextTime").innerHTML =
            member.ScheduleTime;



    }
    catch(err){

        console.error(err);

    }

}

const buttons = document.querySelectorAll(".book-btn");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        if(this.innerText === "Book Session"){

            this.innerText = "Booked ✓";

            this.style.background = "green";

        }

    });

});
let selectedClassID = 0;

const bookingModal =
document.getElementById("bookingModal");
//=====================================
// Load Available Classes
//=====================================
function openBookingModal(

    classID,

    className,

    trainer,

    date,

    time

){

    selectedClassID = classID;

    document.getElementById("modalClassName").innerHTML = className;

    document.getElementById("modalTrainer").innerHTML = trainer;

    document.getElementById("modalDate").innerHTML = date;

    document.getElementById("modalTime").innerHTML = time;

    bookingModal.style.display = "block";

}

document

.getElementById("confirmBooking")

.addEventListener("click", bookClass);



async function bookClass(){

    try{

        const memberID = sessionStorage.getItem("memberID");

        const response = await fetch(

            "/booking",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    memberID:memberID,

                    classID:selectedClassID

                })

            }

        );

        const result = await response.json();

        alert(result.message);

        bookingModal.style.display = "none";

    }

    catch(err){

        console.error(err);

    }

}
async function loadAvailableClasses() {

    try {

        const response = await fetch("/classes");

        const classes = await response.json();

        const container =
        document.getElementById("availableClasses");

        container.innerHTML = "";

        classes.forEach(item => {

            container.innerHTML += `

            <div class="membership-plan">

                <h3>${item.ClassName}</h3>

                <p><strong>Trainer:</strong> ${item.TrainerName}</p>

                <p><strong>Date:</strong> ${item.ScheduleDate.substring(0,10)}</p>

                <p><strong>Time:</strong> ${item.ScheduleTime}</p>

                <button

                    class="book-btn"

                    onclick="openBookingModal(

                        ${item.Class_ID},

                        '${item.ClassName}',

                        '${item.TrainerName}',

                        '${item.ScheduleDate.substring(0,10)}',

                        '${item.ScheduleTime}'

                    )">

                    Book Session

                </button>

            </div>

            `;

        });

    }

    catch(err){

        console.error(err);

    }

}
//=====================================
// Load Upcoming Sessions
//=====================================

async function loadBookings() {

    try {

        const memberID = sessionStorage.getItem("memberID"); // Replace later with logged-in member

        const response = await fetch(
            `/booking/member?memberID=${memberID}`
        );

        const bookings = await response.json();

        const tbody =
        document.getElementById("bookingTable");

        tbody.innerHTML = "";

        bookings.forEach(item => {

            tbody.innerHTML += `

            <tr>

                <td>${item.ScheduleDate.substring(0,10)}</td>

                <td>${item.ClassName}</td>

                <td>${item.TrainerName}</td>

                <td>${item.ScheduleTime}</td>

            </tr>

            `;

        });

    }

    catch(err){

        console.error(err);

    }

}

async function openPaymentModal(){

    const memberID = sessionStorage.getItem("memberID");

    if(!memberID){

        alert("No member is logged in.");

        return;

    }

    const response = await fetch(`/payment/member/${memberID}`);

    const payment = await response.json();

    console.log(payment);

    document.getElementById("payMember").value = payment.FullName;

    document.getElementById("payMembership").value = payment.PlansName;

    document.getElementById("payAmount").value = "R " + payment.Price;

    paymentModal.style.display = "block";

}


async function processPayment() {

    try {

        const memberID = sessionStorage.getItem("memberID");

        const response = await fetch("/payment/pay", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                memberID: memberID
            })

        });

        const result = await response.json();

        alert(result.message);

        document.getElementById("paymentModal").style.display = "none";

        loadDashboard();

    }
    catch (err) {

        console.error(err);

        alert("Payment failed.");

    }

}


document
    .getElementById("payNowBtn")
    .addEventListener("click", processPayment);

document
    .getElementById("closePayment")
    .addEventListener("click", function () {

        document.getElementById("paymentModal").style.display = "none";

    });

window.addEventListener("click", function (event) {

    const modal = document.getElementById("paymentModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});
loadDashboard();
loadAvailableClasses();
loadBookings();