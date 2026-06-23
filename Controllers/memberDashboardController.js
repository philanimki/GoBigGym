const pool = require("../db");

exports.getDashboard = async (req, res) => {

    try {

        const memberID = req.query.memberID;

        const [[member]] = await pool.execute(

            `
            SELECT

                CONCAT(m.FirstName,' ',m.LastName) AS FullName,

                ms.PlansName,

                ms.Status,

                ms.Price,

                gc.ClassName,

                gc.ScheduleDate,

                gc.ScheduleTime

            FROM Member m

            INNER JOIN Membership ms

                ON m.Membership_ID = ms.Membership_ID

            LEFT JOIN GymClass gc

                ON ms.Membership_ID = gc.Membership_ID

            WHERE m.Member_ID = ?

            LIMIT 1
            `,

            [memberID]

        );

        res.json(member);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

};