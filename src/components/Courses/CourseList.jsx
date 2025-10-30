import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function CourseList() {

  const [courses, setCourses] = useState([]);

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
    if (window.confirm("Are you sure you want to delete this course?")) {

      try {
        await api.delete(`/courses/${id}/`);
        fetchCourses();

      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

//   _________________________________________________________________________________________________________________________________

  return (
    <div className="main-content">
      <div className="main-header">
        <h1>🎯 All Future Gols </h1>
      </div>


      <div>
        <Link to="/courses/new" className="add-btn">
          Add New Gole
        </Link>
      </div>


      {courses.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          There are no courses yet.
        </p>
      ) : (
        <div className="cards-grid3">
          {courses.map((course) => (

            <div key={course.id} className="card">

              <h1>{course.title}</h1>
              <p className="description">{course.description}</p>
              <p className="category">
              <p><strong>Category:</strong> {course.category?.category_type || course.category || "—"}</p>
              </p>


              <div className="buttons">
                <Link to={`/courses/${course.id}`} className="btn btn-view">
                  View
                </Link>


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
