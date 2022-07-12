const { demandes } = require("../models");
const db = require("../models");
const kanban = require("../models/kanban");

// models
const Kanban = db.kanbans;
const Demande = db.demandes;
const Produit = db.produits;

// =========================== Ajouter un kanban ========================================

const addKanban = async (req, res) => {
  const id = req.params.id;

  let data = {
    uid_nfc: req.body.uid_nfc,
    produitId: req.body.produitId,
    quantite: req.body.quantite,
  };

  const kanban = await Kanban.create(data);
  res.status(200).send(kanban);
};
// =========================== Recuperer la  liste de tous les kanbans via son ID ========================================

const getAllKanbans = async (req, res) => {
  let kanbans = await Kanban.findAll({
    include: [{ model: Demande, as: "demandes" }, { model: Produit }],
   order: ['uid_nfc']
  
  })
    .then((kanbans) =>
      res.json({
        message: `✅ ${kanbans.length} Kanban(s) trouvé`,
        data: kanbans,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Recuperer un kanban via son ID ========================================


// =========================== Recuperer une demande via son ID========================================

const getOneKanban = async (req, res) => {
  let kanbanId = parseInt(req.params.id);

  if (!kanbanId) {
    return res.json(400).json({ message: " ⛔️ Missing parameter" });
  }
  //Récuperation de l'uttilisateur
  Kanban.findOne({
    where: { id: kanbanId },
    include: [{ model: Demande, as: "demandes" }, { model: Produit }],
  })
    .then((kanban) => {
      if (kanban === null) {
        return res
          .status(404)
          .json({ message: " ⛔️ Cette demande n'existe pas !" });
      }
      // Uttilisateur trouvée
      return res.json({ data: kanban });
    })
    .catch((err) =>
      res.status(500).json({
        message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
      })
    );
};












// =========================== Supprimer un kanban via son ID ========================================

const deleteKanban = async (req, res) => {
  let id = req.params.id;

  await Kanban.destroy({ where: { id: id } });

  res.status(200).send("La kanban est suprimée !");
};

const updateKanban = async (req, res) => {
  let id = req.params.id;

  const kanban = await Kanban.update(req.body, { where: { id: id } });

  res.status(200).send(kanban);
};

// =========================== EXPORTS ========================================

module.exports = {
  addKanban,
  getOneKanban,
  getAllKanbans,
  deleteKanban,

  updateKanban,
};
