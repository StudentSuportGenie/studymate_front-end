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

    const formattedTime =
      startTime.length === 5 ? `${startTime}:00` : startTime;

    try {
      const response = await API.post("RadScheduler", {
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
    <>
      <StudentSidetab />
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 , mb:5}}>
        <Typography textAlign="center" variant="h5">
          Add your Schedule
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            label="Date"
            required
          />
          <TextField
            type="time"
            fullWidth
            margin="normal"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            label="Start Time"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="text"
            value={contentTopic}
            label="Content Topic"
            onChange={(e) => setContentTopic(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            value={hourCount}
            label="Hour Count"
            onChange={(e) => setHourCount(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
      <Box>
        <ViewAddedSchedule />
      </Box>
    </>
  );
}

export default TimeScheduleAdded;
