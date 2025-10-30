
import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

// _________________________________________________________________________________________________________

function NavBar() {
  return (
    <header className="top-menu">
      <h2>MY LifeStack</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/personal">Personal Document</Link>
        <Link to="/certificate">Certificate</Link>
        <Link to="/courses">Future Goals</Link>
      </nav>
    </header>
  );
}

export default NavBar;
