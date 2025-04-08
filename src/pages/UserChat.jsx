import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import Navber from "../Navber";

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
    <div className="">
      <div className="px-5 absolute w-full ">
      <Navber />
      <h2 className="p-0  text-center   font-bold text-lg md:text-xl lg:text-2xl py-5">Chat with Admin</h2>
     
      </div>
     
    <div className="w-full md:w-[50%] h-screen   rounded-md text-white px-5 flex flex-col justify-end mx-auto  py-5 ">
     <div className=" ">
     {/* <h2 className="p-0  text-center flex  font-bold text-lg md:text-xl lg:text-2xl py-5">Chat with Admin</h2> */}
     <div>
        {messages.map((msg) => (
          <p key={msg.id} style={{ textAlign: msg.senderId === userId ? "right " : "left" }} className={`${msg.senderId === userId ? "bg-cyan-800 ml-16 md:ml-36 rounded-lg px-4 py-3 my-5 text-white" : "px-4 py-3 mr-16 bg-gray-700 my-4 mx-1 md:mr-36 rounded-lg"}`}>
            <strong className="block">{msg.senderId === userId ? "" : ""}</strong> {msg.message}
          </p>
        ))}
      </div>
     </div>
      {/* <div>
        {messages.map((msg) => (
          <p key={msg.id} style={{ textAlign: msg.senderId === userId ? "right " : "left" }} className={`${msg.senderId === userId ? "bg-cyan-800 md:ml-36 rounded-lg px-4 py-3 my-5 text-white" : "px-4 py-3 bg-gray-700 my-4 mx-1 md:mr-36 rounded-lg"}`}>
            <strong className="block">{msg.senderId === userId ? "" : ""}</strong> {msg.message}
          </p>
        ))}
      </div> */}
      <input
        className="border-gray-500 border-2 text-black"
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage} className="bg-cyan-500 text-white px-2 py-[2px]">Send</button>
    </div>
    </div>

  );
};

export default UserChat;