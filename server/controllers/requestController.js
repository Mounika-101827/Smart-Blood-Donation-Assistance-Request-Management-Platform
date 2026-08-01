const Request = require("../models/Request");
const Receiver = require("../models/Receiver");

const { createNotification } = require("./notificationController");
const { createChat } = require("./chatController");

// ================= SEND REQUEST =================

const sendRequest = async (req, res) => {
  try {

    const {
      donorId,
      donorUserId,
      donorName,
      receiverId,
      receiverName,
      city,
      state,
      bloodGroup,
      unitsRequired,
      hospitalName,
      urgency,
      phone,
    } = req.body;

    const request = new Request({
      donorId,
      donorUserId,
      donorName,
      receiverId,
      receiverName,
      city,
      state,
      bloodGroup,
      unitsRequired,
      hospitalName,
      urgency,
      phone,
    });

    await request.save();

    res.status(201).json({
      message: "Blood request sent successfully.",
      request,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= GET DONOR REQUESTS =================

const getDonorRequests = async (req, res) => {
  try {

    const { donorId } = req.params;

    console.log("Searching requests for donorId:", donorId);

    const requests = await Request.find({
      donorId,
      status: "Pending",
    });

    console.log("Requests found:", requests);

    res.status(200).json(requests);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ================= UPDATE REQUEST STATUS =================

const updateRequestStatus = async (req, res) => {
  try {

    const { requestId } = req.params;
    const { status } = req.body;

    console.log("Updating Request:", requestId);
    console.log("New Status:", status);

    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    // Find receiver
    const receiver = await Receiver.findById(request.receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    // Accepted
    if (status === "Accepted") {

      await createNotification(
        receiver.userId,
        `✅ ${request.donorName} has accepted your blood request.`,
        "Accepted"
      );

      await createChat(
        request._id,
        request.donorUserId,
        request.donorName,
        receiver.userId,
        receiver.fullName
      );
    }

    // Rejected
    if (status === "Rejected") {

      await createNotification(
        receiver.userId,
        `❌ ${request.donorName} has rejected your blood request.`,
        "Rejected"
      );

    }

    res.status(200).json(request);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  sendRequest,
  getDonorRequests,
  updateRequestStatus,
};