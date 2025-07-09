import React, { useEffect, useState } from "react";
import ViewAllStudents from "../AdminComponenet/ViewAllStudents";
import { jwtDecode } from "jwt-decode";
import API from "../../Context/Axiox";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import DetailsAddForm from "../StudentComponent/DetailsAddForm";
import DetailsEditForm from "../StudentComponent/DetailsEditForm";
import StudentSidetab from "../../components/StudentSidetab";
import AdminSidebartab from "../../components/AdminSidebartab";

function Dashbord() {
  const [role, setrole] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("studyBuddy");
    const decode = jwtDecode(token);
    const Role = decode.jobTitle;
    setrole(Role);
  }, []);

  const navigate = useNavigate();

  const [studetails, setstudetails] = useState(null);
  const [name, setname] = useState("");

  const [dataddedform, setdataadded] = useState("none");
  const [dataEditform, setdataeditform] = useState("none");

  useEffect(() => {
    const token = sessionStorage.getItem("studyBuddy");
    if (!token) {
      navigate("/");
    } else {
      const decode = jwtDecode(token);
      const studentname = decode.given_name;
      setname(studentname);
      fetchstudentData();
    }
  }, []);

  const fetchstudentData = async () => {
    try {
      const response = await API.get(`studentDetailUni`);
      setstudetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (studetails) {
      setdataadded("none");
      setdataeditform("block");
    } else {
      setdataadded("block");
      setdataeditform("none");
    }
  }, [studetails]);

  return (
    <>
      {role === "Admin" && (
        <>
          <AdminSidebartab />
          <ViewAllStudents />
        </>
      )}

      {role === "Student" && (
        <>
          <StudentSidetab />
          <Typography align="center" variant="h5" sx={{ mt: "20px" }}>
            Welcome, {name}
          </Typography>

          <Box sx={{ display: dataddedform }}>
            <DetailsAddForm />
          </Box>

          <Box sx={{ display: dataEditform }}>
            <DetailsEditForm studentdetails={studetails} />
          </Box>
        </>
      )}

      {role && role !== "Admin" && role !== "Student" && (
        <p>You do not have permission to view this page.</p>
      )}
    </>
  );
}

export default Dashbord;
