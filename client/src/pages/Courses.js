import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetch = async () => {
      try {
        const user = await axios.get(`http://localhost:3000/course/get-all`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (user.data.message) {
          setError(user.data.message);
        } else {
          setUsers(user?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="courses">
      {error && (
        <label className="error-div">
          {error} <button onClick={(e) => setError(false)}>ok</button>
        </label>
      )}
      <div className="courses-div">
        {users?.map((i) => (
          <div key={i._id} className="courses-card">
            <img
              src={`http://localhost:3000/public/${i.image}`}
              alt=""
              className="course-img"
            />
            <div className="course-content">
              <p>{i.name}</p>
              <p>{i.level}</p>
              <p>{i.description}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/course/${i._id}`);
                }}
              >
                view
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
