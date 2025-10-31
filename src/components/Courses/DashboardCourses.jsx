import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function DashboardCourses() {

  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {

    try {
      const response = await api.get("/courses/");
      setCourses(response.data);

    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  // ____________________________________________________________________

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Goal ❓")) {

      try {
        await api.delete(`/courses/${id}/`);
        fetchCourses(); 

      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const counts = {
    TASK: courses.filter((c) => c.category_name === "TASK").length,
    COURSE: courses.filter((c) => c.category_name === "COURSE").length,
    EXAM: courses.filter((c) => c.category_name === "EXAM").length,
  };

  const filteredCourses =
    selectedCategory === "ALL"
      ? courses
      : courses.filter((c) => c.category_name === selectedCategory);

  // _________________________________________________________________________________________________________________________________

  return (
    <div className="main-content">
      <div className="main-header">
        <h1>🎯 All Future Goals</h1>
      </div>

      <div>
        <Link to="/courses/new" className="add-btn">Add New Goal</Link>
      </div>

      
      {/* _________________________________________________________________ */}

      {/* filter but look like a dashbord */}
      <div
        className="dashboard-cards"
        style={{ display: "flex", gap: "20px", marginBottom: "20px" }}
      >
      {/* _________________________________________________________________ */}

        <div
          className="card dashboard-card"
          style={{ backgroundColor: "#6366f1", cursor: "pointer" }}
          onClick={() => setSelectedCategory("ALL")}
        >
          <h2>ALL</h2>
          <p>{courses.length}</p>
        </div>

      {/* _________________________________________________________________ */}

        <div
          className="card dashboard-card"
          style={{ backgroundColor: "#f59e0b", cursor: "pointer" }}
          onClick={() => setSelectedCategory("COURSE")}
        >
          <h2>COURSES</h2>
          <p>{counts.COURSE}</p>
        </div>
      {/* _________________________________________________________________ */}

        <div
          className="card dashboard-card"
          style={{ backgroundColor: "#ef4444", cursor: "pointer" }}
          onClick={() => setSelectedCategory("EXAM")}
        >
          <h2>EXAMS</h2>
          <p>{counts.EXAM}</p>
        </div>

      {/* _________________________________________________________________ */}

        <div
          className="card dashboard-card"
          style={{ backgroundColor: "#4caf50", cursor: "pointer" }}
          onClick={() => setSelectedCategory("TASK")}
        >
          <h2>TASKS</h2>
          <p>{counts.TASK}</p>
        </div>
        
      {/* _________________________________________________________________ */}
      </div>

      {/* Filtered all Goals  */}
      <div className="cards-grid3">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">

            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category_name || "—"}</p>

            <div className="buttons">
              <Link to={`/courses/${course.id}/edit`} className="btn btn-edit">Edit</Link>
              <button onClick={() => handleDelete(course.id)} className="btn btn-delete">Delete</button>
            </div>

          </div>
        ))}
        {filteredCourses.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            No Goals found in this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default DashboardCourses;
