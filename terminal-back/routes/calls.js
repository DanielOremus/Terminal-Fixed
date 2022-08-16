var express = require("express");

const callControllers = require("../controllers/call");

var router = express.Router();

/* GET home page. */
router.get("/", callControllers.showCalls);

router.get("/:id", callControllers.showCallById);

router.post("/", callControllers.createCall);

router.put("/:id", callControllers.setCall); //Update unit

router.delete("/:id", callControllers.removeCall);

module.exports = router;
