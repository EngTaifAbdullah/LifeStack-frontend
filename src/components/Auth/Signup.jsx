import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

// ____________________________________________________________________________________________________________________________________________________________________________

function Signup() {

  const [username, setUsername] = useState("");     // Username input
  const [email, setEmail] = useState("");           // Email input
  const [password, setPassword] = useState("");     // Password input
  const [error, setError] = useState("");           // Error message
  const [success, setSuccess] = useState("");       // Success message
  const navigate = useNavigate();                   // Navigation

  // ____________________________________________________________________________________________________________________________________________________________________________

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await api.post("/signup/", { username, email, password });

      setSuccess("Account created successfully! You can now log in.");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during registration.");
      }
    }
  };

  // ____________________________________________________________________________________________________________________________________________________________________________

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded-xl shadow-md w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full mb-3 rounded"/>

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full mb-3 rounded"/>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-3 rounded"/>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;

// ____________________________________________________________________________________________________________________________________________________________________________