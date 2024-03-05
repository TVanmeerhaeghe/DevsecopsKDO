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

function getListById(id, callback) {
  connection.query(
    "SELECT * FROM list WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Erreur lors de la récupération de la liste par ID :",
          error
        );
        callback(error, null);
        return;
      }
      if (results.length === 0) {
        callback(null, null);
        return;
      }
      callback(null, results[0]);
    }
  );
}

module.exports = {
  connection: connection,
  getAllLists: getAllLists,
  getListById: getListById,
};
