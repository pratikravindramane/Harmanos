import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Header() {
  const [time, setTime] = useState(new Date());
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Update the time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means useEffect runs only once when the component mounts

  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="header py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-12 d-flex justify-content-between top-header align-items-center text-white fs-7 pb-3">
            <p className="mb-0">{time.toLocaleDateString()}</p>
            <p className="mb-0">{formattedTime}</p>
          </div>
        </div>
        {isLoggedIn && (
          <div className="row">
            <div className="col-12 d-flex justify-content-around align-items-center text-white fs-7 mt-3 bottom-header">
              <>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
}

export default Header;
