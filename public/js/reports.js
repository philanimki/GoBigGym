async function loadDashboard(){

    const response =
    await fetch("/report/dashboard");

    const data =
    await response.json();

    document.getElementById("totalRevenue").innerHTML =
    "R " + data.TotalRevenue;

    document.getElementById("basicRevenue").innerHTML =
    "R " + data.BasicRevenue;

    document.getElementById("premiumRevenue").innerHTML =
    "R " + data.PremiumRevenue;

    document.getElementById("vipRevenue").innerHTML =
    "R " + data.VIPRevenue;

}
async function loadReportTable(){

    const response =
    await fetch("/report/membership");

    const report =
    await response.json();

    const tbody =
    document.getElementById("reportTable");

    tbody.innerHTML="";

    report.forEach(item=>{

        tbody.innerHTML +=`

        <tr>

        <td>${item.PlansName}</td>

        <td>${item.Members}</td>

        <td>R ${item.MonthlyRevenue}</td>

        <td>R ${item.AnnualRevenue}</td>

        </tr>

        `;

    });

}
async function loadChart(){

    const response =
    await fetch("/report/membership");

    const report =
    await response.json();

    const labels =
    report.map(x=>x.PlansName);

    const revenue =
    report.map(x=>x.MonthlyRevenue);

    new Chart(

        document.getElementById("revenueChart"),

        {

            type:"bar",

            data:{

                labels:labels,

                datasets:[{

                    label:"Monthly Revenue",

                    data:revenue

                }]

            }

        }

    );

}
let membershipChart;

async function loadMembershipChart() {

    const response = await fetch("/report/membership");

    const report = await response.json();

    const labels = report.map(item => item.PlansName);

    const members = report.map(item => Number(item.Members));

    const ctx = document
        .getElementById("membershipChart")
        .getContext("2d");

    if (membershipChart) {
        membershipChart.destroy();
    }

    membershipChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: labels,

            datasets: [{

                data: members

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
loadChart();
loadDashboard();

loadReportTable()