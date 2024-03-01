import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { validate } from "../utils/ValidateInputs";
function AddInstructor() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const insertData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (Object.keys(validate(data)).length > 0) {
      return setError(validate(data));
    } else {
      setError({});
      try {
        const response = await axios.post(
          "http://localhost:3000/instructor/register",
          data
        );
        if (response.data.message) {
          setServerError(response.data.message);
        } else {
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="add-ins">
      <form onSubmit={submitHandler} className="add-ins-form">
        <h1>Add Instructor</h1>
        {serverError && (
          <label className="error-div">
            {serverError}{" "}
            <button onClick={(e) => setServerError(false)}>ok</button>
          </label>
        )}
        {success && (
          <label className="success-div">
            Added Instructor Successfully{" "}
            <button
              onClick={(e) => {
                setSuccess(false);
                navigate("/instructors");
              }}
            >
              ok
            </button>
          </label>
        )}
        <div className="input-grp">
          <input
            type="text"
            placeholder="Name"
            id="name"
            onChange={(e) => insertData(e)}
            className={error.name ? "border-red" : ""}
          />
          {error.name && <label className="error">{error.name}</label>}
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={(e) => insertData(e)}
            className={error.email ? "border-red" : ""}
          />
          {error.email && <label className="error">{error.email}</label>}
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            onChange={(e) => insertData(e)}
            minLength={10}
            maxLength={10}
            className={error.phone ? "border-red" : ""}
          />
          {error.phone && <label className="error">{error.phone}</label>}
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={(e) => insertData(e)}
            className={error.password ? "border-red" : ""}
          />
          {error.password && <label className="error">{error.password}</label>}
        </div>
        <div className="btn-grp">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddInstructor;
