import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";

const UserChat = () => {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const generatedUserId = `user_${Math.random().toString(36).substring(7)}`;
    setUserId(generatedUserId);
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(collection(db, "messages"), orderBy("timestamp"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [userId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      senderId: userId,
      receiverId: "admin",
      message: newMessage,
      timestamp: new Date()
    });

    setNewMessage("");
  };

  return (
    <div>
      <h2>Chat with Admin</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.id} style={{ textAlign: msg.senderId === userId ? "right" : "left" }}>
            <strong>{msg.senderId === userId ? "You" : "Admin"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default UserChat;