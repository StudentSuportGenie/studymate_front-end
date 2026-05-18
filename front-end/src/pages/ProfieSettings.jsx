import React, { useState } from "react";
import { Button, Box, Typography, CardMedia, Fade } from "@mui/material";

function ProfileSettings() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
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
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Box className="page-enter" sx={{ display: "flex", justifyContent: "center", py: 8, px: 2 }}>
      <Box className="glass-card" sx={{ p: { xs: 3, md: 5 }, width: "100%", maxWidth: 500, textAlign: "center" }}>
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{
            fontFamily: "Outfit",
            fontWeight: 800,
            background: "linear-gradient(45deg, #818cf8, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4
          }}
        >
          Profile Photo 📸
        </Typography>

        {/* Drag and Drop Zone */}
        <Box
          sx={{
            border: "2px dashed",
            borderColor: "primary.main",
            borderRadius: "16px",
            py: 5,
            px: 3,
            cursor: "pointer",
            position: "relative",
            background: "rgba(99, 102, 241, 0.03)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 8px 24px rgba(99, 102, 241, 0.08)",
              borderColor: "secondary.main",
              transform: "translateY(-2px)"
            }
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0,
              cursor: "pointer",
              zIndex: 2
            }}
          />
          <Box>
            <img
              src="https://img.icons8.com/dusk/64/000000/file.png"
              alt="Upload Icon"
              style={{ margin: "0 auto 16px", width: 64, height: 64 }}
            />
            <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 600, mb: 0.5 }}>
              {selectedFile ? selectedFile.name : "Click or drag a file"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              PNG, JPG or JPEG (Max 5MB)
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            className="glow-button"
            onClick={handleUpload}
            fullWidth
            size="large"
          >
            Upload Profile Picture
          </Button>
        </Box>

        {imageUrl && (
          <Fade in={Boolean(imageUrl)} timeout={400}>
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 600, mb: 2 }}>
                Uploaded Image Preview ✨
              </Typography>
              <CardMedia
                component="img"
                image={imageUrl}
                alt="Uploaded"
                sx={{
                  maxWidth: 240,
                  mx: "auto",
                  borderRadius: "50%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  border: "4px solid rgba(99, 102, 241, 0.4)",
                  boxShadow: "0 0 24px rgba(99, 102, 241, 0.2)"
                }}
              />
            </Box>
          </Fade>
        )}
      </Box>
    </Box>
  );
}

export default ProfileSettings;
