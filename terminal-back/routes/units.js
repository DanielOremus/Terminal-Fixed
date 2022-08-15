var express = require("express");

const unitControllers = require("../controllers/unit");

var router = express.Router();

/* GET home page. */
router.get("/", unitControllers.showUnits);

router.get("/:id", unitControllers.showUnitById);

router.post("/", unitControllers.createUnit);

router.put("/:id", unitControllers.setUnit); //Update unit

router.delete("/:id", unitControllers.removeUnit);

module.exports = router;
