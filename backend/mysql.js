const mysql = require("mysql");
const dbConfig = {
    HOST: "remotemysql.com",
    USER: "DhHro7RbK3",
    PASSWORD: "SwsRE51cdW",
    DB: "DhHro7RbK3"
  };

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
