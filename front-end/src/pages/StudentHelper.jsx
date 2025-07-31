import React, { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import PDFScannCom from "../components/PDFScannCom";
import { Box, Button, TextField } from "@mui/material";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { FaCircleArrowUp } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function OCRUploader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [userEmail, setEmail] = useState("");
  const [output, setOutput] = useState("");
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
      setImage(URL.createObjectURL(file));
      extractTextFromImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <Box>
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
          {loading ? "Processing image..." : output}
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
