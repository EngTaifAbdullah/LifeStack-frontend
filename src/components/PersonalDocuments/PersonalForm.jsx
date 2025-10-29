import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function PersonalForm() {

  const navigate = useNavigate();
  const { docId } = useParams();

  const [formData, setFormData] = useState({

    title: "",
    file: null,

  });

  const [fileName, setFileName] = useState("");
  const [existingFileUrl, setExistingFileUrl] = useState("");       // To save the linke for previos file

  useEffect(() => {
    if (docId) {
      getPersonal();
    }
  }, [docId]);

// _________________________________________________________________________________________________________________________________

  const getPersonal = async () => {


    try {
      const response = await api.get(`/personal/${docId}/`);
      setFormData({

        title: response.data.title,
        file: null, 
      });

      setFileName(response.data.file ? response.data.file.split("/").pop() : "");
      setExistingFileUrl(response.data.file || ""); 
      
    } catch (error) {
      console.error("Error fetching Personal Documents:", error);
    }
  };

  // _________________________________________________________________________________________________________________________________

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
      setFileName(files[0]?.name || "");


    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // _________________________________________________________________________________________________________
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("user", 1); // to pass the user id

    // if the user want to update the privios file do it ! if not..dont do anything

    if (formData.file) {
      data.append("file", formData.file);
    }

    try {

      if (docId) {
      
        await api.put(`/personal/${docId}/`, data, {     //  edite personal doc
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Personal has Edit Successfully ✅");  //message
      } 
      
      else {

        await api.post("/personal/", data, {      // to add new certificate
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("personal has Added Successfully ✅");
      }


      navigate("/personal");
    } catch (error) {
      console.error("Error saving personal:", error.response?.data || error);
      alert("Oops! something wrong");
    }
  };

  // _________________________________________________________________________________________________________
  
  return (
    <div className="main-content">
      <div className="form-container">
        <h1>{docId ? "Update Certificate" : "Add New Certificate "}</h1>



        <form onSubmit={handleSubmit}>
          <label>personal Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />



          {/* <label>Organization</label>
          <input
            type="text"
            name="organization"
            value={formData.organization}
            onChange={handleChange}
            required
          /> */}



          {/* <label>Date Obtained</label>
          <input
            type="date"
            name="date_obtained"
            value={formData.date_obtained}
            onChange={handleChange}
            required
          /> */}



          <label>Upload File</label>
          <input type="file" name="file" onChange={handleChange} />
          
          {/* To viwe privios file you updated*/}
          
          {fileName && !formData.file && (
            <p>
               Current File :{" "}
              <a href={existingFileUrl} target="_blank" rel="noopener noreferrer">
                {fileName}
              </a>
            </p>
          )}



     
          {formData.file && <p>📁 New File: {formData.file.name}</p>}

          <button type="submit">{docId ? "Edit" : "Add"}</button>
        </form>
      </div>
    </div>
  );
}

export default PersonalForm;
