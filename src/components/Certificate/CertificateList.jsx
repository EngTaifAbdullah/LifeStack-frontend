import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";
// _________________________________________________________________________________________________________________________________

// All Certificate I want to import it

import courseraImage from "../../assets/coursera.png";
import futureLearnImg from "../../assets/futureLearn.png";
import awsImg from "../../assets/aws.png";
import datacampImg from "../../assets/datacamp.png";
import codeacadimyImg from "../../assets/codeacadimy.png";
import cyperAnaImg from "../../assets/cyperAna.png";
import cyperhubImg from "../../assets/cyperhub.png";
import dorobImg from "../../assets/dorob.png";
import edrakImg from "../../assets/edrak.png";
import edxImg from "../../assets/edx.png";
import googedigitalImg from "../../assets/googedigital.png";
import googleImg from "../../assets/google.png";
import hopespotImg from "../../assets/hopespot.png";
import ibmImg from "../../assets/ibm.png";
import technicalBMImg from "../../assets/technicalBM.png";
import twaiqImg from "../../assets/twaiq.png";
import pythonImg from "../../assets/python.png";
import udemyImg from "../../assets/udemy.png";
import SDAyImg from "../../assets/SDA.png";

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
    if (formatTitle.includes("FutureLearn")) return futureLearnImg;
    if (formatTitle.includes("AWS")) return awsImg;
    if (formatTitle.includes("DataCamp")) return datacampImg;
    if (formatTitle.includes("CodeAcadimy")) return codeacadimyImg;
    if (formatTitle.includes("CyperAna")) return cyperAnaImg;
    if (formatTitle.includes("CyperHub")) return cyperhubImg;
    if (formatTitle.includes("Doroob")) return dorobImg;
    if (formatTitle.includes("Edrak")) return edrakImg;
    if (formatTitle.includes("Edx")) return edxImg;
    if (formatTitle.includes("Google Digital")) return googedigitalImg;
    if (formatTitle.includes("Google")) return googleImg;
    if (formatTitle.includes("HubeSpot")) return hopespotImg;
    if (formatTitle.includes("IBM")) return ibmImg;
    if (formatTitle.includes("TechnicalBM")) return technicalBMImg;
    if (formatTitle.includes("TwaiqAcademy")) return twaiqImg;
    if (formatTitle.includes("Python")) return pythonImg;
    if (formatTitle.includes("Udemy")) return udemyImg;
    if (formatTitle.includes("Software")) return SDAyImg;

    return ibmImg; // Generate default photo for all new certificates
  };

  const fetchCertificates = async () => {
    try {
      const response = await api.get("/certificate/");
      setCertificates(response.data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
  };
// _________________________________________________________________________________________________________________________________

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      try {
        await api.delete(`/certificate/${id}/`);
        fetchCertificates();
      } catch (error) {
        console.error("Error deleting certificate:", error);}}
  };
// _________________________________________________________________________________________________________________________________

  return (
    <div className="main-content">
      <div className="main-header"><h1>My Achievements </h1></div>

      <div>
        <Link to="/certificate/new" className="add-btn">Add New Certificate</Link>
      </div>
{/* _________________________________________________________________ */}

      {certificates.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
           There are no Certificates yet</p>
      ) : (
        <div className="cards-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="card">
{/* _________________________________________________________________ */}

              {/* Image container to make images square */}
              <div className="card-image-container" style={{
                  width: "230px", height: "230px",
                  margin: "0 auto", overflow: "hidden",
                  borderRadius: "10px",}}>

                <img src={getCertificateImage(cert.title)} alt={cert.title}
                  style={{ width: "100%", height: "100%",}}/>
              </div>
{/* _________________________________________________________________ */}

              <h2>{cert.title}</h2>
              <p>Organization: {cert.organization}</p>
              <p>Date Obtained: {cert.date_obtained}</p>

              <div className="buttons">
                <Link to={`/certificate/${cert.id}`} className="btn btn-view">View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificateList;
// _________________________________________________________________________________________________________________________________