const mysql = require("mysql2/promise");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000
});

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("✅ Database connected successfully");
        conn.release();
    } catch (err) {
        console.error("❌ Database connection failed");
        console.error(err);
    }
})();

module.exports = pool;