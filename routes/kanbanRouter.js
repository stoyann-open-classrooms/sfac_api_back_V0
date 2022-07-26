// import controllers
const kanbanController = require("../controllers/kanbanController");

// router
const router = require("express").Router();

// fournisseurs routers
router.post("/addKanban", kanbanController.addKanban);
router.put("/:id", kanbanController.updateKanban);

router.get("/allKanbans", kanbanController.getAllKanbans);

router.get("/:id", kanbanController.getOneKanban);



router.delete("/:id", kanbanController.deleteKanban);

module.exports = router;
