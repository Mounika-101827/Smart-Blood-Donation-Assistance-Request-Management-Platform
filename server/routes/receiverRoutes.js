const express = require("express");
const router = express.Router();

const {
  createReceiverRequest,
} = require("../controllers/receiverController");
const {
  registerReceiver,
  getReceiverByUserId,
} = require("../controllers/receiverController");

router.post("/register", createReceiverRequest);

module.exports = router;