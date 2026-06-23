//=====================================================
// Load Trainer Schedule
//=====================================================
//=====================================
// Load Trainer Schedule
//=====================================
async function loadSchedule(search = "") {

    try {

        const trainerID = 3;

        const response = await fetch(
            `/trainer/schedule?trainerID=${trainerID}&search=${encodeURIComponent(search)}`
        );

        const schedule = await response.json();

        console.log(schedule);

        const tbody = document.getElementById("memberTable");

        tbody.innerHTML = "";

        schedule.forEach(item => {

            tbody.innerHTML += `

            <tr>

                <td>${item.Class_ID}</td>

                <td>${item.FullName}</td>

                <td>${item.PlansName}</td>

                <td>${item.ClassName}</td>

                <td>${item.ScheduleDate.substring(0,10)}</td>

                <td>${item.ScheduleTime}</td>

                <td>${item.TrainerName}</td>

                <td>${item.Status}</td>

                <td>

                    <button
                        class="viewBtn"
                        data-id="${item.Class_ID}">
                        View
                    </button>

                </td>

            </tr>

            `;

        });

    }
    catch(err){

        console.error(err);

    }

}

//=======================================
// Load Trainer Dashboard
//=======================================
async function loadDashboard() {

    try {

        const trainerID = 3;

        const response = await fetch(`/trainer/dashboard?trainerID=${trainerID}`);

        const data = await response.json();

        console.log("Dashboard:", data);

        document.getElementById("todayClasses").innerHTML =
            data.todayClasses;

        document.getElementById("assignedMembers").innerHTML =
            data.assignedMembers;

        document.getElementById("totalClasses").innerHTML =
            data.totalClasses;

    }

    catch(err){

        console.error(err);

    }

}
loadDashboard();
loadSchedule();
//=====================================
// Load Page
//=====================================


document
.getElementById("searchMember")
.addEventListener("keyup", function(){

    loadSchedule(this.value);

});
document
.getElementById("memberTable")
.addEventListener("click", async function(e){

    if(e.target.classList.contains("viewBtn")){

        const classID = e.target.dataset.id;

        console.log("Class ID:", classID);

        // Later we'll fetch the class details
        // const response = await fetch(`/trainer/class/${classID}`);
        // const classInfo = await response.json();

    }

});