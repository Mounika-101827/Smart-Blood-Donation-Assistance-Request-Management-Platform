console.log("Donor routes loaded");
const express = require("express");
const router = express.Router();
const {
  registerDonor,
  getDonorByUserId
} = require("../controllers/donorController");
router.get("/test", (req, res) => {
  res.send("Donor route working");
});


router.post("/register", registerDonor);
router.get("/test", (req, res) => {
  res.send("Donor route is working!");
});
router.get("/user/:userId", getDonorByUserId);
module.exports = router;