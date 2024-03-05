const express = require("express");
const router = express.Router();
const listModels = require("../models/listModels");

router.get("/", (req, res) => {
  listModels.getAllLists((error, lists) => {
    if (error) {
      console.error("Erreur lors de la récupération des listes :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des listes" });
      return;
    }
    res.json(lists);
  });
});

module.exports = router;
