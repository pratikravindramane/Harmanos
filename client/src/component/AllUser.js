import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AllUser() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetch = async () => {
      try {
        const user = await axios.get(
          `https://harmanos.onrender.com/user/get-all`,
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

  const navigateHandler = (e) => {
    e.preventDefault();
    navigate(`/report/${e.target.id}`);
  };

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");
    try {
      const logout = await axios.get(
        `https://harmanos.onrender.com/user/logout/${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (logout.data.message) {
        setError(logout.data.message);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box users">
      {error && (
        <label className="error-div">
          {error} <button onClick={(e) => setError(false)}>ok</button>
        </label>
      )}
      <div className="user-grp">
        {users.map((element) => {
          return (
            <>
              <div
                type="button"
                onClick={(e) => navigateHandler(e)}
                id={element._id}
                className="user"
              >
                {element.name}
              </div>
            </>
          );
        })}
      </div>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default AllUser;
