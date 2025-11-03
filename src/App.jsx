import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home/HomePage";
import "./App.css";

import CertificateForm from "./components/Certificate/CertificateForm";
import CertificateList from "./components/Certificate/CertificateList";
import CertificateView from "./components/Certificate/CertificateView";

import PersonalForm from "./components/PersonalDocuments/PersonalForm";
import PersonalList from "./components/PersonalDocuments/PersonalList";
import PersonalView from "./components/PersonalDocuments/PersonalView";

import CourseForm from "./components/Courses/CourseForm";
import DashboardCourses from "./components/Courses/DashboardCourses";

import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

function AnimatedRoutes() {
  
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>


        <Route path="/login" element={<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><Login /></motion.div>} />
        <Route path="/logout" element={<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><Logout /></motion.div>} />
        <Route path="/signup" element={<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><Signup /></motion.div>} />


        <Route path="/" element={<motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><Home /></motion.div>} />


        <Route path="/certificate" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CertificateList /></motion.div></ProtectedRoute>} />
        <Route path="/certificate/new" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CertificateForm /></motion.div></ProtectedRoute>} />
        <Route path="/certificate/:certId/edit" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CertificateForm /></motion.div></ProtectedRoute>} />
        <Route path="/certificate/:certId" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CertificateView /></motion.div></ProtectedRoute>} />


        <Route path="/personal" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><PersonalList /></motion.div></ProtectedRoute>} />
        <Route path="/personal/new" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><PersonalForm /></motion.div></ProtectedRoute>} />
        <Route path="/personal/:docId/edit" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><PersonalForm /></motion.div></ProtectedRoute>} />
        <Route path="/personal/:docId" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><PersonalView /></motion.div></ProtectedRoute>} />


        <Route path="/courses/new" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CourseForm /></motion.div></ProtectedRoute>} />
        <Route path="/courses/:courseId/edit" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><CourseForm /></motion.div></ProtectedRoute>} />
        <Route path="/courses/dashboard" element={<ProtectedRoute><motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.2 }}><DashboardCourses /></motion.div></ProtectedRoute>} />

      </Routes>
    </AnimatePresence>
  );
}

// _____________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Navbar />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;