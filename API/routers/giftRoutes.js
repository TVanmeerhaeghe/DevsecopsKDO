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

router.get("/:id", (req, res) => {
  const giftId = req.params.id;
  giftModels.getGiftById(giftId, (error, gift) => {
    if (error) {
      console.error("Erreur lors de la récupération du cadeau par ID :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du cadeau par ID" });
      return;
    }
    if (!gift) {
      res.status(404).json({ error: "Aucun cadeau trouvé avec cet ID" });
      return;
    }
    res.json(gift);
  });
});

router.delete("/delete/:id", (req, res) => {
  const giftId = req.params.id;
  giftModels.deleteGiftById(giftId, (error) => {
    if (error) {
      console.error("Erreur lors de la suppression du cadeau par ID :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la suppression du cadeau par ID" });
      return;
    }
    res.status(204).send("Suppression réussis");
  });
});

module.exports = router;
