import React from "react";
import { motion } from "framer-motion";  //laibrary from bootstrap
import "./HomePage.css";
// _________________________________________________________________________________________________________________________________

function Home() {

  return (
    <div className="hero-container">

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}>Welcome to LifeStack</motion.h1>



      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}>Professional Certificate & Course Management System</motion.p>


    </div>
  );
}

export default Home;
// _________________________________________________________________________________________________________________________________
