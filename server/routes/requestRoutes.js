const express = require("express");
const router = express.Router();
console.log("Request Routes Loaded");

const {
  sendRequest,
  getDonorRequests,
  updateRequestStatus
} = require("../controllers/requestController");

router.post("/send", sendRequest);

router.get("/:donorId", getDonorRequests);

router.put("/status/:requestId",updateRequestStatus);

module.exports = router;