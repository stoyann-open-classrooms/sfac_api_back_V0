// import controllers
const produitController = require("../controllers/produitController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post(
  "/addProduit",
  produitController.upload,
  produitController.addProduit
);

router.get("/allProduits", produitController.getAllProduits);

router.get("/:id", produitController.getOneProduit);
router.put("/:id", produitController.updateProduit);

router.delete("/:id", produitController.deleteProduit);

module.exports = router;
