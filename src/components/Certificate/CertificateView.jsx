import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

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


  //Delete function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {     // here i added delete confermation to ask you before deleteing

      try {
        await api.delete(`/certificate/${id}/`);
        alert("Certificate deleted successfully!");
        navigate("/certificate"); 
      
      } catch (error) {
        console.error("Error deleting certificate:", error);
        alert("Failed to delete certificate!");
      }
    }
  };

  if (!certificate) return <p>Loading...</p>;

  return (
    <div className="main-content">
      <h1>Certificate Details</h1>

      <div className="cards-grid1" style={{ justifyContent: "start" }}>
        <div className="card1">
          <h2>{certificate.title}</h2>
          <p>Organization: {certificate.organization}</p>
          <p>Date Obtained: {certificate.date_obtained}</p>

          {certificate.file && (
            <p>
              <a
                href={`http://127.0.0.1:8000${certificate.file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-view"
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
            <Link to="/certificate" className="btn btn-delete">
              Back
            </Link>

          {/* ____________________________________________________________________________ */}
            <button
              onClick={() => handleDelete(certificate.id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          {/* ____________________________________________________________________________ */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateView;
