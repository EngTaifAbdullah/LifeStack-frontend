import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";

// _________________________________________________________________________________________________________________________________

// All Certificate Images

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
import SDAyImg from "../../assets/SDA.png";

// _________________________________________________________________________________________________________________________________

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
    if (formatTitle.includes("Software")) return SDAyImg;

    return datacampImg; // default photo for new certificates
  };

// _________________________________________________________________________________________________________________________________

  // Delete function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate ❓")) {
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

  // _________________________________________________________________________________________________________________________________

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Certificate Details</h1>
      <div className="row justify-content-start">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm certificate-card animate-card">


      
            <div className="d-flex justify-content-center align-items-center p-3">
              <img src={getCertificateImage(certificate.title)} //images settings
                alt={certificate.title} className="img-fluid certificate-img"/></div>

  {/* ___________________________________________________________________________________________________ */}

            <div className="card-body">
              <h5 className="card-title">{certificate.title}</h5>
              <p className="card-text"><strong>Organization:</strong> {certificate.organization}</p>
              <p className="card-text"><strong>Date Obtained:</strong> {certificate.date_obtained}</p>

  {/* ___________________________________________________________________________________________________ */}

              {certificate.file && (
                <a href={`http://127.0.0.1:8000${certificate.file}`} target="_blank"
                  rel="noopener noreferrer" className="btn btn-primary btn-sm mb-2 w-100">View File</a>)}

  {/* ___________________________________________________________________________________________________ */}

              <div className="d-flex flex-column gap-2">
                <Link to={`/certificate/${certId}/edit`} className="btn btn-warning btn-sm w-100"> Edit</Link>

                <button onClick={() => handleDelete(certificate.id)} className="btn btn-danger btn-sm w-100">Delete</button>

                <Link to="/certificate" className="btn btn-secondary btn-sm w-100">Back</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  {/* ___________________________________________________________________________________________________ */}

      <style>
        {`
          .certificate-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .certificate-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          }
          .certificate-img {
            width: 290px;
            height: 240px;
            object-fit: cover; /* ensures square image */
            border-radius: 10px;
          }
          .animate-card {
            animation: fadeScaleIn 0.5s ease forwards;
          }
          @keyframes fadeScaleIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
}

export default CertificateView;
// _________________________________________________________________________________________________________________________________
