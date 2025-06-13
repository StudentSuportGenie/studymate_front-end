import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
      console.log(respond.data);
      setstudentsdetails(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handeldelete = async (studentDetailsId) => {
    try {
      const respond = await API.delete(
        `deletestudent?studentId=${studentDetailsId}`
      );
      alert("Delete Succesfully");
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
    if(confirmDelete){
      handeldelete(studentDetailsId)
    }
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Students details
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Profile</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Birthday</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Studentdetails.map((studetails) => (
              <TableRow key={studetails.studentDetailsId}>
                <TableCell>
                  <img
                    src={studetails.studentProfile}
                    alt="Profile"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{studetails.studentGender}</TableCell>
                <TableCell>{studetails.studentEmail}</TableCell>
                <TableCell>
                  {new Date(studetails.studentBirthday).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => deleteConformation(studetails.studentDetailsId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ViewAllStudents;
