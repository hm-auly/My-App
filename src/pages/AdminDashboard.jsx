import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config';  // Firebase config ফাইল থেকে auth ইমপোর্ট
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const AdminDashboard = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const usersRef = collection(db, 'users');
      getDocs(usersRef).then((querySnapshot) => {
        const users = querySnapshot.docs.map(doc => doc.data());
        setUserList(users);
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Welcome, {currentUser ? currentUser.email : 'Guest'}</h2>
      <h3>User List</h3>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            {user.email} <button>Chat</button> {/* Chat button for each user */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;