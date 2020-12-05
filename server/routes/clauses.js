const express = require("express");
const router = express.Router();
const ctrl = require("./../controllers/clausesCtrl");

// Route for getting the content of one clause
router.get("/clauses/:label", ctrl.getClause);
// Route for getting all clauses
router.get("/clauses", ctrl.getAllClauses);

// Route to add or modify the content of a specific clause
router.post("/clauses", ctrl.postClause);

// Route to delete the content of a certain clause
router.delete("/clauses/:label", ctrl.deleteCluase);

module.exports = router;
