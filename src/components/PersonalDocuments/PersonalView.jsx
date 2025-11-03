import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";

// _________________________________________________________________________________________________________________________________

// Images i imported for personal documents
import identtyImg from "../../assets/identty.png";
import gradImg from "../../assets/grad.png";
import cvImg from "../../assets/cv.png";
import passImg from "../../assets/pass.png";

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


  const getPersonalImage = (title) => {
    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (formatTitle.includes("Identty")) return identtyImg;
    if (formatTitle.includes("Graduation")) return gradImg;
    if (formatTitle.includes("My Resume")) return cvImg;
    if (formatTitle.includes("Passport")) return passImg;

    return identtyImg; // default image
  };
// _________________________________________________________________________________________________________________________________

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this document ❓")) {
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

// _________________________________________________________________________________________________________________________________

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Personal Document Details</h1>


      <div className="row justify-content-start">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm certificate-card animate-card">


            <div className="d-flex justify-content-center align-items-center p-3">
              <img src={getPersonalImage(personal.title)}
                alt={personal.title} className="img-fluid certificate-img"/></div>


            <div className="card-body">
              <h5 className="card-title">{personal.title}</h5>

              {personal.file && (
                <a href={`http://127.0.0.1:8000${personal.file}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mb-2 w-100">View File</a>)}


              <div className="d-flex flex-column gap-2">
                <Link to={`/personal/${docId}/edit`} className="btn btn-warning btn-sm w-100">Edit</Link>
                <button onClick={() => handleDelete(personal.id)} className="btn btn-danger btn-sm w-100"> Delete</button>
                <Link to="/personal" className="btn btn-secondary btn-sm w-100">Back</Link>

              </div>
            </div>
          </div>
        </div>
      </div>
{/* ______________________________________________________________ */}

      {/* Inline CSS for card animation */}
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
            width: 200px;
            height: 200px;
            object-fit: cover;
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

export default PersonalView;
// _________________________________________________________________________________________________________________________________