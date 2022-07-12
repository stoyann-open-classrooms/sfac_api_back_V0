const db = require("../models");

// Imports des models
const Demande = db.demandes;
const Kanban = db.kanbans;
const Produit = db.produits;

// =========================== Ajouter une demande ========================================
const addDemande = async (req, res) => {
  const id = req.params.id;

  let data = {
    kanbanId: req.body.kanbanId,
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
  //Récuperation de l'uttilisateur
  Demande.findOne({
    where: { id: demandeId },
    include: [{ model: Kanban, include: [Produit] }],
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

const getDemandeAtraiter = async (req, res) => {
  let aTraiter = await Demande.findAll({
    where: { status: "A traiter" },

    include: [{ model: Kanban, include: [Produit] }],
  })
    .then((aTraiter) =>
      res.json({
        message: `✅ ${aTraiter.length}  demande(s) à traiter`,
        data: aTraiter,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =================== Recupere la liste des commandes recue (archivé) ========================================

const getDemandeRecue = async (req, res) => {
  let recue = await Demande.findAll({
    where: { status: "Reçue" },
    include: [{ model: Kanban, include: [Produit] }],
  })
    .then((recue) =>
      res.json({
        message: `✅ ${recue.length}  commandes archiver`,
        data: recue,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Recupere la liste des demandes en cour de livraison ========================================
const getDemandesEnCours = async (req, res) => {
  let enCours = await Demande.findAll({
    where: { status: "En cours" },
    include: [{ model: Kanban, include: [Produit] }],
  })
    .then((enCours) =>
      res.json({
        message: `✅ ${enCours.length} demandes en cours de livraison`,
        data: enCours,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== EXPORTS========================================

module.exports = {
  addDemande,

  getDemandeAtraiter,
  getDemandeRecue,
  getDemandesEnCours,
  updateDemande,
  getOneDemande,
  deleteDemande,
};
