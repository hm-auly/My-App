import React from 'react';
import { useNavigate} from 'react-router-dom';

const MainPage = () => {
  const history = useNavigate();

  const goToMessagePage = () => {
    // Message বাটনে ক্লিক করলে চ্যাট পেজে নিয়ে যাবে
    history.push('/chat');
  };

  const goToAdminPage = () => {
    // Admin বাটনে ক্লিক করলে লগইন পেজে নিয়ে যাবে
    history.push('/admin-login');
  };

  return (
    <div>
      <h1>Welcome to the Chat Application</h1>
      <button onClick={goToMessagePage}>Message</button>
      <button onClick={goToAdminPage}>Admin</button>
    </div>
  );
};

export default MainPage;