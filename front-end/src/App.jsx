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

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} /> 
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/loginbutton" element={<LoginButton/>}/>
        <Route path="/ProfieSettings" element={<ProfieSettings/>}/>
        <Route path="/StudentHome" element={<StudentHome/>}/>
      </Routes>
      
      <Footer />
    </Router>
  );
}

export default App;

