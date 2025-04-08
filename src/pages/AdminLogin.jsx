import { useState } from "react";
import { auth } from "../firebase/config"; // Firebase config import করুন
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard"); // লগইন সফল হলে এডমিন ড্যাশবোর্ডে নিয়ে যাবে
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center px-5 gap-5">
      <h2 className="text-3xl font-bold text-cyan-500 py-5">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
        className="text-black w-full h-10 rounded-lg text-2xl"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        className="text-black w-full my-5 h-10 rounded-lg text-2xl"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn w-full ">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
    </div>
  );
};

export default AdminLogin;