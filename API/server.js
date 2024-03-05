require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const listRoutes = require("./routers/listRoutes");
const giftRoutes = require("./routers/giftRoutes");

app.use(bodyParser.json());

app.use("/lists", listRoutes);
app.use("/gifts", giftRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
