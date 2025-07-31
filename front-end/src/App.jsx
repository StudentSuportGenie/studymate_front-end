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
import DateReminder from "./pages/StudentComponent/DateReminder";
import ViewAddedDatereminder from "./pages/StudentComponent/ViewAddedDatereminder";
import KnowdgleItemAdded from "./pages/AdminComponenet/KnowdgleItemAdded";
import AdminSidebartab from "./components/AdminSidebartab";
import ViewKnowdgleItems from "./pages/AdminComponenet/ViewKnowdgleItems";
import NotificationIcon from "./components/NotifacitionCom";
import StudentHelper from "./pages/StudentHelper";
import DashbordSIDE from "./pages/Sidbarpages/Dashbord";
import PDFScannCom from "./components/PDFScannCom";
import AllDateReminders from "./pages/AdminComponenet/AllDateReminders";

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
        <Route path="/DateReminder" element={<DateReminder />} />
        <Route
          path="/ViewAddedDatereminder"
          element={<ViewAddedDatereminder />}
        />
        <Route path="/KnowdgleItemAdded" element={<KnowdgleItemAdded />} />
        <Route path="/AdminSidebartab" element={<AdminSidebartab />} />
        <Route path="/ViewKnowdgleItems" element={<ViewKnowdgleItems />} />
        {/* <Route path="/auth" element={<AuthHeader />} /> */}
        <Route path="/StudentHelper" element={<StudentHelper />} />
        <Route path="/DashbordSIDE" element={<DashbordSIDE />} />
        <Route path="/PDFScannCom" element={<PDFScannCom />} />
        <Route path="/NotificationIcon" element={<NotificationIcon />} />
        <Route path="/AllDateReminders" element={<AllDateReminders />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
