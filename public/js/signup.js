//======================================
// Membership prices
//======================================

document.getElementById("plansName")

.addEventListener("change", function(){

    const price = document.getElementById("price");

    switch(this.value){

        case "Basic":

            price.value = 299;

            break;

        case "Premium":

            price.value = 499;

            break;

        case "VIP":

            price.value = 699;

            break;

        default:

            price.value="";

    }

});


//======================================
// Register Member
//======================================

document

.getElementById("signupForm")

.addEventListener("submit", signup);



async function signup(e){

    e.preventDefault();

    if(document.getElementById("password").value !==

       document.getElementById("confirmPassword").value){

        alert("Passwords do not match.");

        return;

    }

    if(!document.getElementById("terms").checked){

        alert("Accept the Terms & Conditions.");

        return;

    }

    const member={

        firstName:

        document.getElementById("firstName").value,

        lastName:

        document.getElementById("lastName").value,

        email:

        document.getElementById("email").value,

        phoneNumber:

        document.getElementById("phoneNumber").value,

        password:

        document.getElementById("password").value,

        plansName:

        document.getElementById("plansName").value,

        duration:

        document.getElementById("duration").value,

        price:

        document.getElementById("price").value

    };

    const response = await fetch("/signup",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(member)

    });

    const result = await response.json();

    if(result.success){

        alert(result.message);

        window.location="Login.html";

    }

    else{

        alert(result.message);

    }

}