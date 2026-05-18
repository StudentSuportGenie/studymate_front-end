import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import API from "../../Context/Axiox";

function DetailsEditForm({ studentdetails }) {
  const [editBirthday, setEditBirthday] = useState("");
  const [editGender, setEditGender] = useState("");
  const [profileEdit, setProfileEdit] = useState("");
  const [uploading, setUploading] = useState(false);
  const [localPreview, setLocalPreview] = useState("");

  useEffect(() => {
    if (studentdetails) {
      setEditGender(studentdetails.studentGender || "");
      setEditBirthday(studentdetails.studentBirthday?.substring(0, 10) || "");
      setProfileEdit(studentdetails.studentProfile || "");
    }
  }, [studentdetails]);

  const handleGender = (e) => setEditGender(e.target.value);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ProfileImage");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dkm0i3zpe/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setProfileEdit(imageUrl);
      setLocalPreview("");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileEdit) {
      alert("Please upload a profile image first.");
      return;
    }

    try {
      await API.put("updateDetails", {
        studentDetailsId: studentdetails.studentDetailsId,
        studentProfile: profileEdit,
        studentGender: editGender,
        studentEmail: studentdetails.studentEmail,
        studentBirthday: editBirthday,
      });

      alert("Details updated successfully");
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
          Edit Your Details
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
            {uploading ? (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 2 }}>
                <CircularProgress size={40} color="primary" />
                <Typography variant="body2" sx={{ mt: 2, color: "text.secondary", fontWeight: 500 }}>
                  Uploading Profile...
                </Typography>
              </Box>
            ) : profileEdit ? (
              <Box 
                component="img" 
                src={profileEdit} 
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

            <Button
              variant="outlined"
              component="label"
              size="small"
              sx={{ borderRadius: "8px", mt: 1, textTransform: "none" }}
              disabled={uploading}
            >
              Change Photo
              <input 
                type="file" 
                hidden 
                accept="image/*"
                onChange={handleImageChange} 
              />
            </Button>
          </Box>

          <TextField
            label="Birthday"
            type="date"
            fullWidth
            margin="normal"
            value={editBirthday}
            onChange={(e) => setEditBirthday(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
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

          <Button
            type="submit"
            className="glow-button"
            fullWidth
            size="large"
            disabled={uploading || !editBirthday || !editGender || !profileEdit}
          >
            {uploading ? "Uploading..." : "Save Changes"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default DetailsEditForm;
