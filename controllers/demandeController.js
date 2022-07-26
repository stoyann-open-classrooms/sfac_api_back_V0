const db = require("../models");
const demande = require("../models/demande");

// Imports des models
const Demande = db.demandes;


// =========================== Ajouter une demande ========================================
const addDemande = async (req, res) => {
  const id = req.params.id;

  let data = {
    kanbanId: req.body.kanbanId,
    createdAt: req.body.createdAt
  };

  const demande = await Demande.create(data);
  res.status(200).send(demande);
};

// =========================== Recuperer une demande via son ID========================================

const getOneDemande = async (req, res) => {
  let demandeId = parseInt(req.params.id);

  if (!demandeId) {
    return res.json(400).json({ message: " ⛔️ Missing parameter" });
  }

  Demande.findOne({
    where: { id: demandeId },
    include: { all: true, nested: true },
  })
    .then((demande) => {
      if (demande === null) {
        return res
          .status(404)
          .json({ message: " ⛔️ Cette demande n'existe pas !" });
      }
      // Uttilisateur trouvée
      return res.json({ data: demande });
    })
    .catch((err) =>
      res.status(500).json({
        message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
      })
    );
};

// =========================== Modifier une demande ========================================

const updateDemande = async (req, res) => {
  let id = req.params.id;

  const demande = await Demande.update(req.body, { where: { id: id } });

  res.status(200).send(demande.body);
};

// =========================== Supprimer une demande ========================================

const deleteDemande = async (req, res) => {
  let id = req.params.id;

  await Demande.destroy({ where: { id: id } });

  res.status(200).send(" ✅✅ La demande est suprimée ! ✅✅");
};

// =================== Recupere la liste des demandes a traiter ========================================

const getDemandesAtraiter = async (req, res) => {
  let aTraiter = await Demande.findAll({
    where: { status: "A traiter" },

    include: { all: true, nested: true },
  })
    .then((aTraiter) =>
      res.json({
        message: `✅ ${aTraiter.length}  demande(s) à traiter trouvé`,
        data: aTraiter,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =================== Recupere la liste des commandes recue (archivé) ========================================

const getDemandesArchive = async (req, res) => {
  let archive = await Demande.findAll({
    where: { status: "Archivé" },
    include: { all: true, nested: true },
    
  })
    .then((archive) =>
      res.json({
        message: `✅ ${archive.length}  demande(s) archivée`,
        data: archive,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};



// =========================== EXPORTS========================================

module.exports = {
  addDemande,
  getDemandesAtraiter,
  getDemandesArchive,
  getOneDemande,
  updateDemande,
  deleteDemande,
};
