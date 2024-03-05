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

function getGiftById(id, callback) {
  connection.query(
    "SELECT * FROM gift WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Erreur lors de la récupération du cadeau par ID :",
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
  getAllGifts: getAllGifts,
  getGiftById: getGiftById,
};
