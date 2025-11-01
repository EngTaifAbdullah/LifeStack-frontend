import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import CourseList from "./components/Courses/CourseList";
import DashboardCourses from "./components/Courses/DashboardCourses";

import Logout from "./components/Auth/Logout";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

// _________________________________________________________________________________________________________

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />


        <Route path="/" element={<Home />} />


        <Route path="/certificate" element={<ProtectedRoute><CertificateList /></ProtectedRoute>}/>
        <Route path="/certificate/new" element={<ProtectedRoute><CertificateForm /></ProtectedRoute>}/>
        <Route path="/certificate/:certId/edit" element={<ProtectedRoute><CertificateForm /></ProtectedRoute>}/>
        <Route path="/certificate/:certId" element={<ProtectedRoute><CertificateView /></ProtectedRoute>}/>


        <Route path="/personal" element={<ProtectedRoute><PersonalList /></ProtectedRoute>}/>
        <Route path="/personal/new" element={<ProtectedRoute><PersonalForm /></ProtectedRoute>}/>
        <Route path="/personal/:docId/edit" element={<ProtectedRoute><PersonalForm /></ProtectedRoute>}/>
        <Route path="/personal/:docId" element={<ProtectedRoute><PersonalView /></ProtectedRoute>}/>


        <Route path="/courses" element={<ProtectedRoute><CourseList /></ProtectedRoute>}/>
        <Route path="/courses/new" element={<ProtectedRoute><CourseForm /></ProtectedRoute>}/>
        <Route path="/courses/:courseId/edit" element={<ProtectedRoute><CourseForm /></ProtectedRoute>}/>
        <Route path="/courses/dashboard" element={<ProtectedRoute><DashboardCourses /></ProtectedRoute>}/>

      </Routes>
    </Router>
  );
}

export default App;




