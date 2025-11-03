import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function CourseForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();


  // All required fields

  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState(""); // optional
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // ____________________________________________________________________________

  useEffect(() => {
    fetchCategories();
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${courseId}/`);
      const course = response.data;

      setTitle(course.title);
      setProvider(course.provider);
      setDescription(course.description);
      setCategory(course.category?.id || "");
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  // ____________________________________________________________________________

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      title,
      provider,
      description,
      category: category ? parseInt(category) : null,
      user: 1,
    };

    try {
      if (courseId) {
        await api.put(`/courses/${courseId}/`, newCourse);
      } else {
        await api.post("/courses/", newCourse);
      }
      navigate("/courses");
    } catch (error) {
      console.error("Error saving Goals:", error.response?.data || error);
      alert("Error Saving Goals");
    }
  };

  // ____________________________________________________________________________

  return (

    <div className="main-content">
      <div className="form-container animate__animated animate__fadeInUp">
        <h1 className="animate__animated animate__fadeIn">{courseId ? "Edit Course" : "Add New Course"}</h1>

        {/* ________________________________________________________________________________________________________________ */}

        <form onSubmit={handleSubmit} className="form-card animate__animated animate__fadeIn animate__delay-1s">
          <label>Goal Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="input-field animate__animated animate__fadeInLeft animate__fast"/>
        {/* ________________________________________________________________________________________________________________ */}

          <label>Provider</label>
          <input type="text" value={provider} onChange={(e) => setProvider(e.target.value)} className="input-field animate__animated animate__fadeInLeft animate__fast animate__delay-1s"/>

          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-field animate__animated animate__fadeInLeft animate__fast animate__delay-2s"/>
        {/* ________________________________________________________________________________________________________________ */}

          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required className="input-field animate__animated animate__fadeInLeft animate__fast animate__delay-3s">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_type}
              </option>
            ))}
          </select>
        {/* ________________________________________________________________________________________________________________ */}

          <button type="submit" className="btn btn-save animate__animated animate__pulse animate__infinite animate__slow">{courseId ? "Update Course" : "Create Course"}</button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
// _________________________________________________________________________________________________________________________________