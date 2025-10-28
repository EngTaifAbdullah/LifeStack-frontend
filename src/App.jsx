import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import'.App.css'


// first components
import CertificateIndex from './components/Certificate/CertificateIndex'
import CertificateDetail from './components/Certificate/CertificateDetail'
import CertificateForm from './components/Certificate/CertificateForm'

function App() {

  async function makeRequest() {
    
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/certificates/')
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  makeRequest()

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/certificates" element={<CertificateIndex />} />
        <Route path="/certificates/new" element={<CertificateForm />} />
        <Route path="/certificates/:cert_id" element={<CertificateDetail />} />
        <Route path="/certificates/:cert_id/edit" element={<CertificateForm />} />
      </Routes>
    </Router>
  )
}

export default App
