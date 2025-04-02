import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { auth } from "../firebase/config"; // Firebase auth import করুন
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  // এডমিন লগআউট করার ফাংশন
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  // Firestore থেকে মেসেজ লোড করুন
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  // এডমিনের রিপ্লাই পাঠানোর ফাংশন
  const sendReply = async () => {
    if (!selectedUser || replyMessage.trim() === "") return;

    await addDoc(collection(db, "messages"), {
      senderId: "admin",
      receiverId: selectedUser,
      message: replyMessage,
      timestamp: new Date()
    });

    setReplyMessage("");
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Users</h3>
      <div>
        {Array.from(new Set(messages.map(msg => msg.senderId)))
          .filter(user => user !== "admin")
          .map(user => (
            <button key={user} onClick={() => setSelectedUser(user)}>
              Chat with {user}
            </button>
        ))}
      </div>

      <h3>Chat</h3>
      <div>
        {messages
          .filter(msg => msg.senderId === selectedUser || msg.receiverId === selectedUser)
          .map(msg => (
            <p key={msg.id} style={{ textAlign: msg.senderId === "admin" ? "right" : "left" }}>
              <strong>{msg.senderId === "admin" ? "Admin" : selectedUser}:</strong> {msg.message}
            </p>
        ))}
      </div>

      {selectedUser && (
        <div>
          <input
            type="text"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Type a reply..."
          />
          <button onClick={sendReply}>Send</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;