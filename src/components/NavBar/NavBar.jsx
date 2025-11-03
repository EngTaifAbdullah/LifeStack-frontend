import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

// _________________________________________________________________________________________________________________________

function Navbar() {

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  // to switch between dark and light theme, taken from my portfolio first project

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // _________________________________________________________________________________________________________________________

  const checkAuth = () => {
    const access = localStorage.getItem("access");
    const token = localStorage.getItem("token");
    return !!(access || token);
  };

  useEffect(() => {
    setIsAuthenticated(checkAuth());
  }, []);


  useEffect(() => {
    const onStorage = () => setIsAuthenticated(checkAuth());
    const onAuthChange = () => setIsAuthenticated(checkAuth());

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChange", onAuthChange);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  useEffect(() => {
    setIsAuthenticated(checkAuth());
    setMenuOpen(false);
  }, [location.pathname]);

  // _________________________________________________________________________________________________________________________

  const handleLogout = () => {
    
    localStorage.removeItem("access");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");

    window.dispatchEvent(new Event("authChange"));
    setIsAuthenticated(false);
    setMenuOpen(false);
    navigate("/login");
  };

  //what you will see when dosnt login minu
  const navLinks = [

    { path: "/", label: "Home", auth: false },
    { path: "/personal", label: "Personal Docs", auth: true },
    { path: "/certificate", label: "Certificates", auth: true },
    { path: "/courses/dashboard", label: "Future Goals", auth: true },
  ];

  // _________________________________________________________________________________________________________________________

  return (

    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>

      <div className="logo">LifeStack</div>

      {/* ______________________________________________________________ */}

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => {
          if (link.auth && !isAuthenticated) return null;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? "active" : ""}
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none" }}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* ______________________________________________________________ */}

      <div className="auth-buttons">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="btn-login" style={{ textDecoration: "none" }}>Login</Link>
            <Link to="/signup" className="btn-signup" style={{ textDecoration: "none" }}>Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        )}

        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button onClick={toggleMenu} className="mode-toggle">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ______________________________________________________________ */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>

            {navLinks.map((link) => {
              if (link.auth && !isAuthenticated) return null;
              return (
                <Link key={link.path} to={link.path}
                  onClick={() => setMenuOpen(false)}
                  style={{ textDecoration: "none" }}>
                  {link.label}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-logout">Logout</button>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/signup" className="btn-signup">Sign Up</Link>
              </>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
// _________________________________________________________________________________________________________________________
