console.log("Dashboard JS Loaded");



//=========================
// Dashboard numbers on top
//=========================
async function loadDashboard() {

    try {

        console.log("Calling /dashboard...");

        const response = await fetch("/dashboard");

        console.log("Response:", response);

        const data = await response.json();

        console.log("Dashboard Data:", data);

        document.getElementById("totalMembers").innerHTML =
            data.totalMembers;

        document.getElementById("activeMembers").innerHTML =
            data.activeMembers;

        document.getElementById("totalTrainers").innerHTML =
            data.totalTrainers;

        console.log("Dashboard updated.");

    }
    catch(error){

        console.error(error);

    }

}

//=========================
// Members being loaded
//=========================

async function loadMembers(search = "") {

    try {

        const response = await fetch(`/members?search=${encodeURIComponent(search)}`);

        console.log("Status:", response.status);

        const members = await response.json();

        console.log("Returned Data:", members);
        console.log("Is Array:", Array.isArray(members));

        if (!Array.isArray(members)) {

            console.error("Expected an array but received:", members);

            return;

        }

        const tbody = document.getElementById("memberTable");

        tbody.innerHTML = "";

        members.forEach(member => {

            tbody.innerHTML += `

            <tr>

                <td>${member.Member_ID}</td>

                <td>${member.FullName}</td>

                <td>${member.PlansName}</td>

                <td>${member.Status}</td>

                <td>
                     <button
                class="viewBtn"
                data-id="${member.Member_ID}">
                View
            </button>

            <button
                class="editBtn"
                data-id="${member.Member_ID}">
                Edit
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



//=========================
// Load page
//=========================
loadDashboard();
loadMembers();


//=========================
// Search
//=========================
document.getElementById("searchMember")
.addEventListener("keyup", function () {

    console.log("Searching:", this.value);

    loadMembers(this.value);

});


//=========================
// inserting a new member
//=========================

async function createMember(e){
const phoneNumber = document.getElementById("phoneNumber").value;

if (phoneNumber.length !== 10) {

    alert("Phone number must contain exactly 10 digits.");

    return;

}else
    e.preventDefault();

    const member = {

        firstName:
        document.getElementById("firstname").value,

        lastName:
        document.getElementById("surname").value,

        email:
        document.getElementById("email").value,

        phoneNumber:
        document.getElementById("phoneNumber").value,

        plansName:
        document.getElementById("plansName").value,

        duration:
        document.getElementById("duration").value,

        price:
        document.getElementById("price").value,

        status:
        document.getElementById("status").value

    };

    console.log(member);

    try{

        const response = await fetch("/members",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(member)

        });

        const result = await response.json();

        console.log(result);

        if(result.success){

            alert(result.message);

            document
            .getElementById("createMemberForm")
            .reset();

            createModal.style.display="none";

            loadDashboard();

            loadMembers();

        }
        else{

            alert(result.error);

        }

    }

    catch(err){

        console.error(err);

    }

}


document
.getElementById("memberTable")
.addEventListener("click", async function(e){

    if(e.target.classList.contains("viewBtn")){

        const memberID = e.target.dataset.id;

        console.log(memberID);

        const response =
        await fetch(`/members/${memberID}`);

        const member =
        await response.json();

        console.log(member);

        document.getElementById("profileMemberID").innerHTML =
        member.Member_ID;

        document.getElementById("profileName").innerHTML =
        member.FullName;

        document.getElementById("profileEmail").innerHTML =
        member.Email;

        document.getElementById("profilePhone").innerHTML =
        member.PhoneNumber;

        document.getElementById("profilePlan").innerHTML =
        member.PlansName;

        document.getElementById("profileStatus").innerHTML =
        member.Status;

        document.getElementById("profilePrice").innerHTML =
        "R" + member.Price;
      
        document.getElementById("profileAmountOwed").innerHTML =
        "R 0.00";

        profileModal.style.display="block";

    }

    if(e.target.classList.contains("editBtn")){

        const memberID = e.target.dataset.id;

        console.log("Editing Member:", memberID);

        const response = await fetch(`/members/${memberID}`);

       const member = await response.json();

        document.getElementById("editMemberID").innerHTML =
            member.Member_ID;

        document.getElementById("First-Name").value =
            member.FirstName;

        document.getElementById("Last-Name").value =
            member.LastName

        document.getElementById("editEmail").value =
            member.Email;

        document.getElementById("editPhoneNumber").value =
            member.PhoneNumber;

        document.getElementById("editPlansName").value =
            member.PlansName;

        document.getElementById("editDuration").value =
            member.Duration;

        document.getElementById("editPrice").value =
            member.Price;

        document.getElementById("editStatus").value =
            member.Status;

        editModal.style.display = "block";

    }

});



//====================================
// Update Member
//====================================
async function updateMember(e) {

    e.preventDefault();

    const member = {

        memberID: document.getElementById("editMemberID").innerHTML,

        firstName: document.getElementById("First-Name").value,

        lastName: document.getElementById("Last-Name").value,

        email: document.getElementById("editEmail").value,

        phoneNumber: document.getElementById("editPhoneNumber").value,

        plansName: document.getElementById("editPlansName").value,

        duration: document.getElementById("editDuration").value,

        price: document.getElementById("editPrice").value,

        status: document.getElementById("editStatus").value

    };

    console.log(member);

    try {

        const response = await fetch("/members/update", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(member)

        });

        const result = await response.json();

        console.log(result);

        if(result.success){

            alert(result.message);

            editModal.style.display = "none";

            loadMembers();

            loadDashboard();

        }
        else{

            alert(result.error || result.message);

        }

    }
    catch(err){

        console.error(err);

    }

}
document
    .getElementById("editMemberForm")
    .addEventListener("submit", updateMember);

