const pool = require("../db");

exports.login = async (req, res) => {

    try {

        const {

            username,
            password

        } = req.body;

        const [rows] = await pool.execute(

            `
            SELECT

                Member_ID,

                FirstName,

                LastName,

                Email,

                Role

            FROM Member

            WHERE Email = ?

            AND Password = ?
            `,

            [

                username,

                password

            ]

        );

        if (rows.length === 0) {

            return res.json({

                success: false,

                message: "Invalid username or password."

            });

        }

        res.json({

            success: true,

            memberID: rows[0].Member_ID,
            firstName: rows[0].FirstName,
            role: rows[0].Role

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