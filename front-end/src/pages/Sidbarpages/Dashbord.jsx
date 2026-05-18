import React, { useEffect, useState } from "react";
import ViewAllStudents from "../AdminComponenet/ViewAllStudents";
import { useSelector } from "react-redux";
import API from "../../Context/Axiox";
import { useNavigate } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import DetailsAddForm from "../StudentComponent/DetailsAddForm";
import DetailsEditForm from "../StudentComponent/DetailsEditForm";
import StudentSidetab from "../../components/StudentSidetab";
import AdminSidebartab from "../../components/AdminSidebartab";

function Dashbord() {
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
    <>
      {user?.role === "Admin" && (
        <>
          <AdminSidebartab />
          <ViewAllStudents />
        </>
      )}

      {user?.role === "Student" && (
        <>
          <StudentSidetab />
          <Typography align="center" variant="h5" sx={{ mt: "20px" }}>
            Welcome, {user?.name}
          </Typography>

          <Box sx={{ display: dataddedform }}>
            <DetailsAddForm />
          </Box>

          <Box sx={{ display: dataEditform }}>
            <DetailsEditForm studentdetails={studetails} />
          </Box>
        </>
      )}

      {user?.role && user?.role !== "Admin" && user?.role !== "Student" && (
        <p>You do not have permission to view this page.</p>
      )}
    </>
  );
}

export default Dashbord;

