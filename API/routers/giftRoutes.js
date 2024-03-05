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
    res.status(200).send("Suppression réussis");
  });
});

router.post("/create", (req, res) => {
  const { name, description, price, previous_price, list_id } = req.body;
  giftModels.createGift(
    name,
    description,
    price,
    previous_price,
    list_id,
    (error, giftId) => {
      if (error) {
        console.error("Erreur lors de la création du cadeau :", error);
        res.status(500).json({ error: "Erreur lors de la création du cadeau" });
        return;
      }
      giftModels.getGiftById(giftId, (error, gift) => {
        if (error) {
          console.error("Erreur lors de la récupération du cadeau :", error);
          res
            .status(500)
            .json({ error: "Erreur lors de la récupération du cadeau" });
          return;
        }
        res.status(201).json(gift);
      });
    }
  );
});

router.patch("/modify/:id", (req, res) => {
  const giftId = req.params.id;
  const updateData = req.body;

  giftModels.getGiftById(giftId, (error, currentGift) => {
    if (error) {
      console.error("Erreur lors de la récupération du cadeau :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération du cadeau" });
      return;
    }
    const previousPrice = currentGift.price;

    giftModels.updateGift(giftId, updateData, (error, updatedGift) => {
      if (error) {
        console.error("Erreur lors de la mise à jour du cadeau :", error);
        res
          .status(500)
          .json({ error: "Erreur lors de la mise à jour du cadeau" });
        return;
      }
      giftModels.updatePreviousPrice(giftId, previousPrice, (error) => {
        if (error) {
          console.error(
            "Erreur lors de la mise à jour du prix précédent :",
            error
          );
          res
            .status(500)
            .json({ error: "Erreur lors de la mise à jour du prix précédent" });
          return;
        }
        giftModels.getGiftById(giftId, (error, gift) => {
          if (error) {
            console.error(
              "Erreur lors de la récupération du cadeau mis à jour :",
              error
            );
            res
              .status(500)
              .json({
                error: "Erreur lors de la récupération du cadeau mis à jour",
              });
            return;
          }
          res.json(gift);
        });
      });
    });
  });
});

module.exports = router;
