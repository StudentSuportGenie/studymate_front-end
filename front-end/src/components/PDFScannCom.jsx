import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DropboxChooser from "react-dropbox-chooser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import axios from "axios";

function PDFScannCom() {
  const APP_KEY = "1muvw9nz1u5se1b";
  const [pdfUrl, setPdfUrl] = useState([]);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = (files) => {
    const pdfFile = files.find((file) => file.name.endsWith(".pdf"));
    if (pdfFile) {
      setPdfUrl(pdfFile.link);
    } else {
      alert("Please choose a PDF file.");
    }

    try {
      console.log(user?.email, pdfUrl);
      const respond = axios.post(`http://127.0.0.1:8000/PdFChoose`, {
        useremail: user?.email,
        url: pdfUrl,
      });
      alert(respond.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <DropboxChooser
        appKey={APP_KEY}
        success={handleSuccess}
        cancel={() => console.log("Closed or canceled")}
        multiselect={false}
        extensions={[".pdf"]}
      >
        <BsFileEarmarkPdf
          style={{
            width: "30px",
            height: "30px",
            color: "red",
            cursor: "pointer",
          }}
        />
      </DropboxChooser>
    </Box>
  );
}

export default PDFScannCom;