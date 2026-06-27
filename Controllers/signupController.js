const pool = require("../db");

exports.signup = async (req, res) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            plansName,
            duration,
            price

        } = req.body;

        // Check if email exists

        const [exists] = await connection.execute(

            "SELECT * FROM member WHERE Email=?",

            [email]

        );

        if (exists.length > 0) {

            await connection.rollback();

            return res.json({

                success:false,

                message:"Email already exists."

            });

        }

        // Create Membership

        const [membership] = await connection.execute(

            `INSERT INTO membership
            (
                PlansName,
                Duration,
                Price,
                Status
            )
            VALUES
            (
                ?,?,?,?
            )`,

            [

                plansName,

                duration,

                price,

                "Active"

            ]

        );

        const membershipID = membership.insertId;

        // Create Member

        await connection.execute(

            `INSERT INTO member
            (
                FirstName,
                LastName,
                Email,
                PhoneNumber,
                Password,
                Membership_ID,
                Role
            )

            VALUES
            (
                ?,?,?,?,?,?,?
            )`,

            [

                firstName,

                lastName,

                email,

                phoneNumber,

                password,

                membershipID,

                "User"

            ]

        );

        await connection.commit();

        res.json({

            success:true,

            message:"Registration successful."

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