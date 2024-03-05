const express = require("express");
const router = express.Router();
const giftModels = require("../models/giftModels");

router.get("/", (req, res) => {
  giftModels.getAllGifts((error, gifts) => {
    if (error) {
      console.error("Erreur lors de la récupération des cadeaux :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des cadeaux" });
      return;
    }
    res.json(gifts);
  });
});

module.exports = router;
