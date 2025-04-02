// src/pages/UserChat.js
import React, { useEffect, useState } from 'react';
import { db, auth, storage, collection, addDoc, query, where, onSnapshot, serverTimestamp } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, 'messages'), where('userId', '==', currentUser.uid));
        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
          setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribeMessages();
      }
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !image) return;
    let imageUrl = null;
    if (image) {
      const imageRef = ref(storage, `images/${user.uid}/${image.name}`);
      await uploadBytes(imageRef, image);
      imageUrl = await getDownloadURL(imageRef);
    }
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      imageUrl,
      userId: user.uid,
      timestamp: serverTimestamp()
    });
    setNewMessage('');
    setImage(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold text-center">Chat with Admin</h2>
      <div className="flex-grow overflow-y-auto p-4 bg-white rounded shadow">
        {messages.map(msg => (
          <div key={msg.id} className="p-2 border-b">
            {msg.text && <p>{msg.text}</p>}
            {msg.imageUrl && <img src={msg.imageUrl} alt="Sent" className="w-32 h-32 object-cover" />}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex mt-4 space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Type a message or paste a link..."
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send</button>
      </form>
    </div>
  );
};

export default UserChat;