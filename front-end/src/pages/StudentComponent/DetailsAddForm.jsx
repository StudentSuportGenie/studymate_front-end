import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  Button,
} from "@mui/material";
import API from "../../Context/Axiox";

function DetailsAddForm() {
 const [profile, setprofile] = useState("");
  const [gender, setGender] = useState("");
  const [userEmail, setuseremail] = useState("");
  const [birthday, setbirthday] = useState("");

  const handleChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profile, gender, userEmail, birthday);
      const respond = await API.post(`Addstudetails`, {
        studentProfile: profile,
        studentGender: gender,
        studentEmail: userEmail,
        studentBirthday: birthday,
      });
      alert("Details added success fully");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log("Server responded with a status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received. Request:", error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            bgcolor: "white",
            border: "2px solid black",
            padding: "20px",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: "30px",
            }}
          >
            Add your Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Student profile"
              value={profile}
              fullWidth
              margin="normal"
              onChange={(e) => setprofile(e.target.value)}
            />
            <TextField
              label="UserEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setuseremail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="genderID">Gender</InputLabel>
              <Select
                labelId="genderID"
                value={gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Birthday"
              type="date"
              fullWidth
              margin="normal"
              onChange={(e) => setbirthday(e.target.value)}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{
                float: "right",
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
export default DetailsAddForm