const connection = require("../db");

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
