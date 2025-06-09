import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LoginButton from "./pages/LoginButton";
import ProfieSettings from "./pages/ProfieSettings";
import StudentHome from "./pages/StudentHome";
import DetailsAddForm from "./pages/StudentComponent/DetailsAddForm";
import DetailsEditForm from "./pages/StudentComponent/DetailsEditForm";
import AdminHome from "./pages/AdminHome";
import ViewAllStudents from "./pages/AdminComponenet/ViewAllStudents";
import LogoutFunction from "./components/LogoutFunction";
import StudentSidetab from "./components/StudentSidetab";
import TimeScheduleAdded from "./pages/StudentComponent/TimeScheduleAdded";
import ViewAddedSchedule from "./pages/StudentComponent/ViewAddedSchedule";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loginbutton" element={<LoginButton />} />
        <Route path="/ProfieSettings" element={<ProfieSettings />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/DetailsAddForm" element={<DetailsAddForm />} />
        <Route path="/DetailsEditForm" element={<DetailsEditForm />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/ViewAllStudents" element={<ViewAllStudents />} />
        <Route path="/LogoutFunction" element={<LogoutFunction />} />
        <Route path="/StudentSidetab" element={<StudentSidetab />} />
        <Route path="/TimeScheduleAdded" element={<TimeScheduleAdded />} />
        <Route path="/ViewAddedSchedule" element={<ViewAddedSchedule />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
