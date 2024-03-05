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

router.get("/:id", (req, res) => {
  const listId = req.params.id;
  listModels.getListById(listId, (error, list) => {
    if (error) {
      console.error(
        "Erreur lors de la récupération de la liste par ID :",
        error
      );
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de la liste par ID" });
      return;
    }
    if (!list) {
      res.status(404).json({ error: "Aucune liste trouvée avec cet ID" });
      return;
    }
    res.json(list);
  });
});

module.exports = router;
