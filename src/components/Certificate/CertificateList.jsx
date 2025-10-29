import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";
// _________________________________________________________________________________________________________________________________
// All Certificate

import courseraImage from "../../assets/coursera.png";
import awsImg from "../../assets/aws.png";
import datacampImg from "../../assets/datacamp.png";
import codeacadimyImg from "../../assets/codeacadimy.png";
import cyperAnaImg from "../../assets/cyperAna.png";
import cyperhubImg from "../../assets/cyperhub.png";


// _________________________________________________________________________________________________________________________________



function CertificateList() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetchCertificates();
  }, []);

  // _________________________________________________________________________________________________________________________________

  const getCertificateImage = (title) => {


    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (formatTitle.includes("Coursera")) return courseraImage;
    if (formatTitle.includes("Aws")) return awsImg;
    if (formatTitle.includes("Datacamp")) return datacampImg;
    if (formatTitle.includes("Codeacadimy")) return codeacadimyImg;
    if (formatTitle.includes("CyperAna")) return cyperAnaImg;
    if (formatTitle.includes("CyperHub")) return cyperhubImg;

    return datacampImg; 
  };

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
        <p className="text-gray-500 text-center mt-10">
          There are no Certificates yet
        </p>
      ) : (
        <div className="cards-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="card">
              <img
                src={getCertificateImage(cert.title)}
                alt={cert.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "2px",
                }}
              />

              <h2>{cert.title}</h2>
              <p>Organization: {cert.organization}</p>
              <p>Date Obtained: {cert.date_obtained}</p>

              <div className="buttons">
                <Link to={`/certificate/${cert.id}`} className="btn btn-view">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateList;
