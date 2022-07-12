const db = require("../models");

// models
const Produit = db.produits;
const Kanban = db.kanbans;

// image Upload dependence
const multer = require("multer");
const path = require("path");

// =========================== Ajouter un produit ========================================
const addProduit = async (req, res) => {
  const id = req.params.id;

  let data = {
    image: req.file.path,
    refference: req.body.refference,
    designation: req.body.designation,
  };

  const produit = await Produit.create(data);
  res.status(200).send(produit);
};

// =========================== Recuperer La liste de tous les produits ========================================

const getAllProduits = async (req, res) => {
  let produits = await Produit.findAll({
    order: ['designation']
  })
    .then((produits) =>
      res.json({
        message: `✅ ${produits.length} Produit(s) trouvé`,
        data: produits,
      })
    )
    .catch((err) =>
      res.status(500).json({ message: `⛔️ Database Error`, error: err })
    );
};

// =========================== Recuperer un produit via son ID ========================================

const getOneProduit = async (req, res) => {
  let id = req.params.id;
  let produit = await Produit.findOne({
    where: { id: id },
  });
  res.status(200).send(produit);
};

// =========================== Modifier un produit via son ID ========================================

const updateProduit = async (req, res) => {
  let id = req.params.id;

  const produit = await Produit.update(req.body, { where: { id: id } });

  res.status(200).send(produit);
};

// =========================== Supprimer un produit via son ID ========================================

const deleteProduit = async (req, res) => {
  let id = req.params.id;

  await Produit.destroy({ where: { id: id } });

  res.status(200).send("Le produit est suprimée !");
};

// =========================== UPLOAD IMAGE CONTROLLER ========================================

const im = "photo_produit_";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, im + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: "1000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("image");

// =========================== EXPORTS ========================================

module.exports = {
  addProduit,
  getAllProduits,
  getOneProduit,
  updateProduit,
  deleteProduit,
  upload,
};
