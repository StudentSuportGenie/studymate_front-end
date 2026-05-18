import React, { useState } from "react";
import AdminSidebartab from "../../components/AdminSidebartab";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import API from "../../Context/Axiox";
import { useSelector } from "react-redux";
import ViewKnowdgleItems from "./ViewKnowdgleItems";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';

function KnowdgleItemAdded() {
  const { user } = useSelector((state) => state.auth);
  const [contentTitle, setcontentTitle] = useState("");
  const [contentDiscription, setcontentDiscription] = useState("");
  const [contentType, setcontentType] = useState("");
  const [constLink, setconstLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handelContent = (e) => {
    setcontentType(e.target.value);
    setSelectedFile(null); // Reset selected file if content type changes
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ProfileImage");

      // Explicitly map resource type and sub-endpoint to force raw/video directories
      let uploadEndpoint = "https://api.cloudinary.com/v1_1/dkm0i3zpe/upload";
      let resourceType = "auto";
      
      if (contentType === "PDF") {
        resourceType = "raw";
        uploadEndpoint = "https://api.cloudinary.com/v1_1/dkm0i3zpe/raw/upload";
      } else if (contentType === "audio" || contentType === "video") {
        resourceType = "video";
        uploadEndpoint = "https://api.cloudinary.com/v1_1/dkm0i3zpe/video/upload";
      }
      formData.append("resource_type", resourceType);

      try {
        const response = await fetch(
          uploadEndpoint,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg = errData.error?.message || "Upload failed";
          throw new Error(errMsg);
        }

        const data = await response.json();
        setconstLink(data.secure_url);
        alert("File uploaded automatically to Cloudinary! URL generated successfully.");
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        if (error.message && (error.message.includes("preset") || error.message.includes("raw files") || error.message.includes("support"))) {
          alert(`Cloudinary Configuration Notice: The preset "ProfileImage" is currently restricted to "Image Only" inside your Cloudinary settings.\n\nTo allow PDFs & Podcasts:\n1. Log into your Cloudinary console.\n2. Go to Settings (gear icon) > Upload.\n3. Scroll down to "Upload presets" and click Edit on "ProfileImage".\n4. Change the "Resource type" dropdown from "Image" to "Auto" (or "Raw") and click Save!\n\nAlternatively, you can paste the resource link manually in the input box below.`);
        } else {
          alert(`Failed to automatically upload file to Cloudinary: ${error.message}. Please try again or paste the URL manually.`);
        }
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contentTitle || !contentDiscription || !contentType) return;
    const useEmail = user?.email;

    try {
      await API.post(`addItems`, {
        knowdgleItemTitle: contentTitle,
        knowdgleItemDescription: contentDiscription,
        knowdgleitemLink: constLink,
        knowdgleItemtype: contentType,
        addedEmail: useEmail,
      });

      alert("Added Successfully");
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

  const getUploadIcon = () => {
    switch (contentType) {
      case "PDF":
        return <PictureAsPdfIcon sx={{ fontSize: 45, color: "primary.main" }} />;
      case "audio":
        return <AudioFileIcon sx={{ fontSize: 45, color: "secondary.main" }} />;
      case "video":
        return <VideoFileIcon sx={{ fontSize: 45, color: "error.main" }} />;
      default:
        return <CloudUploadIcon sx={{ fontSize: 45, color: "text.secondary" }} />;
    }
  };

  const getFileAccept = () => {
    switch (contentType) {
      case "PDF":
        return "application/pdf";
      case "audio":
        return "audio/*";
      case "video":
        return "video/*";
      default:
        return "*/*";
    }
  };

  const renderPreview = () => {
    if (!constLink) return null;

    const typeLower = contentType ? contentType.toLowerCase() : "";

    if (typeLower === "pdf" || constLink.toLowerCase().endsWith(".pdf") || constLink.includes("/raw/upload/")) {
      return (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          borderRadius: "12px", 
          border: "1px solid var(--glass-border)", 
          display: "flex", 
          alignItems: "center", 
          gap: 2, 
          background: "rgba(239, 68, 68, 0.03)" 
        }}>
          <PictureAsPdfIcon sx={{ fontSize: 36, color: "error.main" }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "Outfit" }}>
              PDF Document Loaded 📄
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Securely hosted on Cloudinary
            </Typography>
          </Box>
          <Button 
            size="small" 
            variant="outlined" 
            color="error"
            component="a" 
            href={constLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            sx={{ textTransform: "none", borderRadius: "8px", fontFamily: "Outfit" }}
          >
            Open PDF 🔗
          </Button>
        </Box>
      );
    }

    if (typeLower === "audio" || constLink.toLowerCase().endsWith(".mp3") || constLink.toLowerCase().endsWith(".wav") || (constLink.includes("/video/upload/") && !constLink.toLowerCase().endsWith(".mp4") && !constLink.toLowerCase().endsWith(".webm"))) {
      return (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          borderRadius: "12px", 
          border: "1px solid var(--glass-border)", 
          background: "rgba(168, 85, 247, 0.03)" 
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
            <AudioFileIcon sx={{ fontSize: 36, color: "secondary.main" }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "Outfit" }}>
                Audio Podcast Loaded 🎙️
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Hosted audio stream preview
              </Typography>
            </Box>
          </Box>
          <audio src={constLink} controls style={{ width: "100%", height: "40px", borderRadius: "8px" }} />
        </Box>
      );
    }

    if (typeLower === "video" || constLink.toLowerCase().endsWith(".mp4") || constLink.toLowerCase().endsWith(".webm") || (constLink.includes("/video/upload/") && (constLink.toLowerCase().endsWith(".mp4") || constLink.toLowerCase().endsWith(".webm")))) {
      return (
        <Box sx={{ 
          mt: 2, 
          p: 2, 
          borderRadius: "12px", 
          border: "1px solid var(--glass-border)", 
          background: "rgba(236, 72, 153, 0.03)" 
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.5 }}>
            <VideoFileIcon sx={{ fontSize: 36, color: "primary.main" }} />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "Outfit" }}>
                Video Lecture Loaded 🎥
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Hosted video player preview
              </Typography>
            </Box>
          </Box>
          <video src={constLink} controls style={{ width: "100%", maxHeight: "180px", borderRadius: "8px", objectFit: "contain", background: "#000" }} />
        </Box>
      );
    }

    return (
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        borderRadius: "12px", 
        border: "1px solid var(--glass-border)", 
        display: "flex", 
        alignItems: "center", 
        gap: 2, 
        background: "rgba(99, 102, 241, 0.03)" 
      }}>
        <CloudUploadIcon sx={{ fontSize: 36, color: "primary.main" }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: "Outfit" }}>
            External Link Loaded
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {constLink}
          </Typography>
        </Box>
        <Button 
          size="small" 
          variant="outlined" 
          component="a" 
          href={constLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          sx={{ textTransform: "none", borderRadius: "8px", fontFamily: "Outfit" }}
        >
          Visit Link 🔗
        </Button>
      </Box>
    );
  };

  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <AdminSidebartab />
      
      <Box sx={{ mb: 5 }}>
        <form onSubmit={handleSubmit}>
          <Typography
            align="center"
            variant="h4"
            sx={{
              mt: 4,
              mb: 3,
              fontFamily: "Outfit",
              fontWeight: 700,
              background: "linear-gradient(45deg, #818cf8, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Add Knowledge Content 📚
          </Typography>

          <Box className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
            <TextField
              label="Content Title"
              fullWidth
              margin="normal"
              value={contentTitle}
              onChange={(e) => setcontentTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Content Description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={contentDiscription}
              onChange={(e) => setcontentDiscription(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="normal" required sx={{ mb: 3 }}>
              <InputLabel id="typeID">Content Type</InputLabel>
              <Select
                labelId="typeID"
                value={contentType}
                label="Content Type"
                onChange={handelContent}
              >
                <MenuItem value="PDF">PDF Document 📄</MenuItem>
                <MenuItem value="audio">Audio Podcast 🎙️</MenuItem>
                <MenuItem value="video">Video Lecture 🎥</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Content Link / URL"
              fullWidth
              margin="normal"
              value={constLink}
              onChange={(e) => setconstLink(e.target.value)}
              helperText={
                constLink 
                  ? "✓ Uploaded Successfully! You can also paste an external URL manually here if preferred."
                  : "Choose a file next to this box to upload automatically, or paste a link manually."
              }
              FormHelperTextProps={{
                sx: { 
                  color: constLink ? "success.main" : "text.secondary", 
                  fontWeight: constLink ? 600 : 400,
                  fontSize: "0.85rem"
                }
              }}
              sx={{ mb: 4 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {uploading ? (
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        disabled={!contentType}
                        sx={{ 
                          borderRadius: "8px", 
                          textTransform: "none", 
                          fontFamily: "Outfit",
                          mr: -1,
                          height: 36,
                          px: 2,
                          boxShadow: contentType ? "0 4px 12px rgba(99, 102, 241, 0.2)" : "none"
                        }}
                      >
                        {contentType ? `Upload ${contentType} 🚀` : "Select Type First 📄"}
                        {contentType && (
                          <input 
                            type="file" 
                            hidden 
                            accept={getFileAccept()} 
                            onChange={handleFileChange} 
                          />
                        )}
                      </Button>
                    )}
                  </InputAdornment>
                )
              }}
            />
            
            {renderPreview()}
            
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <Button 
                type="submit" 
                className="glow-button"
                size="large"
                sx={{ px: 5 }}
                disabled={uploading}
              >
                Publish Content
              </Button>
            </Box>
          </Box>
        </form>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography
          align="center"
          variant="h4"
          sx={{
            mt: 5,
            mb: 3,
            fontFamily: "Outfit",
            fontWeight: 700,
          }}
        >
          View Knowledge Items 🔍
        </Typography>
        <ViewKnowdgleItems />
      </Box>
    </Box>
  );
}

export default KnowdgleItemAdded;
