const Receiver = require("../models/Receiver");
const Donor=require("../models/Donor")

const createReceiverRequest = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      age,
      bloodGroup,
      city,
      state,
      phone,
      unitsRequired,
      hospitalName,
      urgency,
    } = req.body;

    const receiver = new Receiver({
      userId,
      fullName,
      age,
      bloodGroup,
      city,
      state,
      phone,
      unitsRequired,
      hospitalName,
      urgency,
    });

    await receiver.save();
    const bloodCompatibility = {
  "O-": ["O-"],
  "O+": ["O+", "O-"],
  "A-": ["A-", "O-"],
  "A+": ["A+", "A-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],


  "AB-": ["AB-", "A-", "B-", "O-"],
  "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]
};

const compatibleGroups=bloodCompatibility[bloodGroup];
console.log(compatibleGroups)

const cityDonors = await Donor.find({
  bloodGroup: { $in: compatibleGroups },
  city: new RegExp(`^${city}$`, "i"),
  userId: { $ne: userId }   // Exclude the logged-in receiver
});

const stateDonors = await Donor.find({
  bloodGroup: { $in: compatibleGroups },
  state: new RegExp(`^${state}$`, "i"),
  city: { $ne: city },
  userId: { $ne: userId }   // Exclude the logged-in receiver
});

console.log(cityDonors);
console.log(stateDonors);


    res.status(201).json({
  message: "Receiver request submitted successfully.",
  receiver,
  compatibleGroups,
  cityDonors,
  stateDonors
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReceiverRequest,
};