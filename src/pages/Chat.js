import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // SEND MESSAGE
  const sendMessage = () => {
    const messagesRef = ref(db, "messages");

    push(messagesRef, {
      text: message,
      uid: auth.currentUser.uid,
      time: Date.now()
    });

    setMessage("");
  };

  // RECEIVE MESSAGES (REAL-TIME)
  useEffect(() => {
    const messagesRef = ref(db, "messages");

    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = [];

      for (let id in data) {
        loadedMessages.push(data[id]);
      }

      setMessages(loadedMessages);
    });
  }, []);

  return (
    <div>
      <h2>Chat Room</h2>

      {messages.map((msg, index) => (
        <p key={index}>
          <b>{msg.uid}:</b> {msg.text}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;