require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const bodyParser = require("body-parser");
const listRoutes = require("./routers/listRoutes");
const giftRoutes = require("./routers/giftRoutes");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());

app.use("/lists", listRoutes);
app.use("/gifts", giftRoutes);

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
  });

  module.exports = server;
} else {
  module.exports = app;
}
