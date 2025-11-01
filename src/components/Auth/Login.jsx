import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

// _________________________________________________________________________________________________________

function Login() {
  
  const [username, setUsername] = useState("");     // Username input 
  const [password, setPassword] = useState("");     // Pass input 
  const [error, setError] = useState("");           // Error message 
  const navigate = useNavigate();                   // Navigation 

  // _________________________________________________________________________________________________________

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login/", { username, password });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);

        navigate("/"); 
      } else {
        setError("Tokens were not received from the server.");
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };
 
  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-80">

        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 w-full mb-3 rounded"/>


        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mb-3 rounded"/>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
}

export default Login;
