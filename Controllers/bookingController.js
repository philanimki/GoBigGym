const pool = require("../db");

exports.createBooking = async (req,res)=>{

    const connection = await pool.getConnection();

    try{

        await connection.beginTransaction();

        const{

            memberID,

            classID

        } = req.body;

        const [exists] = await connection.execute(

            `

            SELECT *

            FROM booking

            WHERE

            Member_ID=?

            AND

            Class_ID=?

            `,

            [

                memberID,

                classID

            ]

        );

        if(exists.length>0){

            await connection.rollback();

            return res.json({

                success:false,

                message:"You already booked this class."

            });

        }

        await connection.execute(

            `

            INSERT INTO Booking

            (

                Member_ID,

                Class_ID,

                BookingStatus,

                BookingDate

            )

            VALUES

            (

                ?,?,'Booked',CURDATE()

            )

            `,

            [

                memberID,

                classID

            ]

        );

        await connection.commit();

        res.json({

            success:true,

            message:"Booking successful."

        });

    }

    catch(err){

        await connection.rollback();

        console.error(err);

        res.json({

            success:false,

            error:err.message

        });

    }

    finally{

        connection.release();

    }

};
//=========================================
// Get Bookings for Logged-in Member
//=========================================

exports.getBookingMember = async (req, res) => {

    try {

        const memberID = req.query.memberID;

        const [rows] = await pool.execute(

            `
            SELECT

                b.Booking_ID,

                gc.Class_ID,

                gc.ClassName,

                gc.ScheduleDate,

                gc.ScheduleTime,

                CONCAT(t.FirstName,' ',t.LastName) AS TrainerName,

                b.BookingStatus

            FROM Booking b

            INNER JOIN GymClass gc
                ON b.Class_ID = gc.Class_ID

            INNER JOIN Trainer t
                ON gc.Trainer_ID = t.Trainer_ID

            WHERE b.Member_ID = ?

            ORDER BY

                gc.ScheduleDate,
                gc.ScheduleTime
            `,

            [memberID]

        );

        res.json(rows);

    }

    catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            error: err.message

        });

    }

};