import React, { useState } from "react";
import api from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css"; 
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
 
  // ____________________________________________________

  return (

    <div className="auth-container">
      <div className="auth-card neon-glow">
        <h2 className="auth-title">Welcome Back </h2>
        <p className="auth-subtitle">Please sign in to continue</p>



        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input"/>


          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input"/>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-btn">Login</button>
        </form>


        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

// _________________________________________________________________________________________________________



