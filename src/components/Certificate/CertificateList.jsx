
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";
import courseraImage from "../../assets/coursera.png"

// _________________________________________________________________________________________________________

function CertificateList() {

  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
  }, []);


  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificate/");
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await api.delete(`/certificate/${id}/`);
        fetchCertificates();
      } catch (error) {
        console.error("Error deleting certificate:", error);
      }
    }
  };

  // _________________________________________________________________________________________________________

  return (
    <div className="main-content">

      <div className="main-header">
        <h1>All Achievements</h1>
      </div>


      <div>
         <Link to="/certificate/new" className="add-btn">
          Add New Certificate
        </Link>
      </div>


      {certificates.length === 0 ? (
        <p className="text-gray-500 text-center mt-10"> There are no Certificates yet </p>
      ) : (


        <div className="cards-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="card">
              <img 
                src={courseraImage} 
                alt="coursera" 
               style={{ width: "100%", borderRadius: "8px", marginBottom: "10px" }}
               />

              <h2>{cert.title}</h2>
              <p>Organization : {cert.organization}</p>
              <p>Date Obtained {cert.date_obtained}</p>

             {/* ____________________________________________________________________________ */}

              <div className="buttons">
                <Link to={`/certificate/${cert.id}`} className="btn btn-view">
                  View
                </Link>
             {/* ____________________________________________________________________________ */}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateList;

