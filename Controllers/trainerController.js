const pool = require("../db");

//=====================================================
// Trainer Dashboard
//=====================================================
exports.getDashboard = async (req, res) => {

    try {

        const trainerID = req.query.trainerID;

        if (!trainerID) {

            return res.status(400).json({

                success: false,
                message: "Trainer ID is required."

            });

        }

        //=============================
        // Total Classes Assigned
        //=============================
        const [[classes]] = await pool.execute(

            `
            SELECT COUNT(*) AS TotalClasses

            FROM GymClass

            WHERE Trainer_ID = ?
            `,

            [trainerID]

        );

        //=============================
        // Total Members Assigned
        //=============================
        const [[members]] = await pool.execute(

            `
            SELECT COUNT(*) AS AssignedMembers

            FROM Member m

            INNER JOIN Membership ms

                ON m.Membership_ID = ms.Membership_ID

            INNER JOIN GymClass gc

                ON ms.Membership_ID = gc.Membership_ID

            WHERE gc.Trainer_ID = ?
            `,

            [trainerID]

        );

        //=============================
        // Classes Scheduled Today
        //=============================
        const [[today]] = await pool.execute(

            `
            SELECT COUNT(*) AS TodayClasses

            FROM GymClass

            WHERE Trainer_ID = ?

            AND DATE(ScheduleDate) = CURDATE()
            `,

            [trainerID]

        );

        res.json({

            success: true,

            totalClasses: classes.TotalClasses,

            assignedMembers: members.AssignedMembers,

            todayClasses: today.TodayClasses

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

};
//=====================================================
// Load Trainer Schedule
//=====================================================
exports.getSchedule = async (req, res) => {

    try {

        const trainerID = req.query.trainerID;
        const search = req.query.search || "";

        const [rows] = await pool.execute(

            `
            SELECT
                gc.Class_ID,
                m.Member_ID,

                CONCAT(m.FirstName,' ',m.LastName) AS FullName,

                m.Email,

                ms.PlansName,

                gc.ClassName,

                gc.ScheduleDate,

                gc.ScheduleTime,

                CONCAT(t.FirstName,' ',t.LastName) AS TrainerName,

                t.Trainer_ID,

                ms.Status

            FROM Member m

            INNER JOIN Membership ms
                ON m.Membership_ID = ms.Membership_ID

            INNER JOIN GymClass gc
                ON ms.Membership_ID = gc.Membership_ID

            INNER JOIN Trainer t
                ON gc.Trainer_ID = t.Trainer_ID

            WHERE

                gc.Trainer_ID = ?

            AND
            (

                CONCAT(m.FirstName,' ',m.LastName) LIKE ?

                OR gc.ClassName LIKE ?

                OR ms.PlansName LIKE ?

                OR CONCAT(t.FirstName,' ',t.LastName) LIKE ?

                OR CAST(t.Trainer_ID AS CHAR) LIKE ?

                OR gc.ScheduleDate LIKE ?

                OR gc.ScheduleTime LIKE ?

            )

            ORDER BY

                gc.ScheduleDate,
                gc.ScheduleTime

            `,

            [

                trainerID,

                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`,
                `%${search}%`

            ]

        );

        res.json(rows);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            error:err.message

        });

    }

};
