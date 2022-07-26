const express = require("express");
const cors = require("cors");
const app = express();

// ==========================   middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================================static Images Folder
app.use("/Images", express.static("./Images"));

//  ======================npm sr=====================================   routers

// demande
const demandeRouter = require("./routes/demandeRouter");
app.use(`${process.env.BASE_URL}/demande`, demandeRouter);
// commande
const commandeRouter = require("./routes/commandeRouter");
app.use(`${process.env.BASE_URL}/commande`, commandeRouter);
// kanban
const kanbanRouter = require("./routes/kanbanRouter");
app.use(`${process.env.BASE_URL}/kanban`, kanbanRouter);

const produitRouter = require("./routes/produitRouter");
app.use(`${process.env.BASE_URL}/produit`, produitRouter);

// ++++++++++++++++++++++++++++ demmarage du serveur  ++++++++++++++++++++++++++++
app.listen(process.env.SERVER_PORT, () => {
  console.log(
    ` ✅✅✅✅✅✅✅✅  Le serveur est demmarée sur le port : ${process.env.SERVER_PORT} ✅✅✅✅✅✅✅✅ `
  );
});
