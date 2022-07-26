const db = require("../models");

// Imports des models
const Commande = db.commandes;
const Kanban = db.kanbans;
const Produit = db.produits;

// =========================== Ajouter une demande ========================================
const addCommande = async (req, res) => {
  const id = req.params.id;

  let data = {
    produitId: req.body.produitId,
    num_commande: req.body.num_commande,
    quantite_commande: req.body.quantite_commande,
    date_commande: req.body.date_commande,
    depart_fournisseur: req.body.depart_fournisseur,
    date_livraison: req.body.date_livraison,
    archive: req.body.archive,
    status: req.body.status,
  };

  const commande = await Commande.create(data);
  res.status(200).send(commande);
};

const getAllCommandes = async (req, res) => {
  let commande = await Commande.findAll({
    include: { all: true, nested: true },
  })
    .then((commandes) =>
      res.json({
        message: `✅ ${commandes.length} Commande(s) trouvé`,
        data: commandes,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Recuperer une demande via son ID========================================

const getOneCommande = async (req, res) => {
  let commandeId = parseInt(req.params.id);

  if (!commandeId) {
    return res.json(400).json({ message: " ⛔️ Missing parameter" });
  }

  Commande.findOne({
    where: { id: commandeId },
    include: { all: true, nested: true },
  })
    .then((commande) => {
      if (commande === null) {
        return res
          .status(404)
          .json({ message: " ⛔️ Cette commande n'existe pas !" });
      }
      // Uttilisateur trouvée
      return res.json({ data: commande });
    })
    .catch((err) =>
      res.status(500).json({
        message: `⛔️ Une erreur est survenue, veuillez réessayer ⛔️`,
      })
    );
};



// =========================== Modifier une demande ========================================

const updateCommande = async (req, res) => {
  let id = req.params.id;

  const commande = await Commande.update(req.body, { where: { id: id } });

  res.status(200).send(commande.body);
};

// =========================== Supprimer une demande ========================================

const deleteCommande = async (req, res) => {
  let id = req.params.id;

  await Commande.destroy({ where: { id: id } });

  res.status(200).send(" ✅✅ La commande est suprimée ! ✅✅");
};

// =================== Recupere la liste des demandes a traiter ========================================

const getCommandesFournisseur = async (req, res) => {
  let fournisseur = await Commande.findAll({
    where: { status: "Fournisseur" },

    include: { all: true, nested: true },
  })
    .then((fournisseur) =>
      res.json({
        message: `✅ ${fournisseur.length}  commande(s) en cours de traitement chez le fournisseur trouvé`,
        data: fournisseur,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =================== Recupere la liste des commandes recue (archivé) ========================================

const getCommandesRecue = async (req, res) => {
  let recue = await Commande.findAll({
    where: { status: "Reçue" },
    include: { all: true, nested: true },
    
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
const getCommandesEnCours = async (req, res) => {
  let enCours = await Commande.findAll({
    where: { status: "En cours" },
    include: { all: true, nested: true },
  })
    .then((enCours) =>
      res.json({
        message: `✅ ${enCours.length} commande en cours de livraison`,
        data: enCours,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== EXPORTS========================================

module.exports = {
  addCommande,
  getCommandesFournisseur,
  getCommandesRecue,
  getCommandesEnCours,
  updateCommande,
  getOneCommande,
  deleteCommande,
  getAllCommandes,

};
