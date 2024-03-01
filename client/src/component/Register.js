import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import { validate } from "../utils/ValidateInputs";
function Register() {
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
          "http://localhost:3000/user/register",
          data
        );
        if (response.data.message) {
          console.log("error");
          setServerError(response.data.message);
        } else {
          setSuccess(true);
          //   navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="box">
      <form onSubmit={submitHandler}>
        <h1>Register</h1>
        {serverError && (
          <label className="error-div">
            {serverError}{" "}
            <button onClick={(e) => setServerError(false)}>ok</button>
          </label>
        )}
        {success && (
          <label className="success-div">
            Registered Successfully{" "}
            <button
              onClick={(e) => {
                setSuccess(false);
                navigate("/login");
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
          <Link to={"/login"}>Login</Link>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
