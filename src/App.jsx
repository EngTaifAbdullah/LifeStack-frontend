
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar";
import Home from "./components/Home/HomePage";
// _________________________________________________________________________________

import CertificateForm from "./components/Certificate/CertificateForm";
import CertificateList from "./components/Certificate/CertificateList";
import CertificateView from "./components/Certificate/CertificateView";
// _________________________________________________________________________________

import PersonalForm from "./components/PersonalDocuments/PersonalForm";
import PersonalList from "./components/PersonalDocuments/PersonalList";
import PersonalView from "./components/PersonalDocuments/PersonalView";
// _________________________________________________________________________________

import CourseForm from "./components/Courses/CourseForm";
import CourseList from "./components/Courses/CourseList";
// _________________________________________________________________________________

import DashboardCourses from "./components/Courses/DashboardCourses";
// _________________________________________________________________________________

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

        <Route path="/personal" element={<PersonalList />} />
        <Route path="/personal/new" element={<PersonalForm />} />
        <Route path="/personal/:docId/edit" element={<PersonalForm />} />
        <Route path="/personal/:docId" element={<PersonalView />} />

        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/new" element={<CourseForm />} />
        <Route path="/courses/:courseId/edit" element={<CourseForm />} />

        <Route path="/courses/dashboard" element={<DashboardCourses />} />

      </Routes>
    </Router>
  );
}

export default App;