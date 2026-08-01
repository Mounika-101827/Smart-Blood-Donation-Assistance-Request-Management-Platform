const mongoose = require("mongoose");

const receiverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    bloodGroup: {
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

    phone: {
      type: String,
      required: true,
    },

    unitsRequired: {
      type: Number,
      required: true,
    },

    hospitalName: {
      type: String,
      default: "",
    },

    urgency: {
      type: String,
      enum: ["Normal", "Within 24 Hours", "Emergency"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receiver", receiverSchema);