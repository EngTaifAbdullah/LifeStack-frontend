import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

// _________________________________________________________________________________________________________

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);

  // حفظ الوضع الحالي في localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // تطبيق الوضع على الصفحة
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <header className="top-menu">
      <h2>MY LifeStack</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/personal">Personal Document</Link>
        <Link to="/certificate">Certificate</Link>
        <Link to="/courses">Future Goals</Link>

        {/* زر تبديل الوضع */}
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
