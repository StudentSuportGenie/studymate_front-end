import React, { useEffect, useState } from "react";
import DetailsAddForm from "./StudentComponent/DetailsAddForm";
import { useNavigate } from "react-router-dom";
import API from "../Context/Axiox";
import { jwtDecode } from "jwt-decode";
import { Typography, Box } from "@mui/material";
import DetailsEditForm from "./StudentComponent/DetailsEditForm";
import StudentSidetab from "../components/StudentSidetab";

function StudentHome() {
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
    <StudentSidetab/>
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
  );
}

export default StudentHome;
