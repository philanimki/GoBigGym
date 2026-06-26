const pool = require("../db");

exports.getDashboard = async (req, res) => {

    try {

        const [[members]] = await pool.execute(
            "SELECT COUNT(*) AS TotalMembers FROM member"
        );

        const [[trainers]] = await pool.execute(
            "SELECT COUNT(*) AS TotalTrainers FROM trainer"
        );

        const [[active]] = await pool.execute(`
            SELECT COUNT(*) AS ActiveMembers
            FROM member m
            INNER JOIN membership ms
                ON m.Membership_ID = ms.Membership_ID
            WHERE ms.Status = 'Active'
        `);

        res.json({
            totalMembers: members.TotalMembers,
            activeMembers: active.ActiveMembers,
            totalTrainers: trainers.TotalTrainers
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

};