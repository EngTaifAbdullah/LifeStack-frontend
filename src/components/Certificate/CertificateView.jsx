// src/components/Certificate/CertificateView.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";


// _________________________________________________________________________________________________________

function CertificateView() {

  const { certId } = useParams();
  const [certificate, setCertificate] = useState(null);

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

  if (!certificate) return <p>Loading...</p>;

// ______________________________________________________
  
  return (
    <div className="main-content">

      <h1>{certificate.title}</h1>
      <p>Organization : {certificate.organization}</p>
      <p>Date Obtained : {certificate.date_obtained}</p>
      {certificate.file && (
        <p>
          
          <a
            href={`http://127.0.0.1:8000${certificate.file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload file
          </a>
        </p>
      )}

      <Link to={`/certificate/${certId}/edit`} className="btn btn-edit">
        Edit
      </Link>
      <Link to="/certificate" className="btn btn-back">
       Back
      </Link>
    </div>
  );
}

export default CertificateView;
