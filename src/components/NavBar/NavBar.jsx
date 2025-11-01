import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function Navbar() {

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access");
  const isLoggedIn = !!accessToken;
  const [darkMode, setDarkMode] = useState(false);

// _________________________________________________________________________________________________________________________________

//my code i take it from my portifolio (frist project)

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);


  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  // _________________________________________________________________________________________________________________________________

  return (
    <nav className={`navbar ${darkMode ? "navbar-dark" : "navbar-light"}`}>

      <div className="nav-left">
        <Link to="/" className="nav-logo">LifeStack</Link>
      </div>

      {/* _________________________________________________________________ */}

      <div className="nav-links">
        <Link to="/">Home</Link>

        {isLoggedIn && (
          <>
            <Link to="/personal">Personal Docs</Link>
            <Link to="/certificate">Certificates</Link>
            <Link to="/courses/dashboard">Future Goals</Link>
          </>
        )}
      </div>

      {/* _________________________________________________________________ */}

      <div className="nav-right">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mode-toggle"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

      {/* _________________________________________________________________ */}

        {!isLoggedIn ? (
          <>
            <Link to="/signup" className="btn btn-signup">Signup</Link>
            <Link to="/login" className="btn btn-login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn btn-logout">Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
// _________________________________________________________________________________________________________________________________