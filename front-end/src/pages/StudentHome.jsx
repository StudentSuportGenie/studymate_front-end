import React, { useEffect, useState } from "react";
import DetailsAddForm from "./StudentComponent/DetailsAddForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../Context/Axiox";
import { Typography, Box } from "@mui/material";
import DetailsEditForm from "./StudentComponent/DetailsEditForm";
import StudentSidetab from "../components/StudentSidetab";

function StudentHome() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [studetails, setstudetails] = useState(null);

  const [dataddedform, setdataadded] = useState("none");
  const [dataEditform, setdataeditform] = useState("none");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      fetchstudentData();
    }
  }, [isAuthenticated, navigate]);

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
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <StudentSidetab />
      <Typography 
        align="center" 
        variant="h3" 
        sx={{ 
          mt: 4, 
          mb: 4, 
          fontFamily: "Outfit", 
          fontWeight: 800,
          background: "linear-gradient(45deg, #818cf8, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Welcome, {user?.name || "Student"}
      </Typography>

      <Box sx={{ display: dataddedform }}>
        <DetailsAddForm />
      </Box>

      <Box sx={{ display: dataEditform }}>
        <DetailsEditForm studentdetails={studetails} />
      </Box>
    </Box>
  );
}

export default StudentHome;

