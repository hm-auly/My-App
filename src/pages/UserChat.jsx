import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { IoMdSend } from "react-icons/io";
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
    <div className="h-[100vh]  p-0 overflow-hidden flex flex-col justify-between ">

      <div className="px-5 h-[20vh]">
        <div className="absolut w-full md:flex flex-col  z-50">
          <Navber />
        </div>
      </div>

      {/* <div className="w-full md:w-[90%] xl:w-[70%]  bg-red-600   rounded-md text-white px-5 flex flex-col justify-end mx-auto  py-5 "> */}

        {/* message fild */}
        <div className=" h-[60vh]  overflow-scroll px-5">
          {messages.map((msg) => (
            <p key={msg.id} style={{ textAlign: msg.senderId === userId ? "right " : "left" }} className={`${msg.senderId === userId ? "bg-cyan-800 ml-16 md:ml-36 rounded-lg px-4 py-3 my-5 text-white" : "px-4 py-3 mr-16 bg-gray-700 my-4 mx-1 md:mr-36 rounded-lg"}`}>
              <strong className="block">{msg.senderId === userId ? "" : ""}</strong> {msg.message}
            </p>
          ))}
        </div>


        {/* input fild */}
        <div className=" px-5 backdrop-blur-md h-[20vh]   flex justify-center ">
         <div className="flex gap-2 py-2">
         <input
            className="border-gray-500 border-2 text-black w-[82%] h-12 rounded-full text-xl px-2 "
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="h-12 rounded-full w-12 bg-cyan-500 text-white px-2 py-[2px]"><IoMdSend className="text-3xl text-center flex justify-center items-center ml-1" /></button>
         </div>
        </div>

     
    </div>

  );
};

export default UserChat;