import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats } from "../services/chatService";
import "./MyChats.css";

function MyChats() {

  const navigate = useNavigate();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await getChats(user.id);
      setChats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mychats-container">

      <div className="mychats-header">
        <h1>💬 My Conversations</h1>
        <p>
          Chat securely with your accepted blood donor or receiver.
        </p>
      </div>

      {chats.length === 0 ? (

        <div className="empty-chat">
          <div className="empty-icon">💭</div>
          <h2>No Conversations Yet</h2>
          <p>
            Once a blood request is accepted, your conversations will appear here.
          </p>
        </div>

      ) : (

        <div className="chat-grid">

          {chats.map((chat) => {

            const user = JSON.parse(localStorage.getItem("user"));

            const otherPerson =
              chat.donorUserId === user.id
                ? chat.receiverName
                : chat.donorName;

            return (

              <div
                className="chat-card"
                key={chat._id}
              >
                <div className="avatar">
                  {otherPerson.charAt(0).toUpperCase()}
                </div>

                <div className="chat-info">
                  <h3>{otherPerson}</h3>
                  <p>Blood Donation Conversation</p>
                </div>

                <button
                  className="chat-btn"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                >
                  Open Chat →
                </button>

              </div>

            );

          })}

        </div>

      )}

    </div>
  );
}

export default MyChats;