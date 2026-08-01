import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNotifications } from "../services/notificationService";
import "./Dashboard.css";
import { FaBell } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

function Dashboard() {
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotificationCount();
  }, []);

  const fetchNotificationCount = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getNotifications(user.id);

      setNotificationCount(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <header className="navbar">

        <h2>🩸 Blood Donation Assistance System</h2>

        <div className="nav-buttons">

          <div
            className="bell-container"
            onClick={() => navigate("/notifications")}
          >
            <FaBell size={22} />

            {notificationCount > 0 && (
              <span className="badge">
                {notificationCount}
              </span>
            )}

          </div>

          <button className="profile-btn">
            👤 Profile
          </button>

          <button className="logout-btn">
            Logout
          </button>

        </div>

      </header>

      {/* HERO */}

      <section className="hero">

        <div className="hero-text">

          <span className="hero-badge">
            ❤️ Saving Lives Together
          </span>

          <h1>The Lifeline Bridge</h1>

          <h3>
            Connecting Blood Donors & Patients
            <br />
            Quickly, Safely and Securely
          </h3>

        </div>

        <div className="hero-image">
          <img src={logo} alt="Blood Donation" />
        </div>

      </section>

      {/* CARDS */}

      <div className="card-container">

        <div
          className="card donate-card"
          onClick={() => navigate("/donor")}
        >

          <div className="icon">🩸</div>

          <h2>Donate Blood</h2>

          <p>
            Become someone's hope today. Register as a donor and help save
            precious lives whenever a patient needs blood.
          </p>

          <button>Become a Donor</button>

        </div>

        <div
          className="card receive-card"
          onClick={() => navigate("/receiver")}
        >

          <div className="icon">❤️</div>

          <h2>Receive Blood</h2>

          <p>
            Search nearby verified donors and send blood requests instantly
            during emergencies with just a few clicks.
          </p>

          <button>Find Donors</button>

        </div>

        <div
          className="card chat-card"
          onClick={() => navigate("/mychats")}
        >

          <div className="icon">💬</div>

          <h2>My Chats</h2>

          <p>
            Stay connected with accepted donors and receivers through secure
            conversations and coordinate every donation smoothly.
          </p>

          <button>Open Chats</button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;