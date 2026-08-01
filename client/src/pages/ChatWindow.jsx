import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { sendMessage, getMessages } from "../services/messageService";
import "./ChatWindow.css";

function ChatWindow() {
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, [chatId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(chatId);
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await sendMessage({
        chatId,
        senderId: user.id,
        text,
      });

      setText("");
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="chat-page">

      <div className="chat-container">

        <div className="chat-header">
          <div className="chat-avatar">💬</div>

          <div>
            <h2>Blood Donation Chat</h2>
            <p>Communicate securely with the donor/receiver</p>
          </div>
        </div>

        <div className="chat-body">

          {messages.length === 0 ? (

            <div className="empty-chat">
              <span>💭</span>
              <p>Start your conversation here.</p>
            </div>

          ) : (

            messages.map((msg) => (

              <div
                key={msg._id}
                className={
                  msg.senderId === user.id
                    ? "message sent"
                    : "message received"
                }
              >
                <div className="bubble">

                  <p>{msg.text}</p>

                  <span>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>

            ))

          )}

          <div ref={bottomRef}></div>

        </div>

        <div className="chat-footer">

          <input
            type="text"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />

          <button onClick={handleSend}>
            ➤ Send
          </button>

        </div>

      </div>

    </div>
  );
}

export default ChatWindow;