import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import PDFScannCom from "../components/PDFScannCom";
import { Box, Button, TextField, Typography, CircularProgress, Fade, Paper, IconButton } from "@mui/material";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSidetab from "../components/StudentSidetab";

function OCRUploader() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [output, setOutput] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      extractTextFromImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question && !text) return;
    setAnswerLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/GetAnswer`, {
        useremail: user?.email,
        text: text,
        question: question,
      });

      setOutput(response.data?.answer || "No answer found.");
    } catch (error) {
      console.error("API call failed:", error);
      setOutput("Error retrieving answer.");
    } finally {
      setAnswerLoading(false);
    }
  };

  const extractTextFromImage = (imageFile) => {
    setLoading(true);
    Tesseract.recognize(imageFile, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        setText(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("OCR failed:", err);
        setLoading(false);
      });
  };

  const renderInlineFormatting = (str) => {
    if (!str) return null;
    const parts = [];
    const regex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    let m;
    while ((m = regex.exec(str)) !== null) {
      if (m.index > lastIndex) parts.push(str.slice(lastIndex, m.index));
      parts.push(<strong key={lastIndex} style={{ color: "var(--text-primary)" }}>{m[1]}</strong>);
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < str.length) parts.push(str.slice(lastIndex));
    return parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : p));
  };

  const renderFormatted = (raw) => {
    if (!raw) return <Typography variant="body1">No answer.</Typography>;
    const lines = raw.split(/\r?\n/);
    const elems = [];
    let listBuffer = [];

    const flushList = (key) => {
      if (listBuffer.length) {
        elems.push(
          <ul key={`ul-${key}`} style={{ marginTop: 6, marginBottom: 6, paddingLeft: 20 }}>
            {listBuffer}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((ln, idx) => {
      const line = ln.trim();
      if (!line) {
        flushList(idx);
        elems.push(<div key={`br-${idx}`} style={{ height: 8 }} />);
        return;
      }

      const headingMatch = /^\*\*(.+)\*\*/.exec(line);
      if (headingMatch) {
        flushList(idx);
        elems.push(
          <Typography key={`h-${idx}`} variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1, fontFamily: "Outfit", color: "primary.main" }}>
            {headingMatch[1]}
          </Typography>
        );
        return;
      }

      const bulletMatch = /^[-*•]\s*(.+)/.exec(line);
      if (bulletMatch) {
        listBuffer.push(
          <li key={`li-${idx}`} style={{ marginBottom: 6, color: "var(--text-secondary)" }}>
            {renderInlineFormatting(bulletMatch[1])}
          </li>
        );
        return;
      }

      // regular paragraph
      flushList(idx);
      elems.push(
        <Typography key={`p-${idx}`} variant="body1" sx={{ mt: 1, color: "var(--text-secondary)" }}>
          {renderInlineFormatting(line)}
        </Typography>
      );
    });

    flushList("end");
    return <div>{elems}</div>;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <StudentSidetab />
      
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 2 }}>
        <PDFScannCom />
      </Box>

      {/* Answer Output Panel */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 3 }}>
        <Paper
          className="glass-card"
          sx={{
            width: "100%",
            minHeight: "200px",
            borderRadius: "20px",
            p: { xs: 3, md: 4 },
            overflow: "auto",
            position: "relative"
          }}
        >
          {loading ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 6 }}>
              <CircularProgress color="primary" />
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Extracting text from image (OCR)...
              </Typography>
            </Box>
          ) : answerLoading ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 6 }}>
              <CircularProgress color="secondary" />
              <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
                Analyzing content and fetching your answer...
              </Typography>
            </Box>
          ) : output ? (
            <Fade in={!answerLoading} timeout={300}>
              <div>{renderFormatted(output)}</div>
            </Fade>
          ) : text ? (
            <Box>
              <Typography variant="subtitle2" sx={{ color: "primary.main", mb: 1, fontWeight: 700 }}>
                Scanned Text:
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap", color: "text.secondary" }}>
                {text}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4 }}>
              <Typography variant="body1" sx={{ color: "text.secondary", fontFamily: "Outfit", fontWeight: 500 }}>
                Upload an image of a question or type below to get instant AI answers! 🚀
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      {/* Input Query form */}
      <Paper
        className="glass-card"
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: "20px",
          width: "100%",
          mb: 5,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            value={question}
            placeholder="Ask AI StudyMate a question about your study materials..."
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label htmlFor="image-upload">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <Button 
                component="span" 
                variant="outlined"
                color="primary"
                sx={{ 
                  borderRadius: "12px", 
                  px: 3, 
                  py: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}
              >
                <MdOutlinePhotoSizeSelectActual size={20} />
                <Typography variant="body2">Upload Image</Typography>
              </Button>
            </label>

            <IconButton 
              type="submit" 
              className="glow-button"
              sx={{ 
                width: 48, 
                height: 48,
                borderRadius: "50%",
                boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
                "&:hover": { transform: "scale(1.05)" }
              }}
              disabled={answerLoading || loading}
            >
              <FaCircleArrowUp size={24} style={{ color: "#ffffff" }} />
            </IconButton>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default OCRUploader;
