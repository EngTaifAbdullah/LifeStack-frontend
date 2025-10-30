import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

// _________________________________________________________________________________________________________________________________

// All Certificate I want to import it

import identtyImg from "../../assets/identty.png";
import gradImg from "../../assets/grad.png";
import cvImg from "../../assets/cv.png";
import passImg from "../../assets/pass.png";

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
        console.error("Error fetching Personal Document:", error);
      }
    };
    fetchPersonal();
  }, [docId]);

// _________________________________________________________________________________________________________________________________

  const getPersonalImage = (title) => {

    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (formatTitle.includes("Identty")) return identtyImg;
    if (formatTitle.includes("Graduation")) return gradImg;
    if (formatTitle.includes("My Resume")) return cvImg;
    if (formatTitle.includes("Passport")) return passImg;


    return identtyImg; // you must be gangeit taif !
  };
// _________________________________________________________________________________________________________________________________

  //Delete function

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Documents ❓")) {     // here i added delete confermation to ask you before deleteing

      try {
        await api.delete(`/personal/${id}/`);
        alert("Document Deleted Successfully ✅");
        navigate("/personal"); 
      
      } catch (error) {
        console.error("Error Deleting Document:", error);
        alert("Failed to Delete Document!");
      }
    }
  };

  if (!personal) return <p>Loading...</p>;

  return (
    <div className="main-content">
      <h1>Personal Documents Details</h1>

      <div className="cards-grid1" style={{ justifyContent: "start" }}>
        <div className="card1">

              <img
                src={getPersonalImage(personal.title)}
                alt={personal.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "2px",
                }}
              />
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
