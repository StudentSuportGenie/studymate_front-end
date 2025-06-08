import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";

function DetailsEditForm({ studentdetails }) {
  const [editBirthday, seteditbirthday] = useState("");
  const [profileedit, setprofileedit] = useState("");
  const [editGender, seteditGender] = useState("");

  useEffect(() => {
    if (studentdetails) {
      console.log(studentdetails);
      seteditGender(studentdetails.studentGender || "");
      seteditbirthday(studentdetails.studentBirthday?.substring(0, 10) || "");
      setprofileedit(studentdetails.studentProfile || "");
    }
  }, [studentdetails]);

  const handleGender = (e) => {
    seteditGender(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const respond = await API.put(`updateDetails`, {
        studentDetailsId: studentdetails.studentDetailsId,
        studentProfile: profileedit,
        studentGender: editGender,
        studentEmail: studentdetails.studentEmail,
        studentBirthday: editBirthday,
      });
      alert("Edit details Successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Typography align="center">Details Edit Form</Typography>
      <form onSubmit={handelSubmit}>
        <TextField
          label="Birthday"
          type="date"
          fullWidth
          margin="normal"
          value={editBirthday}
          onChange={(e) => seteditbirthday(e.target.value)}
        />
        <TextField
          label="Profile Image"
          fullWidth
          margin="normal"
          value={profileedit}
          onChange={(e) => setprofileedit(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="GenderId">Gender</InputLabel>
          <Select
            labelId="GenderId"
            value={editGender}
            label="Gender"
            onChange={handleGender}
          >
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </>
  );
}

export default DetailsEditForm;
