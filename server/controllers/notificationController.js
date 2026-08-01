const Notification = require("../models/Notification");

const createNotification = async (userId, message, type) => {
  try {
    await Notification.create({
      userId,
      message,
      type,
    });

    console.log("Notification Created Successfully");
  } catch (error) {
    console.log(error);
  }
};

const getNotifications = async (req, res) => {
  try {

    const { userId } = req.params;

    const notifications = await Notification.find({
      userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createNotification,
  getNotifications
};