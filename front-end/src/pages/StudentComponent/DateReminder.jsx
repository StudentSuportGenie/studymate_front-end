import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";
import StudentSidetab from "../../components/StudentSidetab";
import ViewAddedDatereminder from "./ViewAddedDatereminder";
import NotificationIcon from "../../components/NotifacitionCom";

function DateReminder() {
  const [dateReminder, setdateReminder] = useState("");
  const [timesetReminder, settimeReminder] = useState("");
  const [reminderTopic, setreminderTopic] = useState("");

  const [studentdetails, setstudentdetails] = useState("");

  useEffect(() => {
    fetshstudentData();
  }, []);

  const fetshstudentData = async () => {
    try {
      const respond = await API.get(`studentDetailUni`);
      setstudentdetails(respond.data);
      console.log(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    try {
      const respond = API.post(`addReminder`, {
        studentDetailsId: studentdetails.studentDetailsId,
        reminderTime: `${timesetReminder}:00`,
        reminderTopic: reminderTopic,
        reminderDate: dateReminder,
      });

      alert("Reminder Added success fully ");
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
      <StudentSidetab />
      <Box
        sx={{
          mt: "20px",
        }}
      >
        <NotificationIcon/>
        <Typography textAlign="center" variant="h5">
          Add Your Reminder
        </Typography>
        <form onSubmit={handelSubmit}>
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            type="date"
            value={dateReminder}
            onChange={(e) => setdateReminder(e.target.value)}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            type="time"
            value={timesetReminder}
            onChange={(e) => settimeReminder(e.target.value)}
          />
          <TextField
            label="Reminder Topic"
            fullWidth
            margin="normal"
            type="text"
            value={reminderTopic}
            onChange={(e) => setreminderTopic(e.target.value)}
          />
          <Button
            type="submit"
            sx={{
              bgcolor: "green",
              color: "white",
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
      <ViewAddedDatereminder />
    </>
  );
}

export default DateReminder;
