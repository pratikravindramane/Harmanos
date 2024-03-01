import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Course() {
  const [course, setCourse] = useState({});
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetch = async () => {
      try {
        const user = await axios.get(
          `http://localhost:3000/course/get/${params.id}`,
          // { CourseId: params.id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (user.data.message) {
          setError(user.data.message);
        } else {
          setCourse(user?.data?.course);
          setLectures(user?.data?.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="course">
      {error && (
        <label className="error-div">
          {error} <button onClick={(e) => setError(false)}>ok</button>
        </label>
      )}
      <div>
        {course && (
          <>
            <div key={course._id} className="courses-card">
              <img
                src={`http://localhost:3000/public/${course.image}`}
                alt=""
                className="course-img"
              />
              <div className="course-content">
                <p>Name: {course.name}</p>
                <p>Level: {course.level}</p>
                <p>Description: {course.description}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/add/lecture/${params.id}`);
                  }}
                  className="mb-3"
                >
                  add
                </button>
              </div>
            </div>
          </>
        )}
        {lectures?.map((l) => {
          return (
            <div key={l._id} className="lecture">
              <p>{l.date}</p>
              <p>{l.instructorId.name}</p>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
}

export default Course;
