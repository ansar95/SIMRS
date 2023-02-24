const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1995",
  database: "crud_db",
})

module.exports = db
