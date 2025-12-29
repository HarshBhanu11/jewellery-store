import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/contact")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  return (
    <div className="admin-container">
      <Navbar />

      <div className="content">
        <h2>Messages</h2>

        {messages.map(msg => (
          <div key={msg._id} className="card">
            <b>{msg.name}</b>
            <p>{msg.email}</p>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
