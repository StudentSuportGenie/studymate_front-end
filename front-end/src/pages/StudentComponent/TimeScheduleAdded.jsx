import React, { useEffect, useState } from "react";
import StudentSidetab from "../../components/StudentSidetab";
import API from "../../Context/Axiox";
import { Box, Button, TextField, Typography } from "@mui/material";
import ViewAddedSchedule from "./ViewAddedSchedule";

function TimeScheduleAdded() {
  const [studentDetails, setStudentDetails] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [contentTopic, setContentTopic] = useState("");
  const [hourCount, setHourCount] = useState("");

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await API.get("studentDetailUni");
      setStudentDetails(response.data);
    } catch (error) {
      console.error("Failed to fetch student data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentDetails || !studentDetails.studentDetailsId) {
      alert("Student profile details not found. Please fill in your details on the Home page first!");
      return;
    }

    const formattedTime =
      startTime.length === 5 ? `${startTime}:00` : startTime;

    try {
      await API.post("RadScheduler", {
        scheduleDate: date,
        scheduleStartTime: formattedTime,
        hourCount: hourCount,
        scheduleTopic: contentTopic,
        studentDetailsId: studentDetails.studentDetailsId,
      });
      alert("Schedule added successfully!");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(
          `${
            error.response.data.message
          }`
        );
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <StudentSidetab />
      <Box 
        className="glass-card"
        sx={{ 
          maxWidth: 600, 
          mx: "auto", 
          mt: 4, 
          mb: 6, 
          p: { xs: 3, md: 4 },
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Typography 
          textAlign="center" 
          variant="h4" 
          sx={{ 
            fontFamily: "Outfit", 
            fontWeight: 700, 
            mb: 3,
            background: "linear-gradient(45deg, #818cf8, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Add Your Schedule
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date"
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            type="time"
            fullWidth
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            label="Start Time"
            InputLabelProps={{ shrink: true }}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            value={contentTopic}
            label="Content Topic"
            onChange={(e) => setContentTopic(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            value={hourCount}
            label="Hour Count"
            onChange={(e) => setHourCount(e.target.value)}
            required
            sx={{ mb: 3 }}
          />
          <Button 
            type="submit" 
            className="glow-button" 
            fullWidth
            size="large"
          >
            Submit Schedule
          </Button>
        </form>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ViewAddedSchedule />
      </Box>
    </Box>
  );
}

export default TimeScheduleAdded;
