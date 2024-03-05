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

function deleteGiftById(id, callback) {
  connection.query(
    "DELETE FROM gift WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Erreur lors de la suppression du cadeau par ID :",
          error
        );
        callback(error);
        return;
      }
      callback(null);
    }
  );
}

function createGift(
  name,
  description,
  price,
  previous_price,
  list_id,
  callback
) {
  connection.query(
    "INSERT INTO gift (name, description, price, previous_price, list_id) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, previous_price, list_id],
    (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la création du cadeau :", error);
        callback(error, null);
        return;
      }
      callback(null, results.insertId);
    }
  );
}

function updateGift(giftId, updateData, callback) {
  connection.query(
    "UPDATE gift SET ? WHERE id = ?",
    [updateData, giftId],
    (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la mise à jour du cadeau :", error);
        callback(error, null);
        return;
      }
      callback(null, results.affectedRows > 0 ? updateData : null);
    }
  );
}

function updatePreviousPrice(giftId, previousPrice, callback) {
  connection.query(
    "UPDATE gift SET previous_price = ? WHERE id = ?",
    [previousPrice, giftId],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Erreur lors de la mise à jour du prix précédent du cadeau :",
          error
        );
        callback(error);
        return;
      }
      callback(null);
    }
  );
}

module.exports = {
  getAllGifts: getAllGifts,
  getGiftById: getGiftById,
  deleteGiftById: deleteGiftById,
  createGift: createGift,
  updateGift: updateGift,
  updatePreviousPrice: updatePreviousPrice,
};
