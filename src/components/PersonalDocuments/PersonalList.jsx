
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

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
      console.error("Error fetching personal:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this personal?")) {
      try {
        await api.delete(`/personal/${id}/`);
        fetchPersonal();
      } catch (error) {
        console.error("Error deleting personal:", error);
      }
    }
  };

  // _________________________________________________________________________________________________________

  return (
    <div className="main-content">

      <div className="main-header">
        <h1>All personal</h1>
      </div>


      <div>
         <Link to="/personal/new" className="add-btn">
          Add New DOC
        </Link>
      </div>


      {personal.length === 0 ? (
        <p className="text-gray-500 text-center mt-10"> There are no personal yet </p>
      ) : (


        <div className="cards-grid">
          {personal.map((doc) => (
            <div key={doc.id} className="card">
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

