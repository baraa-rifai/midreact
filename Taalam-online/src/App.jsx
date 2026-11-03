import { HashRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Components/Layout/Header";
import Footer from "./Components/Layout/Footer";
import Messages from "./Components/Common/Messages";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Home from "./Pages/Home";
import MyCourses from "./Pages/MyCourses";
import StudentMessages from "./Pages/StudentMessages";
import AdminLayout from "./Components/Admin/AdminLayout";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ManageInstructors from "./Components/Admin/Manage/ManageInstructors";
import ManageCourses from "./Components/Admin/Manage/ManageCourses";
import AdminRatings from "./Components/Admin/Ratings/AdminRatings";
import InstructorLayout from "./Components/Instructor/Sidebar/InstructorLayout";
import InstructorDashboard from "./Components/Instructor/InstructorDashboard";
import ManageCoursesInstructor from "./Components/Instructor/Manage/ManageCoursesInstructor";
import ManageStudents from "./Components/Instructor/Manage/ManageStudents";
import InstructorRatings from "./Components/Instructor/Ratings/InstructorRatings";

export default function App() {
  return (
    <HashRouter>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Box sx={{ flex: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/student-messages" element={<StudentMessages />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="manage-instructors" element={<ManageInstructors />} />
              <Route path="manage-courses" element={<ManageCourses />} />
              <Route path="ratings" element={<AdminRatings />} />
              <Route path="messages" element={<Messages title="Admin Messages" />} />
            </Route>

            <Route path="/instructor" element={<InstructorLayout />}>
              <Route path="dashboard" element={<InstructorDashboard />} />
              <Route path="manage-courses" element={<ManageCoursesInstructor />} />
              <Route path="manage-students" element={<ManageStudents />} />
              <Route path="ratings" element={<InstructorRatings />} />
              <Route path="messages" element={<Messages title="Student Messages" />} />
              <Route path="admin-messages" element={<Messages title="Admin Messages" />} />
            </Route>
          </Routes>
        </Box>
        <Footer />
      </Box>
    </HashRouter>
  );
}