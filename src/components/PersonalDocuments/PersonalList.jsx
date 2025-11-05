
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
import healthImg from "../../assets/health.png";
import recomnd1Img from "../../assets/recomnd1.png";
import driverImg from "../../assets/driver.png";
import transImg from "../../assets/trans.png";


// _________________________________________________________________________________________________________

function PersonalList() {

  const [personal, setPersonal] = useState([]);

  useEffect(() => {
    fetchPersonal();
  }, []);


  const fetchPersonal = async () => {
    try {
      const response = await api.get("/personal/");     //send GET request to the /personal/ address in Django.
      setPersonal(response.data);                      //when successful request, the incoming data is saved in the personal folder.
    } catch (error) {
      console.error("Error fetching Personal Document:", error);   // or if an error printe this error in the console.
    }
  };
// _________________________________________________________________________________________________________________________________

// All static images 

  const getPersonalImage = (title) => {     

    const formatTitle = title.charAt(0).toUpperCase() + title.slice(1);   // this function receives the document title like Passport..It capitalizes the first letter.
                                                                            
    if (formatTitle.includes("Identty")) return identtyImg;              // then checks if the title includes certain keywords.
    if (formatTitle.includes("Graduation")) return gradImg;             // depending on the title, it returns the right image.
    if (formatTitle.includes("My Resume")) return cvImg;
    if (formatTitle.includes("Passport")) return passImg;
    if (formatTitle.includes("Health")) return healthImg;
    if (formatTitle.includes("Recommendation")) return recomnd1Img;
    if (formatTitle.includes("Drivers")) return driverImg;
    if (formatTitle.includes("Academic")) return transImg;


    return identtyImg; // otherwise if no match is found, it returns the (identtyImg) as the default.
  };

// _________________________________________________________________________________________________________________________________

  const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this Document ❓")) {   // when the user clicks delete a confirmation message appears
      try {
        await api.delete(`/personal/${id}/`);     //if you confirm that! the app sends a DELETE request to the backend.
        fetchPersonal();                         //to refresh the list after deleting
      } catch (error) {
        console.error("Error Deleting Document:", error);  // or if an error printe this error in the console.
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
         <Link to="/personal/new" className="add-btn">Add Personal Document</Link>
      </div>


      {personal.length === 0 ? (
        <p className="text-gray-500 text-center mt-10"> There are no personal yet </p>
      ) : (


        <div className="cards-grid">
          {personal.map((doc) => (
            <div key={doc.id} className="card">

              <img src={getPersonalImage(doc.title)}
                alt={doc.title} style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "2px",
                }}/>

              <h2>{doc.title}</h2>

             {/* ____________________________________________________________________________ */}

              <div className="buttons">
                <Link to={`/personal/${doc.id}`} className="btn btn-view">View</Link>
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
// _________________________________________________________________________________________________________________________________