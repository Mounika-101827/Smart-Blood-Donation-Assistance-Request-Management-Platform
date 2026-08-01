const Message = require("../models/Message");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const {
      chatId,
      senderId,
      senderName,
      text,
    } = req.body;

    const message = await Message.create({
      chatId,
      senderId,
      senderName,
      text,
    });

    res.status(201).json(message);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Messages of a Chat
const getMessages = async (req, res) => {
  try {

    const { chatId } = req.params;

    const messages = await Message.find({
      chatId,
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  sendMessage,
  getMessages,
};