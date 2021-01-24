const express = require("express");
const router = express.Router();
const ctrl = require("./../controllers/typesCtrl");

// Route for getting all clauses categories
router.get("/types", ctrl.getAllTypes);

// Route for adding a certain category of clauses
router.post("/types", ctrl.addType);

router.delete("/types", ctrl.deleteType);

// Route for adding a clause to a certain category
router.post("/types/clause", ctrl.addClause);

// Route for deleting a certain clause from the category
router.delete("/types/clause", ctrl.deleteClause);

module.exports = router;
