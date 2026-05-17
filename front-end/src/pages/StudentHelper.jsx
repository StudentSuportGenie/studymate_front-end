import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import PDFScannCom from "../components/PDFScannCom";
import { Box, Button, TextField, Typography, CircularProgress, Fade } from "@mui/material";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentSidetab from "../components/StudentSidetab";

function OCRUploader() {
  // image state removed (unused)
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [userEmail, setEmail] = useState("");
  const [output, setOutput] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("studyBuddy");
    if (!token) {
      navigate("/");
    } else {
      try {
        const decode = jwtDecode(token);
        const usermail = decode.emails?.[0] || decode.email;
        setEmail(usermail);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token", err);
        navigate("/");
      }
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      extractTextFromImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswerLoading(true);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/GetAnswer`, {
        useremail: userEmail,
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
      parts.push(<strong key={lastIndex}>{m[1]}</strong>);
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
          <ul key={`ul-${key}`} style={{ marginTop: 6, marginBottom: 6 }}>
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
          <Typography key={`h-${idx}`} variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
            {headingMatch[1]}
          </Typography>
        );
        return;
      }

      const bulletMatch = /^[-*•]\s*(.+)/.exec(line);
      if (bulletMatch) {
        listBuffer.push(
          <li key={`li-${idx}`} style={{ marginBottom: 6 }}>
            {renderInlineFormatting(bulletMatch[1])}
          </li>
        );
        return;
      }

      // regular paragraph
      flushList(idx);
      elems.push(
        <Typography key={`p-${idx}`} variant="body1" sx={{ mt: 0.5 }}>
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
    <Box>
      <StudentSidetab />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 2 }}>
        <PDFScannCom />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            bgcolor: "#E9EBE6FF",
            width: "98%",
            minHeight: "100px",
            borderRadius: "20px",
            mt: 2,
            mb: 1,
            p: 2,
            overflow: "auto",
          }}
        >
          {loading ? (
            "Processing image..."
          ) : answerLoading ? (
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 4 }}>
              <CircularProgress />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Fetching answer...
              </Typography>
            </Box>
          ) : output ? (
            <Fade in={!answerLoading} timeout={300}>
              <div>{renderFormatted(output)}</div>
            </Fade>
          ) : text ? (
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {text}
            </Typography>
          ) : (
            <Typography variant="body2">No content yet.</Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          p: "5px 10px",
          bgcolor: "#EDF6F6",
          borderRadius: "10px",
          width: "98%",
          mb: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            value={question}
            placeholder="Type your question here..."
            onChange={(e) => setQuestion(e.target.value)}
            sx={{ mt: 1, mb: 2, bgcolor: "white" }}
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
              <Button component="span" sx={{ bgcolor: "#D9D9D9", p: 1 }}>
                <MdOutlinePhotoSizeSelectActual size={25} />
              </Button>
            </label>

            <Button type="submit" sx={{ bgcolor: "#D9D9D9" }}>
              <FaCircleArrowUp size={30} />
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default OCRUploader;
