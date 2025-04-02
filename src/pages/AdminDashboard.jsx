

import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [replyMessage, setReplyMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin-login");
  };

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

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

  const deleteMessage = async (messageId) => {
    await deleteDoc(doc(db, "messages", messageId));
  };

  return (
    <div className="flex flex-col bg-slate-400 w-[80%] px-5 py-5 mx-auto">
      <h2 className="text-center font-bold text-lg md:text-xl lg:text-2xl">Admin Dashboard</h2>
      {/* <button onClick={handleLogout}>Logout</button> */}

     
<div className="grid grid-cols-3 ">  
      <div className="col-span-1 border-2">
       <button onClick={handleLogout}>Logout</button>
       <h3>Users List</h3>
        {Array.from(new Set(messages.map(msg => msg.senderId)))
          .filter(user => user !== "admin")
          .map(user => (
            <button className="flex flex-col items-start" key={user} onClick={() => setSelectedUser(user)} >
               <span>{user}</span>
            </button>
          ))}
      </div>

    <div className="col-span-2 border-2"> 
      <h3 className="text-center text-xl font-[500]">Chat With User</h3>
      <div >
        {messages
          .filter(msg => msg.senderId === selectedUser || msg.receiverId === selectedUser)
          .map(msg => (
            <div key={msg.id} className="">
              <p className={ msg.senderId === "admin" ? "flex justify-end text-blue-50" : "flex justify-start"} ><strong >{msg.senderId === "admin" ? "admin" : selectedUser}:</strong> {msg.message}
              <button onClick={() => deleteMessage(msg.id)} style={{ color: "red" }}>🗑 Delete</button> </p>
            </div>
          ))}
      </div>

      {selectedUser && (
        <div className="flex justify-center pt-10 pb-1">
          <input className="w-[70%]" type="text" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Type a reply..." />
          <button onClick={sendReply}>Send</button>
        </div>
      )}
       </div>
</div>     
    </div>
  );
};

export default AdminDashboard;



// import React, { useEffect, useState } from "react";
// import { getDocs, collection, query, where } from "firebase/firestore";
// import { auth, db } from "../firebase/config"; // আপনার Firebase কনফিগ থেকে ডাটা নেয়া হবে

// const AdminDashboard = () => {
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [messageText, setMessageText] = useState("");

//   // ইউজার লিস্ট ফেচ করা
//   useEffect(() => {
//     const fetchUsers = async () => {
//       const q = query(collection(db, "users"));
//       const querySnapshot = await getDocs(q);
//       let usersList = [];
//       querySnapshot.forEach((doc) => {
//         usersList.push(doc.data());
//       });
//       setUsers(usersList);
//     };

//     fetchUsers();
//   }, []);

//   // মেসেজ ফেচ করা
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const q = query(collection(db, "messages"));
//       const querySnapshot = await getDocs(q);
//       let messageList = [];
//       querySnapshot.forEach((doc) => {
//         messageList.push(doc.data());
//       });
//       setMessages(messageList);
//     };

//     fetchMessages();
//   }, []);

//   // মেসেজ প্রেরণ ফাংশন
//   const sendMessage = () => {
//     if (messageText.trim() === "") return; // মেসেজ খালি না হলে

//     const msg = {
//       text: messageText,
//       sender: currentUser ? currentUser : "admin", // ইউজার না থাকলে admin সেট করা
//       timestamp: new Date(),
//     };

//     // ফায়ারবেসে মেসেজ সেভ করার কোড এখানে বসান
//     // ফায়ারবেস মেসেজে সেভ করার লজিক এখানে বসান

//     // মেসেজ পাঠানোর পর ইনপুট ফিল্ড ফাঁকা করে দেয়া
//     setMessageText("");
//   };

//   return (
//     <div className="dashboard">
//       {/* ইউজার লিস্ট সেকশন */}
//       <div className="user-list">
//         <h3>User List</h3>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               <button onClick={() => setCurrentUser(user)}>{user.name}</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* চ্যাট সেকশন */}
//       <div className="chat-section">
//         <h3>Chat with {currentUser ? currentUser.name : "Admin"}</h3>
//         <div className="chat-container">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 msg.sender === "admin" ? "admin-message" : "user-message"
//               }`}
//             >
//               <p>{msg.text}</p>
//             </div>
//           ))}
//         </div>
//         <div className="message-input">
//           <input
//             type="text"
//             value={messageText}
//             onChange={(e) => setMessageText(e.target.value)}
//             placeholder="Type a message"
//           />
//           <button onClick={sendMessage} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;