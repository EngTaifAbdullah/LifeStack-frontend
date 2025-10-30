import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function CourseList() {

  const [courses, setCourses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");   //Add filter to filltring the future list 


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

  // ______________________________________

  const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this Goal ❓")) {

      try {
        await api.delete(`/courses/${id}/`);
        fetchCourses();
        
      } catch (error) {
        console.error("Error Deleting Goal:", error);
      }
    }
  };

  // ______________________________________

  // to filtring by catogery
  const filteredCourses = filterCategory === "All"
    ? courses
    : courses.filter(course => course.category_name === filterCategory);

  // _________________________________________________________________________________________________________________________________

  return (

    <div className="main-content">
      <div className="main-header">
        <h1>🎯 All Future Goals</h1>


        <div className="filter-container">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            <option value="TASK">Task</option>
            <option value="COURSE">Course</option>
            <option value="EXAM">Exam</option>
          </select>
        </div>
      </div>


      <div>
        <Link to="/courses/new" className="add-btn">
          Add New Goal
        </Link>
      </div>

      {filteredCourses.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          There are no courses for this category.
        </p>
      ) : (
        <div className="cards-grid3">
          {filteredCourses.map((course) => (

            <div key={course.id} className="card">
              <h1>{course.title}</h1>

              <p className="description">{course.description}</p>
              <p className="category">
                
                <strong>Category:</strong> {course.category_name || "—"}
              </p>

              <div className="buttons">
                <Link to={`/courses/${course.id}/edit`} className="btn btn-edit">
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(course.id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;

