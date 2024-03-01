import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home">
        <Link className="home-btns" to={"/instructors"}>
          Instructor
        </Link>
        <Link className="home-btns" to={"/course"}>
          Courses
        </Link>
        <Link className="home-btns" to={"/add/instructor"}>
          Add Instructor
        </Link>
        <Link className="home-btns" to={"/add/course"}>
          Add Courses
        </Link>
      </div>
    </div>
  );
}

export default Home;
