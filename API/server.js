require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const listRoutes = require("./routers/listRoutes");

app.use("/lists", listRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});
