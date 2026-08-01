import { useEffect, useState } from "react";
import {
  getDonorRequests,
  updateRequestStatus,
} from "../services/requestService";
import { getDonorByUserId } from "../services/donorService";
import { getNotifications } from "../services/notificationService";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

function Notifications() {
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
    fetchNotifications();
  }, []);

  const fetchRequests = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const donorResponse = await getDonorByUserId(user.id);

      const donorId = donorResponse.data._id;

      const response = await getDonorRequests(donorId);

      setRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getNotifications(user.id);

      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (request) => {
    navigate(`/pre-donation-screening/${request._id}`);
  };

  const handleReject = async (request) => {
    try {
      await updateRequestStatus(request._id, "Rejected");

      alert("Request Rejected!");

      fetchRequests();
      fetchNotifications();
    } catch (error) {
      console.log(error);

      alert("Something went wrong!");
    }
  };

  return (
    <div className="notifications-container">

      <div className="hero-section">

        <div className="hero-badge">
          Blood Donation Requests
        </div>

        <h1>🔔 Notifications</h1>

        <p>
          Review blood requests from receivers and stay updated with the latest activities.
        </p>

      </div>

      {/* Pending Requests */}

      <h2 className="section-title">
        🩸 Pending Blood Requests
      </h2>

      {requests.length === 0 ? (
        <div className="empty-card">
          <h3>No Pending Requests</h3>
          <p>You're all caught up! No blood requests at the moment.</p>
        </div>
      ) : (
        <div className="request-grid">

          {requests.map((request) => (

            <div className="request-card" key={request._id}>

              <div className="top-row">

                <div className="avatar">
                  👤
                </div>

                <span className="urgency-badge">
                  {request.urgency}
                </span>

              </div>

              <h3>{request.receiverName}</h3>

              <p><strong>🩸 Blood Group:</strong> {request.bloodGroup}</p>

              <p><strong>📍 Location:</strong> {request.city}, {request.state}</p>

              <p><strong>🏥 Hospital:</strong> {request.hospitalName || "Not Provided"}</p>

              <p><strong>💉 Units:</strong> {request.unitsRequired}</p>

              <p><strong>📞 Phone:</strong> {request.phone}</p>

              <p>
                <strong>Status:</strong>

                <span className="status">
                  {request.status}
                </span>

              </p>

              <div className="button-group">

                <button
                  className="accept-btn"
                  onClick={() => handleAccept(request)}
                >
                  ✔ Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() => handleReject(request)}
                >
                  ✖ Reject
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* Recent Updates */}

      <h2 className="section-title">
        📢 Recent Updates
      </h2>

      {notifications.length === 0 ? (
        <div className="empty-card">
          <h3>No Notifications</h3>
          <p>No recent updates available.</p>
        </div>
      ) : (
        <div className="notification-list">

          {notifications.map((notification) => (

            <div className="notification-card" key={notification._id}>

              <div className="notification-icon">
                🔔
              </div>

              <div>

                <p>{notification.message}</p>

                <small>
                  {new Date(notification.createdAt).toLocaleString()}
                </small>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Notifications;