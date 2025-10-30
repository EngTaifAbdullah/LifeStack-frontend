
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";
// _________________________________________________________________________________________________________________________________

// All Personal Document I want to import it 

import identtyImg from "../../assets/identty.png";
import gradImg from "../../assets/grad.png";
import cvImg from "../../assets/cv.png";
import passImg from "../../assets/pass.png";

// _________________________________________________________________________________________________________

function PersonalList() {

  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    fetchPersonal();
  }, []);


  const fetchPersonal = async () => {
    try {
      const response = await api.get("/personal/");
      setPersonal(response.data);
    } catch (error) {
      console.error("Error fetching Personal Document:", error);
    }
  };

// _________________________________________________________________________________________________________________________________

// static images 

  const getPersonalImage = (title) => {

    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);

    if (formatTitle.includes("Identty")) return identtyImg;
    if (formatTitle.includes("Graduation")) return gradImg;
    if (formatTitle.includes("My Resume")) return cvImg;
    if (formatTitle.includes("Passport")) return passImg;


    return identtyImg; // you must be gangeit taif !
  };

// _________________________________________________________________________________________________________________________________

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Document ❓")) {
      try {
        await api.delete(`/personal/${id}/`);
        fetchPersonal();
      } catch (error) {
        console.error("Error Deleting Document:", error);
      }
    }
  };
  // _________________________________________________________________________________________________________

  return (
    <div className="main-content">

      <div className="main-header">
        <h1>My Personal Documents</h1>
      </div>


      <div>
         <Link to="/personal/new" className="add-btn">
          Add Personal Document
        </Link>
      </div>


      {personal.length === 0 ? (
        <p className="text-gray-500 text-center mt-10"> There are no personal yet </p>
      ) : (


        <div className="cards-grid">
          {personal.map((doc) => (
            <div key={doc.id} className="card">

              <img
                src={getPersonalImage(doc.title)}
                alt={doc.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "2px",
                }}
              />

              <h2>{doc.title}</h2>

             {/* ____________________________________________________________________________ */}

              <div className="buttons">
                <Link to={`/personal/${doc.id}`} className="btn btn-view">
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

export default PersonalList;

