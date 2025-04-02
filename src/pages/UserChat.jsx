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
    <div className="w-[50%] bg-black text-white px-5 flex flex-col justify-center mx-auto mt-20 ">
      <h2 className="text-center font-bold text-lg md:text-xl lg:text-2xl">Chat with Admin</h2>
      <div>
        {messages.map((msg) => (
          <p className="font-[480]" key={msg.id} style={{ textAlign: msg.senderId === userId ? "right" : "left" }}>
            <strong className="block">{msg.senderId === userId ? "You" : "Admin"}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        className="border-gray-500 border-2 text-black"
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-cyan-500 text-white px-2 py-[2px]">Send</button>
    </div>
  );
};

export default UserChat;