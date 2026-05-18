import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";

function ViewAllStudents() {
  const [Studentdetails, setstudentsdetails] = useState([]);

  useEffect(() => {
    fetchstudentDetails();
  }, []);

  const fetchstudentDetails = async () => {
    try {
      const respond = await API.get(`Allstudent`);
      setstudentsdetails(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handeldelete = async (studentDetailsId) => {
    try {
      await API.delete(
        `deletestudent?studentId=${studentDetailsId}`
      );
      alert("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`${error.response.data.message}`);
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  const deleteConformation = (studentDetailsId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      handeldelete(studentDetailsId);
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      <Typography 
        align="center" 
        variant="h4" 
        sx={{ 
          mt: 4, 
          mb: 3, 
          fontFamily: "Outfit", 
          fontWeight: 700,
        }}
      >
        Registered Students 🎓
      </Typography>
      
      <TableContainer className="glass-card" sx={{ overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email Address</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Birthday</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Studentdetails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No students registered yet.
                </TableCell>
              </TableRow>
            ) : (
              Studentdetails.map((studetails) => (
                <TableRow 
                  key={studetails.studentDetailsId}
                  sx={{ "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04)" }, transition: "background-color 0.2s" }}
                >
                  <TableCell>
                    <img
                      src={studetails.studentProfile}
                      alt="Profile"
                      style={{ 
                        width: 44, 
                        height: 44, 
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid rgba(99, 102, 241, 0.3)"
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                    {studetails.studentGender}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "text.primary" }}>
                    {studetails.studentEmail}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>
                    {new Date(studetails.studentBirthday).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => deleteConformation(studetails.studentDetailsId)}
                      sx={{ borderRadius: "8px", textTransform: "none", py: 0.5 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewAllStudents;
