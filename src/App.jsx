// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";

import Home from "./components/Home/HomePage";

import CertificateForm from "./components/Certificate/CertificateForm";
import CertificateList from "./components/Certificate/CertificateList";
import CertificateView from "./components/Certificate/CertificateView";

import './App.css'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate" element={<CertificateList />} />
        <Route path="/certificate/new" element={<CertificateForm />} />
        <Route path="/certificate/:certId/edit" element={<CertificateForm />} />
        <Route path="/certificate/:certId" element={<CertificateView />} />
      </Routes>
    </Router>
  );
}

export default App;