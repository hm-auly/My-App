import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';  // Firebase database
import { collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      setUsers(userSnapshot.docs.map(doc => doc.data()));
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    // Fetch messages for the selected user
    // Replace this with your logic to fetch the messages
    setChatMessages([
      { sender: 'admin', message: 'Hello, how can I help you?' },
      { sender: 'user', message: 'I need assistance with my order.' },
    ]);
  };

  const handleDeleteMessage = (messageIndex) => {
    // Delete the message from chatMessages
    setChatMessages(chatMessages.filter((_, index) => index !== messageIndex));
  };

  return (
    <div className="admin-dashboard">
      <div className="user-list">
        <h3>User List</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index} onClick={() => handleUserClick(user)}>
              {user.email}
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="chat-window">
          <h3>Chat with {selectedUser.email}</h3>
          <div className="messages">
            {chatMessages.map((message, index) => (
              <div key={index} className={message.sender === 'admin' ? 'admin-message' : 'user-message'}>
                <p>{message.message}</p>
                {message.sender === 'admin' && (
                  <button onClick={() => handleDeleteMessage(index)} className="delete-message">
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;