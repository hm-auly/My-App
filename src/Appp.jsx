import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserChat from './pages/UserChat';
import NotFound from './pages/404Error';  // 404 page
import Navber from './Navber';

function Appp() {
  return (
    <Router>
      <Routes>

    {/*<Route path='' element={<Navber />}> */}
    <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-chat" element={<UserChat />} />
        <Route path="*" element={<NotFound />} />

    {/* </Route> */}

        {/* <Route path="/" element={<Navber />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-chat" element={<UserChat />} />
        <Route path="*" element={<NotFound />} /> */}
        
      </Routes>
    </Router>
  );
}

export default Appp;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import UserChat from "./pages/UserChat";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<UserChat />} />
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;