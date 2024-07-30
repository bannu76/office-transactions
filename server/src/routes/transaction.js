const express = require("express");
const router = express.Router();

const getDataController = require("../controllers/getdata");

router.get("/", getDataController.getdata);
router.post("/add", getDataController.addtransaction);

module.exports = router;
