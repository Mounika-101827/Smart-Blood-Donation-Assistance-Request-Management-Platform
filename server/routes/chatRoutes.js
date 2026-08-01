const express = require("express");
const router = express.Router();

const { getUserChats } = require("../controllers/chatController");

// Get all chats of a user
router.get("/:userId", getUserChats);

module.exports = router;