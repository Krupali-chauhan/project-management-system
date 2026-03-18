import React, { useState } from "react";
import axios from "axios";

function Chatbot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    try {

      // user message add
      setChat((prev) => [...prev, { user: message }]);

      const res = await axios.post(
        "http://localhost:5000/api/chat/chat",
        { message }
      );

      // ai response add
      setChat((prev) => [...prev, { ai: res.data.reply }]);

      setMessage("");

    } catch (error) {

      console.error(error);

      setChat((prev) => [
        ...prev,
        { ai: "⚠️ Error connecting to AI server" }
      ]);

    }

  };

  return (

    <div
      style={{
        width: "500px",
        margin: "50px auto",
        fontFamily: "Arial",
      }}
    >

      <h2 style={{ textAlign: "center" }}>
        🤖 AI Project Assistant
      </h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          height: "400px",
          padding: "15px",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >

        {chat.map((msg, i) => (
          <div key={i}>

            {msg.user && (
              <div
                style={{
                  textAlign: "right",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    background: "#007bff",
                    color: "white",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                  }}
                >
                  {msg.user}
                </span>
              </div>
            )}

            {msg.ai && (
              <div
                style={{
                  textAlign: "left",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    background: "#e4e6eb",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                  }}
                >
                  {msg.ai}
                </span>
              </div>
            )}

          </div>
        ))}

      </div>

      <div
        style={{
          display: "flex",
          marginTop: "10px",
        }}
      >

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            background: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>

      </div>

    </div>

  );
}

export default Chatbot;