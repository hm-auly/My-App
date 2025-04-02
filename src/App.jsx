// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import UserChat from './pages/UserChat';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserChat />} />
//         <Route path="/admin" element={<Login />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React, { useState } from 'react';
import AdminLogin from './pages/AdminLogin'
import UserChat from './pages/UserChat';     // User chat page

const App = () => {
  const [isUserChat, setIsUserChat] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  return (
    <div className="App">
      {!isUserChat && !isAdminLogin && (
        <div className="flex flex-col justify-center items-center">
          <button
            onClick={() => setIsUserChat(true)}
            className="p-4 bg-blue-500 text-white mb-4"
          >
            User Message Button
          </button>
          <button
            onClick={() => setIsAdminLogin(true)}
            className="p-4 bg-green-500 text-white"
          >
            Admin Login Button
          </button>
        </div>
      )}

      {isUserChat && <UserChat />}
      {isAdminLogin && <AdminLogin setIsAdminLogin={setIsAdminLogin} />}
    </div>
  );
};

export default App;