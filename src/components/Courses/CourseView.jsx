
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import "../../App.css";

// _________________________________________________________________________________________________________________________________

function CourseView() {

  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {

      try {
        const res = await api.get(`/courses/${courseId}/`);
        setCourse(res.data);

      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

//   _________________________________________________________________________________________________________________________________

  return (
    <div className="main-content">

      <h1>{course.title}</h1>
      <p><strong>Provider:</strong> {course.provider}</p>
      <p>{course.description}</p>
      <p><strong>Category:</strong> {course.category?.category_type || course.category || "—"}</p>


      <div className="buttons" style={{ marginTop: 16 }}>
        <Link to={`/courses/${course.id}/edit`} className="btn btn-edit">Edit</Link>
        <button className="btn btn-delete" onClick={async () => {
          if (!window.confirm("Delete this course?")) return;
          
          try {
            await api.delete(`/courses/${course.id}/`);
            navigate("/courses");
          } catch (err) {
            console.error(err);
            alert("Delete failed");
          }
        }}>Delete</button>
        <Link to="/courses" className="btn btn-back">Back</Link>
      </div>
    </div>
  );
}

export default CourseView;
