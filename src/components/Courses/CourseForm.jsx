import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";



function CourseForm() {

  const navigate = useNavigate();
  const { courseId } = useParams();

// All required fileds
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchCategories();
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);


  // Get categories from backend
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
      setCategory(course.category?.id || ""); //by id
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };


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
        alert("Gols Updated Successfully ✅");
      } else {

        await api.post("/courses/", newCourse);
      }
      navigate("/courses");
    } catch (error) {
      console.error("Error saving course:", error.response?.data || error);
      alert("Error Saving Goles ");
    }
  };

export default CourseForm;
