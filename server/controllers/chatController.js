const Chat = require("../models/Chat");

// Create Chat
const createChat = async (
  requestId,
  donorUserId,
  donorName,
  receiverUserId,
  receiverName
) => {
  try {

    // Prevent duplicate chat creation
    const existingChat = await Chat.findOne({
      requestId,
    });

    if (existingChat) {
      console.log("Chat already exists.");
      return existingChat;
    }

    const chat = await Chat.create({
      requestId,
      donorUserId,
      donorName,
      receiverUserId,
      receiverName,
    });

    console.log("Chat Created Successfully");

    return chat;

  } catch (error) {

    console.log(error);

  }
};

// Get all chats of a user
const getUserChats = async (req, res) => {
  try {

    const { userId } = req.params;

    const chats = await Chat.find({
      $or: [
        { donorUserId: userId },
        { receiverUserId: userId },
      ],
    }).sort({ updatedAt: -1 });

    res.status(200).json(chats);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createChat,
  getUserChats,
};