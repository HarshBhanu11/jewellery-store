import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    const res = await fetch("http://localhost:4000/api/contact", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const toggleRead = async (id, isRead) => {
    await fetch(`http://localhost:4000/api/contact/${id}/read`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ isRead: !isRead })
    });

    fetchMessages();
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    await fetch(`http://localhost:4000/api/contact/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchMessages();
  };

  return (
    <div className="admin-container">
      <Navbar />

      <div className="content">
        <h2>Messages</h2>

        {messages.map((msg) => (
          <div
            key={msg._id}
            className="card"
            style={{
              fontWeight: msg.isRead ? "normal" : "bold",
              borderLeft: msg.isRead ? "4px solid #ccc" : "4px solid green"
            }}
          >
            {!msg.isRead && (
              <span style={{ color: "green", fontSize: 12 }}>UNREAD</span>
            )}

            <p>Name: {msg.name}</p>
            <p>Email: {msg.email}</p>
            <p>Phone: {msg.phone || "N/A"}</p>
            <p>Message: {msg.message}</p>

            <p style={{ fontSize: 12, color: "#666" }}>
              Received: {new Date(msg.createdAt).toLocaleString()}
            </p>

            <button onClick={() => toggleRead(msg._id, msg.isRead)}>
              Mark as {msg.isRead ? "Unread" : "Read"}
            </button>

            <button onClick={() => deleteMessage(msg._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
