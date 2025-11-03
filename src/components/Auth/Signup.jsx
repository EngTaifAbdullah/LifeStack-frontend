import React, { useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

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

    <div className="auth-container">
      <div className="auth-card neon-glow">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join us</p>

      {/* ______________________________________________________________ */}

        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"/>
      {/* ______________________________________________________________ */}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"/>
      {/* ______________________________________________________________ */}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"/>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}
      {/* ______________________________________________________________ */}

          <button type="submit" className="auth-btn">Sign Up</button>
        </form>
        <p className="auth-footer">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;

// ____________________________________________________________________________________________________________________________________________________________________________

