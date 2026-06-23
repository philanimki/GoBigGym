const pool = require("../db");

//====================================
// Load Available Classes
//====================================

exports.getClasses = async (req, res) => {

    try {

        const [rows] = await pool.execute(

            `
            SELECT

                gc.Class_ID,

                gc.ClassName,

                gc.ScheduleDate,

                gc.ScheduleTime,

                gc.Capacity,

                CONCAT(t.FirstName,' ',t.LastName) AS TrainerName

            FROM GymClass gc

            INNER JOIN Trainer t

                ON gc.Trainer_ID = t.Trainer_ID

            ORDER BY

                gc.ScheduleDate,
                gc.ScheduleTime
            `
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