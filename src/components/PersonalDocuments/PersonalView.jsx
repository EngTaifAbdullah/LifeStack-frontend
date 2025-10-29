import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

// _________________________________________________________________________________________________________

function PersonalView() {

  const { docId } = useParams();
  const [personal, setPersonal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonal = async () => {

      try {
        const response = await api.get(`/personal/${docId}/`);
        setPersonal(response.data);
      } catch (error) {
        console.error("Error fetching certificate:", error);
      }
    };
    fetchPersonal();
  }, [docId]);


  //Delete function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate ❗️")) {     // here i added delete confermation to ask you before deleteing

      try {
        await api.delete(`/personal/${id}/`);
        alert("Certificate Deleted Successfully ✅");
        navigate("/personal"); 
      
      } catch (error) {
        console.error("Error Deleting Certificate:", error);
        alert("Failed to Delete Certificate!");
      }
    }
  };

  if (!personal) return <p>Loading...</p>;

  return (
    <div className="main-content">
      <h1>Certificate Details</h1>

      <div className="cards-grid1" style={{ justifyContent: "start" }}>
        <div className="card1">
          <h2>{personal.title}</h2>

          {personal.file && (
            <p>
              <a
                href={`http://127.0.0.1:8000${personal.file}`}
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
            <Link to={`/personal/${docId}/edit`} className="btn btn-edit">
              Edit
            </Link>
          {/* ____________________________________________________________________________ */}
            <button
              onClick={() => handleDelete(personal.id)}
              className="btn btn-delete"
            >
              Delete
            </button>
          {/* ____________________________________________________________________________ */}
            <Link to="/personal" className="btn btn-back">
              Back
            </Link>
          {/* ____________________________________________________________________________ */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalView;
