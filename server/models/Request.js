const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
      required: true,
    },

    donorUserId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

donorName: {
  type: String,
  required: true,
},

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Receiver",
      required: true,
    },

    receiverName: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      required: true,
    },

    unitsRequired: {
      type: Number,
      required: true,
    },

    hospitalName: {
      type: String,
    },

    urgency: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);