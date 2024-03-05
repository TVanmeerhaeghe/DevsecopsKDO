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
    `SELECT l.id, l.name, l.for_who, g.id AS gift_id, g.name AS gift_name, g.description AS gift_description, g.price, g.previous_price
       FROM list AS l
       LEFT JOIN gift AS g ON l.id = g.list_id
       WHERE l.id = ?`,
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
      const listWithGifts = {
        id: results[0].id,
        name: results[0].name,
        for_who: results[0].for_who,
        gifts: results.map((gift) => ({
          id: gift.gift_id,
          name: gift.gift_name,
          description: gift.gift_description,
          price: gift.price,
          previous_price: gift.previous_price,
        })),
      };
      callback(null, listWithGifts);
    }
  );
}

function deleteListById(id, callback) {
  connection.query(
    "DELETE FROM list WHERE id = ?",
    [id],
    (error, results, fields) => {
      if (error) {
        console.error(
          "Erreur lors de la suppression de la liste par ID :",
          error
        );
        callback(error);
        return;
      }
      callback(null);
    }
  );
}

function createList(name, for_who, ended, callback) {
  connection.query(
    "INSERT INTO list (name, for_who, ended) VALUES (?, ?, ?)",
    [name, for_who, ended],
    (error, results, fields) => {
      if (error) {
        console.error("Erreur lors de la création de la liste :", error);
        callback(error, null);
        return;
      }
      callback(null, results.insertId);
    }
  );
}

module.exports = {
  getAllLists: getAllLists,
  getListById: getListById,
  deleteListById: deleteListById,
  createList: createList,
};
