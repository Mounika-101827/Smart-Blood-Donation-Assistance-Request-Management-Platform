import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./HealthScreening.css";

function HealthScreening() {
  const location = useLocation();
  const navigate = useNavigate();

  // Data received from Donor page
  const donorData = location.state;

  // Diseases array
  const diseases = [
    "Leprosy",
    "Hepatitis B",
    "Hepatitis C",
    "Blood Cancer",
    "Tuberculosis (TB)",
    "HIV/AIDS",
    "Other Blood-borne Diseases"
  ];

  // Store selected diseases
  const [selectedDiseases, setSelectedDiseases] = useState([]);

  // Confirmation checkbox
  const [confirm, setConfirm] = useState(false);

  // Handle checkbox selection
  const handleCheckboxChange = (disease) => {
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(
        selectedDiseases.filter((item) => item !== disease)
      );
    } else {
      setSelectedDiseases([...selectedDiseases, disease]);
    }
  };

  // Submit
  const handleSubmit = async () => {

  if (!confirm) {
    alert("Please confirm that the information provided is true.");
    return;
  }

  // User is not eligible
  if (selectedDiseases.length > 0) {

    alert(
`Health Screening Result

Thank you for your willingness to donate blood.

Based on the health information you provided, you are currently NOT eligible to donate blood.

This decision is made to ensure the safety of both donors and recipients.

You will now be redirected to the Dashboard.`
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return;
  }

  // User is eligible
  try {
    const user=JSON.parse(localStorage.getItem("user"));

    await axios.post("http://localhost:5000/api/donor/register", {
      userId: user.id,
      fullName: donorData.fullName,
      age: donorData.age,
      bloodGroup: donorData.bloodGroup,
      city: donorData.city,
      state: donorData.state,
      phone: donorData.phone,
      eligible: true
    });

    alert(
`🎉 Congratulations!

You are eligible to donate blood and have been successfully registered as a blood donor.

Thank you for your generosity. Your willingness to donate blood can help save lives.

You will now be redirected to the Dashboard.`
    );

    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

  } catch (error) {

    alert(error.response?.data?.message || "Something went wrong.");

  }

};

  return (
    <div className="health-container">
      <div className="health-card">

        <h1>🩺 Health Screening</h1>

        <p>
          Please answer honestly. This information is used only to determine your eligibility to donate blood safely.
        </p>

        {diseases.map((disease) => (
          <div className="question" key={disease}>
            <label>
              <input
                type="checkbox"
                checked={selectedDiseases.includes(disease)}
                onChange={() => handleCheckboxChange(disease)}
              />
              {disease}
            </label>
          </div>
        ))}

        <div className="question">
          <label>
            <input
              type="checkbox"
              checked={confirm}
              onChange={() => setConfirm(!confirm)}
            />
            I confirm that the above information is true.
          </label>
        </div>

        <button onClick={handleSubmit}>
          Submit
        </button>

      </div>
    </div>
  );
}

export default HealthScreening;