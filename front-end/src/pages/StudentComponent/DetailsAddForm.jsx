import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  Button,
  Input,
} from "@mui/material";
import API from "../../Context/Axiox";
import { jwtDecode } from "jwt-decode";

function DetailsAddForm() {
  const [profile, setProfile] = useState("");
  const [gender, setGender] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("studyBuddy");
      if (token) {
        const decode = jwtDecode(token);
        const username = decode?.emails?.[0] || "";
        setUserEmail(username);
      }
    };
    fetchData();
  }, []);

  const handleGenderChange = (e) => setGender(e.target.value);
  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleImageUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "ProfileImage");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkm0i3zpe/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setProfile(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile) {
      alert("Please upload your profile image first.");
      return;
    }

    try {
      // console.log(profile,gender,userEmail,birthday);
      await API.post("Addstudetails", {
        studentProfile: profile,
        studentGender: gender,
        studentEmail: userEmail,
        studentBirthday: birthday,
      });

      alert("Details added successfully");
      window.location.reload();
    }catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(
          `${
            error.response.data.message
          }`
        );
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
        <Typography variant="h4" align="center" sx={{ marginBottom: "30px" }}>
          Add your Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleImageUpload} sx={{ mt: 1 }}>
            Upload Image
          </Button>

          <FormControl fullWidth margin="normal">
            <InputLabel id="genderID">Gender</InputLabel>
            <Select
              labelId="genderID"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
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
        
            onChange={(e) => setBirthday(e.target.value)}
          />

          {/* Option 1: Hide button if profile is empty */}
          {profile && (
            <Button
              type="submit"
              variant="outlined"
              sx={{ float: "right", mt: 2 }}
            >
              Submit
            </Button>
          )}

          {/* Option 2: Disable button instead of hiding */}
          {/* <Button
            type="submit"
            variant="outlined"
            sx={{ float: "right", mt: 2 }}
            disabled={!profile}
          >
            Submit
          </Button> */}
        </form>
      </Box>
    </Box>
  );
}

export default DetailsAddForm;
