import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Instructors() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetch = async () => {
      try {
        const user = await axios.get(
          `http://localhost:3000/instructor/get-all`,
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
          setUsers(user?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="instructors">
      {error && (
        <label className="error-div">
          {error} <button onClick={(e) => setError(false)}>ok</button>
        </label>
      )}
      {users?.map((i) => (
        <>
          <div key={i._id} className="ins-card">
            <p>Name: {i.name}</p>
            <p>Email: {i.email}</p>
            <p>Phone: {i.phone}</p>
            <hr />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/instructor/${i._id}`);
              }}
            >
              view
            </button>
          </div>
        </>
      ))}
    </div>
  );
}

export default Instructors;
