import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerReceiver } from "../services/receiverService";
import "./ReceiverRegistration.css";

function ReceiverRegistration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    bloodGroup: "",
    city: "",
    state: "",
    phone: "",
    unitsRequired: "",
    hospitalName: "",
    urgency: "Normal",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const receiverData = {
        ...formData,
        userId: user.id,
      };

      const response = await registerReceiver(receiverData);

      navigate("/available-donors", {
        state: {
          cityDonors: response.data.cityDonors,
          stateDonors: response.data.stateDonors,
          compatibleGroups: response.data.compatibleGroups,
          receiver: response.data.receiver,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="receiver-container">
      <div className="receiver-card">

        <div className="form-badge">
          Blood Recipient Registration
        </div>

        <h1>🩸 Request Blood</h1>

        <p>
          Complete the form below to search for compatible blood donors near your location.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div className="input-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Units Required</label>
            <input
              type="number"
              name="unitsRequired"
              placeholder="Example : 2"
              min="1"
              value={formData.unitsRequired}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Hospital Name (Optional)</label>
            <input
              type="text"
              name="hospitalName"
              placeholder="Hospital Name"
              value={formData.hospitalName}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Urgency</label>
            <select
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option>Normal</option>
              <option>Within 24 Hours</option>
              <option>Emergency</option>
            </select>
          </div>

          <button type="submit">
            🔍 Find Compatible Donors
          </button>

        </form>

      </div>
    </div>
  );
}

export default ReceiverRegistration;