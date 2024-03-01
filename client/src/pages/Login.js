import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginValidate } from "../utils/ValidateInputs";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [serverError, setServerError] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const insertData = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (Object.keys(loginValidate(data)).length > 0) {
        return setError(loginValidate(data));
      }
      const response = await axios.post(
        "http://localhost:3000/instructor/login",
        data
      );
      if (response.data.message) {
        setServerError(response.data.message);
      } else {
        login();
        if (response.data.isAdmin) {
          navigate(`/home`);
        } else {
          navigate(`/instructor/${response.data._id}`);
        }
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className="login-div">
        {serverError && (
          <label className="error-div">
            {serverError}{" "}
            <button onClick={(e) => setServerError(false)}>ok</button>
          </label>
        )}
        <form onSubmit={submitHandler}>
          <h1>Login</h1>
          <div className="input-grp">
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => insertData(e)}
              className={error.email ? "border-red" : ""}
            />
            {error.email && <label className="error">{error.email}</label>}
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={(e) => insertData(e)}
              className={error.password ? "border-red" : ""}
            />
            {error.password && (
              <label className="error">{error.password}</label>
            )}
          </div>
          <div className="btn-grp">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
