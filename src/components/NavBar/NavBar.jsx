import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

// _________________________________________________________________________________________________________

// this code i tacke it from my portofilo in first project

function NavBar() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);


  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // _________________________________________________________________________________________________________

  return (
    <header className="top-menu">
      <h2>MY LifeStack</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/personal">Personal Document</Link>
        <Link to="/certificate">Certificates</Link>
        {/* <Link to="/courses">Future Goals</Link> */}
        <Link to="/courses/dashboard">Future Goals</Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mode-toggle"
          title="Toggle Dark/Light Mode"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
}

export default NavBar;
