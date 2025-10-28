import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import CertificatesList from "./components/Certificate/CertificateForm";
import CertificateForm from "./components/Certificate/CertificatesList";

import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CertificatesList />} />
        <Route path="/add" element={<CertificateForm />} />
        <Route path="/edit/:id" element={<CertificateForm />} />
      </Routes>
    </Router>
  );
}

export default App;
