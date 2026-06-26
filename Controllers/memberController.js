const pool = require("../db");

exports.getAllMembers = async (req, res) => {

    try {

        const search = req.query.search;

        let sql = `
            SELECT
                m.Member_ID,
                CONCAT(m.FirstName,' ',m.LastName) AS FullName,
                ms.PlansName,
                ms.Status
            FROM member m
            INNER JOIN membership ms
                ON m.Membership_ID = ms.Membership_ID
        `;

        let params = [];

        if (search) {

            sql += `
                WHERE CONCAT(m.FirstName,' ',m.LastName) LIKE ?
                OR ms.PlansName LIKE ?
                OR ms.Status LIKE ?
            `;

            params = [
                `%${search}%`,
                `%${search}%`,
                `%${search}%`
            ];

        }

        const [rows] = await pool.execute(sql, params);

        res.json(rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};


// function to generate a password
function generatePassword(length = 10) {

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@#$!";

    const allCharacters =
        uppercase +
        lowercase +
        numbers +
        symbols;

    let password = "";

    // Ensure at least one character from each category
    password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));

    // Fill the remaining length
    for (let i = password.length; i < length; i++) {

        password += allCharacters.charAt(
            Math.floor(Math.random() * allCharacters.length)
        );

    }

    // Shuffle the password
    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    return password;

}

exports.createMember = async (req, res) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            firstName,
            lastName,
            email,
            phoneNumber,
            plansName,
            duration,
            price,
            status

        } = req.body;

        // Generate a random password
        const password = generatePassword();

        // Insert into Membership
        const [membershipResult] = await connection.execute(

            `INSERT INTO Membership
            (
                PlansName,
                Duration,
                Price,
                Status
            )
            VALUES (?,?,?,?)`,

            [
                plansName,
                duration,
                price,
                status
            ]

        );

        // Get the generated Membership_ID
        const membershipID = membershipResult.insertId;

        // Insert into Member
        const [memberResult] = await connection.execute(

            `INSERT INTO Member
            (
                FirstName,
                LastName,
                Email,
                Password,
                PhoneNumber,
                Membership_ID
            )
            VALUES (?,?,?,?,?,?)`,

            [
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                membershipID
            ]

        );

        // Commit transaction
        await connection.commit();

        res.status(201).json({

            success: true,

            message: `Member created successfully! Temporary Password: ${password}`,

            memberID: memberResult.insertId,

            membershipID: membershipID,

            password: password

        });

    }
    catch (err) {

        await connection.rollback();

        console.error(err);

        res.status(500).json({

            success: false,

            error: err.message

        });

    }
    finally {

        connection.release();

    }

};



//Pullinb members

exports.getMember = async (req, res) => {
  

    try {

        const memberID = req.params.id;

        const [rows] = await pool.execute(

            `
            SELECT

                m.Member_ID,

                m.FirstName,

                m.LastName,
     CONCAT(m.FirstName,' ',m.LastName) AS FullName,
                m.Email,

                m.PhoneNumber,

                ms.PlansName,

                ms.Duration,

                ms.Price,

                ms.Status

            FROM Member m

            INNER JOIN Membership ms

                ON m.Membership_ID = ms.Membership_ID

            WHERE m.Member_ID = ?

            `,

            [memberID]

        );

        if(rows.length === 0){

            return res.status(404).json({

                message:"Member not found"

            });

        }

        res.json(rows[0]);

    }

    catch(err){

        console.error(err);

        res.status(500).json({

            error:err.message

        });

    }

};
//==============================
// Update Member
//==============================
exports.updateMember = async (req, res) => {

    const connection = await pool.getConnection();
    console.log("BODY RECEIVED:");
console.log(req.body);

console.log("memberID =", req.body.memberID);
console.log("firstName =", req.body.firstName);
console.log("lastName =", req.body.lastName);
console.log("plansName =", req.body.plansName);
console.log("duration =", req.body.duration);
console.log("price =", req.body.price);
console.log("status =", req.body.status);

    try {

        await connection.beginTransaction();

        const {

            memberID,
            firstName,
            lastName,
            email,
            phoneNumber,
            plansName,
            duration,
            price,
            status

        } = req.body;

        // Get Membership_ID
       console.log("Searching for Member ID:", memberID);

const [membership] = await connection.execute(
    `
    SELECT Membership_ID
    FROM Member
    WHERE Member_ID = ?
    `,
    [memberID]
);

console.log(membership);

        if (membership.length === 0) {

            await connection.rollback();

            return res.json({

                success: false,
                message: "Member not found."

            });

        }

        const membershipID = membership[0].Membership_ID;

        // Update Member

        await connection.execute(

            `
            UPDATE member

            SET

                FirstName = ?,
                LastName = ?,
                Email = ?,
                PhoneNumber = ?

            WHERE Member_ID = ?
            `,

            [

                firstName,
                lastName,
                email,
                phoneNumber,
                memberID

            ]

        );

        // Update Membership

        await connection.execute(

            `
            UPDATE Membership

            SET

                PlansName = ?,
                Duration = ?,
                Price = ?,
                Status = ?

            WHERE Membership_ID = ?
            `,

            [

                plansName,
                duration,
                price,
                status,
                membershipID

            ]

        );

        await connection.commit();

        res.json({

            success: true,
            message: "Member updated successfully."

        });

    }
    catch (err) {

        await connection.rollback();

        console.error(err);

        res.json({

            success: false,
            error: err.message

        });

    }
    finally {

        connection.release();

    }

};