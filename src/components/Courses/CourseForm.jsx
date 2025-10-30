import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function CourseForm() {

  const navigate = useNavigate();
  const { courseId } = useParams();

// All required fileds
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");   //i put it this filed it sis not require
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

// _________________________________________________________

  useEffect(() => {
    fetchCategories();
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);


  // Get categories from backend to display it as dropdowen list
  const fetchCategories = async () => {

    try {
      const response = await api.get("/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  // Fetch existing course data if editing
  const fetchCourse = async () => {

    try {
      const response = await api.get(`/courses/${courseId}/`);
      const course = response.data;

      setTitle(course.title);
      setProvider(course.provider);
      setDescription(course.description);
      setCategory(course.category?.id || ""); // by id

    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

// _________________________________________________________

  // to submit nwe form (create or update)
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
      alert("Error Saving Goles ");
    }
  };
// _________________________________________________________

  return (
    
    <div className="main-content">
      <div className="form-container">
        <h1>{courseId ? "Edit Course" : "Add New Course"}</h1>

        <form onSubmit={handleSubmit} className="form-card">
          <label>Goal Title</label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* i remove (required) so this feled it is optional */}
          <label>Provider</label>
          <input
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />


          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          {/* as dropdown list */}
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_type}
              </option>
            ))}
          </select>

          <button type="submit" className="btn btn-save">
            {courseId ? "Update Course" : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseForm;
