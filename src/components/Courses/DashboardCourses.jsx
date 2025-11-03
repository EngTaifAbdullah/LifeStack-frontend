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
      <div className="main-header animate__animated animate__fadeIn">
        <h1>🎯 All Future Goals</h1>
      </div>

      <div className="mb-4">
        <Link to="/courses/new" className="btn btn-add animate__animated animate__fadeIn animate__delay-1s">Add New Goal</Link>
      </div>


      {/* Adding Fillter look like Dashboard Filters */}
      <div className="dashboard-cards animate__animated animate__fadeInUp">
        {[
          { label: "ALL", color: "#6366f1", count: courses.length },
          { label: "COURSE", color: "#f59e0b", count: counts.COURSE },
          { label: "EXAM", color: "#ef4444", count: counts.EXAM },
          { label: "TASK", color: "#4caf50", count: counts.TASK },
        ].map((item) => (
          
     // __________________________________________________

          <div
            key={item.label}
            className="card dashboard-card"
            style={{ backgroundColor: item.color, cursor: "pointer" }}
            onClick={() => setSelectedCategory(item.label)}>

            <h2>{item.label}</h2>
            <p>{item.count}</p>
          </div>
        ))}
      </div>

      {/* goals card */}
      <div className="card-grid animate__animated animate__fadeInUp animate__delay-1s">
        {filteredCourses.map((course) => (
          <div key={course.id} className="card">
            <div className="card-image">

            </div>
            <div className="card-content">
              <h1>{course.title}</h1>
              <p>_________________________________</p>


              <p className="card-description">{course.description}</p>
              <p><strong>Category:</strong> {course.category_name || "—"}</p>
            </div>

            <div className="card-actions">
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
// _________________________________________________________________________________________________________________________________