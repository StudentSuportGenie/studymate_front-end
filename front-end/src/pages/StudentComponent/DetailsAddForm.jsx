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
} from "@mui/material";
import API from "../../Context/Axiox";
import { useSelector } from "react-redux";

function DetailsAddForm() {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
      await API.post("Addstudetails", {
        studentProfile: profile,
        studentGender: gender,
        studentEmail: user?.email,
        studentBirthday: birthday,
      });

      alert("Details added successfully");
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

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, mb: 6 }}
    >
      <Box
        className="glass-card page-enter"
        sx={{
          width: "100%",
          maxWidth: 600,
          p: { xs: 3, md: 4 },
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mb: 4, 
            fontFamily: "Outfit", 
            fontWeight: 700,
            background: "linear-gradient(45deg, #818cf8, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Add Your Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              mb: 3, 
              p: 2.5,
              borderRadius: "16px",
              border: "2px dashed",
              borderColor: "primary.main",
              background: "rgba(99, 102, 241, 0.03)",
              transition: "all 0.25s ease",
              "&:hover": {
                borderColor: "secondary.main",
                boxShadow: "0 4px 12px rgba(99, 102, 241, 0.06)"
              }
            }}
          >
            {profile ? (
              <Box 
                component="img" 
                src={profile} 
                alt="Profile Preview"
                sx={{ 
                  width: 120, 
                  height: 120, 
                  borderRadius: "50%", 
                  objectFit: "cover", 
                  mb: 2,
                  border: "3px solid #6366f1",
                  boxShadow: "0 0 16px rgba(99, 102, 241, 0.4)"
                }}
              />
            ) : (
              <Box 
                sx={{ 
                  width: 100, 
                  height: 100, 
                  borderRadius: "50%", 
                  background: "rgba(99, 102, 241, 0.05)", 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  mb: 2,
                  border: "1px solid rgba(99, 102, 241, 0.15)"
                }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>No Image</Typography>
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 2, width: "100%", justifyContent: "center", mt: 1 }}>
              <Button
                variant="outlined"
                component="label"
                size="small"
                sx={{ borderRadius: "8px", textTransform: "none" }}
              >
                Choose Photo
                <input type="file" hidden onChange={handleFileChange} />
              </Button>
              <Button
                variant="contained"
                onClick={handleImageUpload}
                disabled={!selectedFile}
                size="small"
                sx={{ 
                  borderRadius: "8px",
                  textTransform: "none",
                  boxShadow: selectedFile ? "0 4px 12px rgba(99, 102, 241, 0.2)" : "none"
                }}
              >
                Upload
              </Button>
            </Box>
            {selectedFile && (
              <Typography variant="caption" sx={{ mt: 1, color: "text.secondary", fontWeight: 500 }}>
                Selected: {selectedFile.name}
              </Typography>
            )}
          </Box>

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
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
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 4 }}
          />

          <Button
            type="submit"
            className="glow-button"
            fullWidth
            size="large"
            disabled={!profile}
          >
            Submit Details
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default DetailsAddForm;
