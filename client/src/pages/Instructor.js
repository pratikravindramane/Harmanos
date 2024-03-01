import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Instructor() {
  const [users, setUsers] = useState({});
  const [lectures, setLectures] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetch = async () => {
      try {
        const user = await axios.get(
          `http://localhost:3000/instructor/ins/${params.id}`,
          // { InstructorId: params.id },
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
          setUsers(user?.data?.instructor);
          setLectures(user?.data?.lectures);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  return (
    <div className="instructor">
      {error && (
        <label className="error-div">
          {error} <button onClick={(e) => setError(false)}>ok</button>
        </label>
      )}
      <div>
        {users && (
          <div className="">
            <div key={users._id}>
              <p>Name: {users.name}</p>
              <p>Email: {users.email}</p>
              <p>Phone: {users.phone}</p>
            </div>
          </div>
        )}
        <hr />
        <h4>lectures:</h4>
        {lectures &&
          lectures?.map((l) => {
            return (
              <div key={l._id} className="lecture">
                <p> {l.course.name}</p>
                <p>{l.date}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Instructor;
