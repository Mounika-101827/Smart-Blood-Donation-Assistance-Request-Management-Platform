import { useLocation } from "react-router-dom";
import { sendRequest } from "../services/requestService";
import "./AvailableDonors.css";

function AvailableDonors() {

  const location = useLocation();

  const {
    cityDonors = [],
    stateDonors = [],
    compatibleGroups = [],
    receiver
  } = location.state || {};

  const handleSendRequest = async (donor) => {

    try {

      const requestData = {
        donorId: donor._id,
        donorUserId: donor.userId,
        donorName: donor.fullName,

        receiverId: receiver._id,
        receiverName: receiver.fullName,

        city: receiver.city,
        state: receiver.state,
        bloodGroup: receiver.bloodGroup,
        unitsRequired: receiver.unitsRequired,
        hospitalName: receiver.hospitalName,
        urgency: receiver.urgency,
        phone: receiver.phone,
      };

      const response = await sendRequest(requestData);

      alert(response.data.message);

    } catch (error) {

      alert(error.response?.data?.message || "Failed to send request");

    }

  };

  return (

    <div className="available-container">

      <div className="hero-section">

        <div className="hero-badge">
          Compatible Blood Donors
        </div>

        <h1>
          🩸 Find Your Blood Donor
        </h1>

        <p>
          Below are the compatible blood donors available based on your blood group and location.
        </p>

      </div>

      {/* CITY DONORS */}

      <h2 className="section-title">
        📍 Donors Available In Your City
      </h2>

      {cityDonors.length === 0 ? (

        <div className="no-donors">

          <h3>No Donors Found</h3>

          <p>
            Unfortunately, no compatible donors are currently available in your city.
          </p>

        </div>

      ) : (

        <div className="donor-grid">

          {cityDonors.map((donor) => (

            <div className="donor-card" key={donor._id}>

              <div className="avatar">
                👤
              </div>

              <h3>{donor.fullName}</h3>

              <span className="blood-badge">
                {donor.bloodGroup}
              </span>

              <p>
                📍 {donor.city}, {donor.state}
              </p>

              <div className="status">
                🟢 Available
              </div>

              <button
                className="contact-btn"
                onClick={() => handleSendRequest(donor)}
              >
                ❤️ Send Blood Request
              </button>

            </div>

          ))}

        </div>

      )}

      {/* STATE DONORS */}

      <h2 className="section-title">
        🌍 More Compatible Donors In Your State
      </h2>

      {stateDonors.length === 0 ? (

        <div className="no-donors">

          <h3>No Additional Donors</h3>

          <p>
            No other compatible donors were found in your state.
          </p>

        </div>

      ) : (

        <div className="donor-grid">

          {stateDonors.map((donor) => (

            <div className="donor-card" key={donor._id}>

              <div className="avatar">
                👤
              </div>

              <h3>{donor.fullName}</h3>

              <span className="blood-badge">
                {donor.bloodGroup}
              </span>

              <p>
                📍 {donor.city}, {donor.state}
              </p>

              <div className="status">
                🟢 Available
              </div>

              <button
                className="contact-btn"
                onClick={() => handleSendRequest(donor)}
              >
                ❤️ Send Blood Request
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default AvailableDonors;