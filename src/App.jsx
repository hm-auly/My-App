// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Login from './pages/Login';
// // import AdminDashboard from './pages/AdminDashboard';
// // import UserChat from './pages/UserChat';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<UserChat />} />
// //         <Route path="/admin" element={<Login />} />
// //         <Route path="/admin/dashboard" element={<AdminDashboard />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;




// // import React, { useState } from 'react';
// // import AdminLogin from './pages/AdminLogin'
// // import UserChat from './pages/UserChat';     // User chat page

// // const App = () => {
// //   const [isUserChat, setIsUserChat] = useState(false);
// //   const [isAdminLogin, setIsAdminLogin] = useState(false);

// //   return (
// //     <div className="App">
// //       {!isUserChat && !isAdminLogin && (
// //         <div className="flex flex-col justify-center items-center">
// //           <button
// //             onClick={() => setIsUserChat(true)}
// //             className="p-4 bg-blue-500 text-white mb-4"
// //           >
// //             User Message Button
// //           </button>
// //           <button
// //             onClick={() => setIsAdminLogin(true)}
// //             className="p-4 bg-green-500 text-white"
// //           >
// //             Admin Login Button
// //           </button>
// //         </div>
// //       )}

// //       {isUserChat && <UserChat />}
// //       {isAdminLogin && <AdminLogin setIsAdminLogin={setIsAdminLogin} />}
// //     </div>
// //   );
// // };

// // export default App;

// //;;
// import React, { useState } from 'react';
// import AdminLogin from './pages/AdminLogin'; // Admin login পেজ
// import UserChat from './pages/UserChat'; // User chat পেজ
// import AdminDashboard from './pages/AdminDashboard'; // Admin Dashboard পেজ

// const App = () => {
//   const [isUserChat, setIsUserChat] = useState(false);
//   const [isAdminLogin, setIsAdminLogin] = useState(false);
//   const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false); // To track if admin is logged in

//   return (
//     <div className="App">
//       {!isAdminAuthenticated && !isUserChat && !isAdminLogin && (
//         <div className="flex flex-col justify-center items-center">
//           {/* ইউজারের জন্য মেসেজ বাটন */}
//           <button
//             onClick={() => setIsUserChat(true)}
//             className="p-4 bg-blue-500 text-white mb-4"
//           >
//             User Message
//           </button>

//           {/* এডমিন লগইন বাটন */}
//           <button
//             onClick={() => setIsAdminLogin(true)}
//             className="p-4 bg-green-500 text-white"
//           >
//             Admin Login
//           </button>
//         </div>
//       )}

//       {/* ইউজার চ্যাট পেজ */}
//       {isUserChat && <UserChat />}

//       {/* এডমিন লগইন পেজ */}
//       {isAdminLogin && (
//         <AdminLogin
//           setIsAdminLogin={setIsAdminLogin}
//           setIsAdminAuthenticated={setIsAdminAuthenticated}
//         />
//       )}

//       {/* এডমিন ড্যাশবোর্ড */}
//       {isAdminAuthenticated && <AdminDashboard />}
//     </div>
//   );
// };

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";  // আপনার Login পেজ
import AdminDashboard from "./pages/AdminDashboard";  // আপনার Admin Dashboard পেজ
import UserChat from "./pages/UserChat";  // আপনার User Chat পেজ

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-chat" element={<UserChat />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
