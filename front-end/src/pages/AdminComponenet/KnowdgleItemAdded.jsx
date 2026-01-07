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
} from "@mui/material";
import API from "../../Context/Axiox";
import { jwtDecode } from "jwt-decode";
import ViewKnowdgleItems from "./ViewKnowdgleItems";

function KnowdgleItemAdded() {
  const [contentTitle, setcontentTitle] = useState("");
  const [contentDiscription, setcontentDiscription] = useState("");
  const [contentType, setcontentType] = useState("");
  const [constLink, setconstLink] = useState("");

  const handelContent = (e) => {
    setcontentType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem("studyBuddy");
    const decode = jwtDecode(token);
    const useEmail = decode.emails[0];

    console.log(
      useEmail,
      contentTitle,
      contentDiscription,
      constLink,
      contentType
    );
    try {
      await API.post(`addItems`, {
        knowdgleItemTitle: contentTitle,
        knowdgleItemDescription: contentDiscription,
        knowdgleitemLink: constLink,
        knowdgleItemtype: contentType,
        addedEmail: useEmail,
      });
      alert("Added Succesfully");
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
      <AdminSidebartab />
      <Box
        sx={{
          mb: "20px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            align="center"
            variant="h4"
            fontFamily="'Roboto', sans-serif"
            gutterBottom
            m={5}
          >
            Add the Content
          </Typography>

          <Box
            mx={5}
            mb={5}
            border={1}
            borderColor="grey.500"
            borderRadius={2}
            p={2}
          >
            <TextField
              label="Content Title"
              fullWidth
              margin="normal"
              value={contentTitle}
              onChange={(e) => setcontentTitle(e.target.value)}
            />
            <TextField
              label="Content Discription"
              fullWidth
              margin="normal"
              value={contentDiscription}
              onChange={(e) => setcontentDiscription(e.target.value)}
            />
            <TextField
              label="Content Link"
              fullWidth
              margin="normal"
              value={constLink}
              onChange={(e) => setconstLink(e.target.value)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="typeID">Content Type</InputLabel>
              <Select
                labelId="typeID"
                value={contentType}
                label="ContentType"
                onChange={handelContent}
              >
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="audio">Audio</MenuItem>
                <MenuItem value="video">Video</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
      <Box>
        <Typography
          align="center"
          variant="h5"
          fontFamily="'Roboto', sans-serif"
          gutterBottom
          m={5}
        >
          View Knowledge Items
        </Typography>
        <ViewKnowdgleItems />
      </Box>
    </>
  );
}

export default KnowdgleItemAdded;
