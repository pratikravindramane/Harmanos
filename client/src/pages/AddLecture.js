import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { courseValidate, lectureValidation } from "../utils/ValidateInputs";

function AddLecture() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});
  const params = useParams();
  const [data, setData] = useState({});
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const insertData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(lectureValidation(data)).length > 0) {
      return setError(lectureValidation(data));
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://harmanos.onrender.com/course/lecture/add/${params.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="add-lectures">
      <form onSubmit={submitHandler}>
        {serverError && (
          <label className="error-div">
            {serverError}
            <button onClick={(e) => setServerError(false)}>ok</button>
          </label>
        )}
        {success && (
          <label className="success-div">
            Added Successfully
            <button
              onClick={(e) => {
                setSuccess(false);
                goBack();
              }}
            >
              ok
            </button>
          </label>
        )}
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" onChange={(e) => insertData(e)} />
          {error.date && <label className="error">{error.date}</label>}
        </div>
        <div>
          <label htmlFor="instructorId">Instructor</label>
          <select
            name="instructorId"
            id="instructorId"
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

export default AddLecture;
