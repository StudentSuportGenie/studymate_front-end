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
    <>
      <Box
        sx={{
          m: "80px",
        }}
      >
        <Typography align="center" variant="h6" gutterBottom>
          Details Edit Form
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: 2,
            }}
          >
            {(uploading || localPreview || profileEdit) && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {uploading ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={32} />
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Uploading...
                    </Typography>
                    {localPreview && (
                      <img
                        src={localPreview}
                        alt="Local Preview"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginTop: "8px",
                          border: "2px solid black",
                        }}
                      />
                    )}
                  </Box>
                ) : (
                  profileEdit && (
                    <img
                      src={profileEdit}
                      alt="Profile"
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginBottom: "8px",
                        
                      }}
                    />
                  )
                )}
              </Box>
            )}

            <input
              type="file"
              accept="image/*"
              
              onChange={handleImageChange}
              style={{ marginTop: "12px" }}
            />
          </Box>

          <TextField
            label="Birthday"
            type="date"
            fullWidth
            margin="normal"
            value={editBirthday}
            onChange={(e) => setEditBirthday(e.target.value)}
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={uploading || !editBirthday || !editGender || !profileEdit}
          >
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        </form>
      </Box>
    </>
  );
}

export default DetailsEditForm;
