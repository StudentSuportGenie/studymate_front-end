import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DropboxChooser from "react-dropbox-chooser";
import { jwtDecode } from "jwt-decode";

function PDFScannCom() {
  const APP_KEY = "1muvw9nz1u5se1b";
  const [pdfUrl, setPdfUrl] = useState("");
  const [userEmail, setEmail] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("studyBuddy");
    if (!token) {
      navigate("/");
    } else {
      const decode = jwtDecode(token);
      const usermail = decode.emails[0];
      setEmail(usermail);
    }
  }, []);

  const handleSuccess = (files) => {
    const pdfFile = files.find((file) => file.name.endsWith(".pdf"));
    if (pdfFile) {
      setPdfUrl(pdfFile.link);
    } else {
      alert("Please choose a PDF file.");
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" mb={3}>
        Choose PDF
      </Typography>

      <DropboxChooser
        appKey={APP_KEY}
        success={handleSuccess}
        cancel={() => console.log("Closed or canceled")}
        multiselect={false}
        extensions={[".pdf"]}
      >
        <Button variant="contained">Choose PDF from Dropbox</Button>
      </DropboxChooser>

      {pdfUrl && (
        <Box mt={3}>
          <Typography variant="body1">Selected PDF URL:</Typography>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>
        </Box>
      )}
    </Box>
  );
}

export default PDFScannCom;
