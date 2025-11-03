import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";
import { motion } from "framer-motion";  //library from botstrap

// _____________________________________________________________________________________________________________________________________________________________

function CertificateForm() {

  const navigate = useNavigate();
  const { certId } = useParams();

  const [formData, setFormData] = useState({

    title: "",
    organization: "",
    date_obtained: "",
    file: null,});


  const [fileName, setFileName] = useState("");
  const [existingFileUrl, setExistingFileUrl] = useState("");       // To save the linke for previos file


  useEffect(() => {
    if (certId) {
      getCertificate();
    }
  }, [certId]);

// _____________________________________________________________________________________________________________________________________________________________

  const getCertificate = async () => {


    try {
      const response = await api.get(`/certificate/${certId}/`);
      setFormData({

        title: response.data.title,
        organization: response.data.organization,
        date_obtained: response.data.date_obtained,
        file: null, 
      });

      setFileName(response.data.file ? response.data.file.split("/").pop() : "");   //upload file function
      setExistingFileUrl(response.data.file || ""); 
      
    } catch (error) {
      console.error("Error fetching certificate:", error);
    }
  };

  // _____________________________________________________________________________________________________________________________________________________________

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
      setFileName(files[0]?.name || "");


    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  // _____________________________________________________________________________________________________________________________________________________________
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("title", formData.title);
    data.append("organization", formData.organization);
    data.append("date_obtained", formData.date_obtained);
    data.append("user", 1); // to pass the user id


    // if the user want to update the privios file do it ! if not..dont do anything
    
    if (formData.file) {
      data.append("file", formData.file);}

    try {
      if (certId) {
        await api.put(`/certificate/${certId}/`, data, {     //  edite certificate
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Certificate has Edit Successfully ✅");  // alert message
      } 
      

      else {
        await api.post("/certificate/", data, {           // to add new certificate
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Certificate has Added Successfully ✅"); // alert message
      }


      navigate("/certificate");
    } catch (error) {
      console.error("Error saving certificate:", error.response?.data || error);
      alert("Oops! something wrong");
    }
  };
  // _____________________________________________________________________________________________________________________________________________________________
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="container my-5"> 

{/* _________________________________________________________________ */}

      <div className="card shadow-sm border-0 mx-auto" style={{maxWidth:900}}>
        <div className="card-body">
          <h1 className="mb-4">{certId ? "Update Certificate" : "Add New Certificate "}</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Certificate Title</label>
              <input type="text" name="title"className="form-control"
                value={formData.title} onChange={handleChange} required/>
            </div>
{/* _________________________________________________________________ */}

            <div className="mb-3">
              <label className="form-label">Organization</label>
              <input type="text" name="organization" className="form-control"
                value={formData.organization} onChange={handleChange} required/>
            </div>
{/* _________________________________________________________________ */}

            <div className="mb-3">
              <label className="form-label">Date Obtained</label>
              <input type="date" name="date_obtained" className="form-control"
                value={formData.date_obtained} onChange={handleChange} required/>
            </div>
{/* _________________________________________________________________ */}

            <div className="mb-3">
              <label className="form-label">Upload File</label>
              <input type="file" name="file" className="form-control" onChange={handleChange} />

{/* _________________________________________________________________ */}

              {/* To viwe privios file you updated*/}
              
              {fileName && !formData.file && (
                <p className="mt-2"> Current File :{" "}
                  <a href={existingFileUrl} target="_blank" rel="noopener noreferrer">{fileName}</a></p>)}
            </div>
            {formData.file && <p>📁 New File: {formData.file.name}</p>}

{/* _________________________________________________________________ */}

            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                {certId ? "Edit" : "Add"}
              </button>
              <Link to="/certificate" className="btn btn-link ms-3">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
export default CertificateForm;
// _____________________________________________________________________________________________________________________________________________________________