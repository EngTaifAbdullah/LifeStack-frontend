import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

// _________________________________________________________________________________________________________________________________

// All Certificate logo

import courseraImage from "../../assets/coursera.png";
import awsImg from "../../assets/aws.png";
import datacampImg from "../../assets/datacamp.png";
import codeacadimyImg from "../../assets/codeacadimy.png";
import cyperAnaImg from "../../assets/cyperAna.png";
import cyperhubImg from "../../assets/cyperhub.png";
import dorobImg from "../../assets/dorob.png";
import edrakImg from "../../assets/edrak.png";
import edxImg from "../../assets/edx.png";
import futureLearnImg from "../../assets/futureLearn.png";
import googedigitalImg from "../../assets/googedigital.png";
import googleImg from "../../assets/google.png";
import hopespotImg from "../../assets/hopespot.png";
import ibmImg from "../../assets/ibm.png";
import technicalBMImg from "../../assets/technicalBM.png";
import twaiqImg from "../../assets/twaiq.png";
import pythonImg from "../../assets/python.png";
import udemyImg from "../../assets/udemy.png";

// _________________________________________________________________________________________________________

function CertificateView() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertificate = async () => {

      try {
        const response = await api.get(`/certificate/${certId}/`);
        setCertificate(response.data);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };
    fetchCertificate();
  }, [certId]);

// _________________________________________________________________________________________________________________________________

  const getCertificateImage = (title) => {

    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (formatTitle.includes("Coursera")) return courseraImage;
    if (formatTitle.includes("Aws")) return awsImg;
    if (formatTitle.includes("DataCamp")) return datacampImg;
    if (formatTitle.includes("CodeAcadimy")) return codeacadimyImg;
    if (formatTitle.includes("CyperAna")) return cyperAnaImg;
    if (formatTitle.includes("CyperHub")) return cyperhubImg;
    if (formatTitle.includes("Doroob")) return dorobImg;
    if (formatTitle.includes("Edrak")) return edrakImg;
    if (formatTitle.includes("Edx")) return edxImg;
    if (formatTitle.includes("FutureLearn")) return futureLearnImg;
    if (formatTitle.includes("Google Digital")) return googedigitalImg;
    if (formatTitle.includes("Google")) return googleImg;
    if (formatTitle.includes("HubeSpot")) return hopespotImg;
    if (formatTitle.includes("IBM")) return ibmImg;
    if (formatTitle.includes("TechnicalBM")) return technicalBMImg;
    if (formatTitle.includes("TwaiqAcademy")) return twaiqImg;
    if (formatTitle.includes("Python")) return pythonImg;
    if (formatTitle.includes("Udemy")) return udemyImg;

    return datacampImg; // defoult photo for all  new certificates
  };
  
// _________________________________________________________________________________________________________________________________

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificate/");
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
// _________________________________________________________________________________________________________________________________

  //Delete function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate ❗️")) {     // here i added delete confermation to ask you before deleteing

      try {
        await api.delete(`/certificate/${id}/`);
        alert("Certificate Deleted Successfully ✅");
        navigate("/certificate"); 
      
      } catch (error) {
        console.error("Error Deleting Certificate:", error);
        alert("Failed to Delete Certificate!");
      }
    }
  };

  if (!certificate) return <p>Loading...</p>;

  return (
    <div className="main-content">
      <h1>Certificate Details</h1>

      <div className="cards-grid1" style={{ justifyContent: "start" }}>
        <div className="card1">
    
          <img
            src={getCertificateImage(certificate.title)}
            alt={certificate.title}
            style={{ width: "100%", borderRadius: "10px", marginBottom: "2px",}}
              />

          <h2>{certificate.title}</h2>
          <p>Organization: {certificate.organization}</p>
          <p>Date Obtained: {certificate.date_obtained}</p>

          {certificate.file && (
            <p>
              <a
                href={`http://127.0.0.1:8000${certificate.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-viewFile"
                style={{ display: "inline-block", marginTop: "10px" }}
              >
                View File
              </a>
            </p>
          )}

           {/* ____________________________________________________________________________ */}
          <div className="buttons">
            <Link to={`/certificate/${certId}/edit`} className="btn btn-edit">
              Edit
            </Link>
          {/* ____________________________________________________________________________ */}
            <button
              onClick={() => handleDelete(certificate.id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          {/* ____________________________________________________________________________ */}
            <Link to="/certificate" className="btn btn-back">
              Back
            </Link>
          {/* ____________________________________________________________________________ */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateView;
