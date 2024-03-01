import "./App.css";
import { useAuth } from "./context/AuthContext";
import AddCourse from "./pages/AddCourse";
import AddInstructor from "./pages/AddInstructor";
import AddLecture from "./pages/AddLecture";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Instructor from "./pages/Instructor";
import Instructors from "./pages/Instructors";
import Login from "./pages/Login";
import Layout from "./utils/Layout";
import { Routes, Route } from "react-router-dom";
function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Layout>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Instructor />} />
            <Route path="/course" element={<Courses />} />
            <Route path="/home" element={<Home />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/instructor/:id" element={<Instructor />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/add/course" element={<AddCourse />} />
            <Route path="/add/instructor" element={<AddInstructor />} />
            <Route path="/add/lecture/:id" element={<AddLecture />} />
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default App;
