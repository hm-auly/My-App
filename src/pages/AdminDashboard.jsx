
import { AiOutlineAlignLeft } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase/config";

import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

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

  const [sidever, setSidever] = useState(false)
  const side = ()=>{
    setSidever(true)
  }
  const side2 = ()=>{
    setSidever(false)
  }
  
  const Naviget = useNavigate()

  return (
    <div>
      
 <div className="flex flex-col  w-full h-screen  py-5 mx-auto">
      <h2 className="text-center font-bold text-lg md:text-xl lg:text-2xl py-5">Admin Dashboard</h2>
     

     
<div className="md:grid md:grid-cols-3   ">  
      <div className={`md:col-span-1 md:border-2 px-5 ${sidever === false? "hidden md:block" : "absolute bg-gray-800 h-screen top-0 pt-20"} `}>
       <button className="text-xl font-bold text-cyan-500 pt-5 py-2 " onClick={handleLogout}>Logout</button>
       <h3 className="text-lg font-bold">Users List</h3>
        {Array.from(new Set(messages.map(msg => msg.senderId)))
          .filter(user => user !== "admin")
          .map(user => (
            <button  className="flex flex-col items-start" key={user} onClick={() => setSelectedUser(user)} >
               <span onClick={side2}>{user}</span>
            </button>
          ))}
         <div className="mt-10 py-5 text-center">
         <Link to="/" className="btn">Back Home Page</Link>
         </div>
      </div>

    <div className=" md:col-span-2 md:border-2 "> 
      <h3 className="text-center text-xl font-[500]">Chat With User</h3>
      <div >
        {messages
          .filter(msg => msg.senderId === selectedUser || msg.receiverId === selectedUser)
          .map(msg => (
            <div key={msg.id} className=" px-5 font-[600] text-xl my-5 flex justify-between">
              <p className={ msg.senderId === "admin" ? "text-cyan-500 " : "flex justify-start"} ><strong >{msg.senderId === "admin" ? `Addmin:___` : "User:___"}</strong> {msg.message} </p>
              <button onClick={() => deleteMessage(msg.id)} style={{ color: "red" }}>🗑 Delete</button>
            </div>
          ))}
      </div>

      {selectedUser && (
        <div className="flex justify-center pt-10 pb-1 px-5">
          <input className=" w-full  md:w-[70%] text-black rounded-lg font-bold text-3xl px-2 h-11" type="text" value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)} placeholder="Type a reply..." />
          <button onClick={sendReply}><IoMdSend className=" p-1 flex justify-center items-center  bg-white text-cyan-500 h-11 rounded-full w-11" /></button>
        </div>
      )}
       </div>
</div>     
    </div>
    <div className="">
        <button onClick={side} className="">
        <AiOutlineAlignLeft className="ml-2 text-3xl absolute top-7 left-2 md:hidden " />
        </button>
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