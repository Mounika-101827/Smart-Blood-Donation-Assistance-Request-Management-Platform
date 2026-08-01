import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donor.css";

function Donor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    bloodGroup: "",
    city: "",
    state: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    const { fullName, age, bloodGroup, city, state, phone } = formData;

    if (!fullName || !age || !bloodGroup || !city || !state || !phone) {
      alert("Please fill all the fields.");
      return;
    }

    navigate("/health-screening", {
      state: formData,
    });
  };

  return (
    <div className="donor-container">

      <div className="donor-card">

        <div className="form-icon">🩸</div>

        <h1>Become a Blood Donor</h1>

        <p>
          Your donation can save up to three lives.
          <br />
          Complete your basic details to continue.
        </p>

        <input
          type="text"
          name="fullName"
          placeholder="👤 Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="age"
          placeholder="🎂 Age"
          value={formData.age}
          onChange={handleChange}
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="">🩸 Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="📍 City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="🌎 State"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="📞 Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <button onClick={handleNext}>
          Continue →
        </button>

      </div>

    </div>
  );
}

export default Donor;