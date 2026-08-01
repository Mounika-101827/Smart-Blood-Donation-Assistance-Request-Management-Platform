const Donor = require("../models/Donor");

// Register Donor
const registerDonor = async (req, res) => {
  try {
    const {
      userId,
      fullName,
      age,
      bloodGroup,
      city,
      state,
      phone,
      eligible,
    } = req.body;

    // Save only if eligible
    if (!eligible) {
      return res.status(400).json({
        message:
          "Sorry! Based on your health screening, you are currently not eligible to donate blood.",
      });
    }

    const donor = new Donor({
      userId,
      fullName,
      age,
      bloodGroup,
      city,
      state,
      phone,
      eligible,
    });

    await donor.save();

    res.status(201).json({
      message: "Congratulations! You have been registered as a blood donor.",
      donor,
    });

    
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get donor by userId
const getDonorByUserId = async (req, res) => {
  try {

    const { userId } = req.params;
    const donor = await Donor.findOne({ userId });


    if (!donor) {
      return res.status(404).json({
        message: "Donor not found"
      });
    }

    res.status(200).json(donor);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  registerDonor,
  getDonorByUserId
};