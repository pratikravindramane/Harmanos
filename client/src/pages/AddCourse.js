import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { courseValidate } from "../utils/ValidateInputs";

function AddCourse() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetch = async () => {
      try {
        const user = await axios.get(
          `https://harmanos.onrender.com/instructor/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (user.data.message) {
          setServerError(user.data.message);
        } else {
          setUsers(user?.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  const insertData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(courseValidate(data)).length > 0) {
      return setError(courseValidate(data));
    }
    const formData = new FormData();
    const { name, level, description, date, instructor } = data;
    formData.append("name", name);
    formData.append("level", level);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("instructorId", instructor);
    formData.append("image", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://harmanos.onrender.com/course/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {}
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="add-course">
      {serverError && (
        <label className="error-div">
          {serverError}{" "}
          <button onClick={(e) => setServerError(false)}>ok</button>
        </label>
      )}
      {success && (
        <label className="success-div">
          Added Successfully
          <button
            onClick={(e) => {
              setSuccess(false);
              navigate("/course");
            }}
          >
            ok
          </button>
        </label>
      )}
      <form onSubmit={submitHandler}>
        <div className="input-lable">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={(e) => insertData(e)} />
          {error.name && <label className="error">{error.name}</label>}
        </div>
        <div className="input-lable">
          <label htmlFor="level">Level</label>
          <input type="number" id="level" onChange={(e) => insertData(e)} />
          {error.level && <label className="error">{error.level}</label>}
        </div>
        <div className="input-lable">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" onChange={(e) => insertData(e)} />
          {error.description && (
            <label className="error">{error.description}</label>
          )}
        </div>
        <div className="input-lable">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" onChange={handleFileChange} />
          {error.image && <label className="error">{error.image}</label>}
        </div>
        <div className="input-lable">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" onChange={(e) => insertData(e)} />
          {error.date && <label className="error">{error.date}</label>}
        </div>
        <div className="input-lable">
          <label htmlFor="instructor">Instructor</label>
          <select
            name="instructor"
            id="instructor"
            onChange={(e) => insertData(e)}
          >
            <option value="0" defaultValue={0}>
              Select Instructor
            </option>
            {users?.map((i) => {
              return (
                <option key={i._id} value={i._id}>
                  {i.name}
                </option>
              );
            })}
          </select>
          {error.instructor && (
            <label className="error">{error.instructor}</label>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddCourse;
