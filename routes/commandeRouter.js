// import controllers
const commandeController = require("../controllers/commandeController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addCommande", commandeController.addCommande);

router.get("/allCommandes", commandeController.getAllCommandes);
router.get("/fournisseur", commandeController.getCommandesFournisseur);
router.get("/enCours", commandeController.getCommandesEnCours);
router.get("/recue", commandeController.getCommandesRecue);


router.get("/:id", commandeController.getOneCommande);
router.put("/:id", commandeController.updateCommande);

router.delete("/:id", commandeController.deleteCommande);

module.exports = router;
