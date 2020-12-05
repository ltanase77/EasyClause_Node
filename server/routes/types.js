const express = require("express");
const router = express.Router();
const ctrl = require("./../controllers/typesCtrl");

// Route for getting all clauses categories
router.get("/types", ctrl.getAllTypes);

// Route for adding a certain category of clauses
router.post("/types/:category", ctrl.addType);

// Route for adding a clause to a certain category
router.post("/types/:label", ctrl.addClause);

// Route for deleting a certain clause from the category
router.delete("/types/:label", ctrl.deleteClause);

module.exports = router;
