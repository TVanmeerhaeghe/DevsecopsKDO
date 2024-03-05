require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");
});

function getAllLists(callback) {
  connection.query("SELECT * FROM list", (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de la récupération des listes :", error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  connection: connection,
  getAllLists: getAllLists,
};
