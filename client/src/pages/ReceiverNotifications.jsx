import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

function ReceiverNotifications() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      const response = await getNotifications(user.id);

      setNotifications(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Notifications</h2>

      {notifications.length === 0 ? (
        <h3>No Notifications</h3>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              background: "#fff",
              color: "#000",
            }}
          >
            <h3>{notification.message}</h3>

            <p>
              <b>Type:</b> {notification.type}
            </p>

            <p>
              <b>Time:</b>{" "}
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default ReceiverNotifications;