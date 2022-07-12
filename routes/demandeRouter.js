// import controllers
const demandeController = require("../controllers/demandeController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addDemande", demandeController.addDemande);

router.get("/aTraiter", demandeController.getDemandeAtraiter);
router.get("/enCours", demandeController.getDemandesEnCours);
router.get("/recue", demandeController.getDemandeRecue);

router.get("/:id", demandeController.getOneDemande);
router.put("/:id", demandeController.updateDemande);

router.delete("/:id", demandeController.deleteDemande);

module.exports = router;
