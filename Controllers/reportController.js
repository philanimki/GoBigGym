const pool = require("../db");

//===================================
// Dashboard Cards
//===================================

exports.getDashboard = async (req, res) => {

    try {

        const [[rows]] = await pool.execute(

            `
            SELECT

                SUM(Price) AS TotalRevenue,

                SUM(CASE

                        WHEN PlansName='Basic'

                        THEN Price

                        ELSE 0

                    END) AS BasicRevenue,

                SUM(CASE

                        WHEN PlansName='Premium'

                        THEN Price

                        ELSE 0

                    END) AS PremiumRevenue,

                SUM(CASE

                        WHEN PlansName='VIP'

                        THEN Price

                        ELSE 0

                    END) AS VIPRevenue

            FROM Membership

            WHERE Status='Active'
            `
        );

        res.json(rows);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

};

//===================================
// Membership Report
//===================================

exports.getMembershipReport = async (req, res) => {

    try{

        const [rows] = await pool.execute(

            `
            SELECT

                PlansName,

                COUNT(*) AS Members,

                SUM(Price) AS MonthlyRevenue,

                SUM(Price*12) AS AnnualRevenue

            FROM Membership

            WHERE Status='Active'

            GROUP BY PlansName
            `
        );

        res.json(rows);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

};