import React, { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import DropboxChooser from "react-dropbox-chooser";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFileEarmarkPdf } from "react-icons/bs";
import axios from "axios";
import { API_BASE } from "../Config/api";

function PDFScannCom({
  onUploadStart = () => {},
  onUploadSuccess = () => {},
  onUploadError = () => {},
  disabled = false,
}) {
  const APP_KEY = "1muvw9nz1u5se1b";
  const [pdfUrl, setPdfUrl] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = async (files) => {
    const pdfFile = Array.isArray(files)
      ? files.find((file) => file?.name?.toLowerCase().endsWith(".pdf"))
      : null;

    if (!pdfFile) {
      onUploadError("Please choose a PDF file.");
      console.log(pdfUrl);
      return;
    }

    const fileUrl =
      pdfFile.link || pdfFile.previewLink || pdfFile.thumbnailLink;
    if (!fileUrl) {
      onUploadError(
        "Could not resolve a valid PDF URL from Dropbox. Please try again.",
      );
      return;
    }

    setPdfUrl(fileUrl);

    if (!user?.email) {
      onUploadError(
        "Unable to upload PDF because the user email is missing. Please sign in again.",
      );
      return;
    }

    onUploadStart(pdfFile.name);

    try {
      console.log("Uploading PDF for user:", user.email, fileUrl);
      const response = await axios.post(
        `${API_BASE}/PdFChoose`,
        {
          useremail: user.email,
          url: [fileUrl],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      onUploadSuccess(
        pdfFile.name,
        response.data?.message || "PDF uploaded successfully.",
      );
    } catch (error) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        "Upload failed.";
      console.error("PDF upload failed:", error);

      const extraHint =
        status === 404
          ? "The PDF upload endpoint was not found. Ensure your backend is running and API_BASE points to the correct service."
          : "";

      onUploadError(`${errorMessage} ${extraHint}`);
    }
  };

  return (
    <DropboxChooser
      appKey={APP_KEY}
      success={handleSuccess}
      cancel={() => console.log("Closed or canceled")}
      multiselect={false}
      extensions={[".pdf"]}
      disabled={disabled}
    >
      <Button
        variant="outlined"
        color="secondary"
        disabled={disabled}
        sx={{
          borderRadius: "12px",
          px: 3,
          py: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontFamily: "Outfit",
          fontWeight: 600,
          textTransform: "none",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(236, 72, 153, 0.2)",
          },
        }}
      >
        <BsFileEarmarkPdf size={20} />
        <Typography
          variant="body2"
          sx={{ fontFamily: "Outfit", fontWeight: 600 }}
        >
          Upload PDF
        </Typography>
      </Button>
    </DropboxChooser>
  );
}

export default PDFScannCom;
