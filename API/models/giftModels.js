const connection = require("../db");

function getAllGifts(callback) {
  connection.query("SELECT * FROM gift", (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de la récupération des cadeaux :", error);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  getAllGifts: getAllGifts,
};
