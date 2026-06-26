document
.getElementById("loginForm")
.addEventListener("submit", login);

async function login(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const message =
    document.getElementById("message");

    message.innerHTML = "";

    //===========================
    // Validation
    //===========================

    if(username === ""){

        message.innerHTML =
        "Username is required.";

        return;

    }

    if(password === ""){

        message.innerHTML =
        "Password is required.";

        return;

    }

    try{

        const response = await fetch("/login",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                username,
                password

            })

        });

        const result = await response.json();

        console.log(result);

        if(result.success){

            //==================================
            // Save logged-in user session
            //==================================

          sessionStorage.setItem(

    "memberID",

    result.memberID

);

sessionStorage.setItem(

    "firstName",

    result.firstName

);

sessionStorage.setItem(

    "role",

    result.role

);

const role =
result.role.toLowerCase();

            // Optional: Store full object


      

            if(role === "user"){

                window.location.href =
                "member-home.html";

            }

            else if(role === "trainer"){

                window.location.href =
                "trainer-home.html";

            }

            else if(role === "admin"){

                window.location.href =
                "AdminDashboard.html";

            }

            else{

                message.innerHTML =
                "Unknown role.";

            }

        }

        else{

            message.innerHTML =
            result.message;

        }

    }

    catch(err){

        console.error(err);

        message.innerHTML =
        "Server connection failed.";

    }

}