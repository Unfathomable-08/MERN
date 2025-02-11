const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "124711131720",
  database: "lmsdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = db;