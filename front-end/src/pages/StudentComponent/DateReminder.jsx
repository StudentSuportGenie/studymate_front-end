import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";
import StudentSidetab from "../../components/StudentSidetab";
import ViewAddedDatereminder from "./ViewAddedDatereminder";
import NotificationIcon from "../../components/NotifacitionCom";

import AUD1 from "../../Audios/ringtone.mp3";
import AUD2 from "../../Audios/samsung.mp3";
import AUD3 from "../../Audios/wake_up.mp3";

function DateReminder() {
  const [dateReminder, setdateReminder] = useState("");
  const [timesetReminder, settimeReminder] = useState("");
  const [reminderTopic, setreminderTopic] = useState("");
  const [selectedAudio, setSelectedAudio] = useState("Ringtone"); // default audio name

  const [studentdetails, setstudentdetails] = useState("");

  const audios = [
    { name: "Ringtone", file: AUD1 },
    { name: "Samsung", file: AUD2 },
    { name: "Wake Up", file: AUD3 },
  ];

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

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`addReminder`, {
        studentDetailsId: studentdetails.studentDetailsId,
        reminderTime: `${timesetReminder}:00`,
        reminderTopic: reminderTopic,
        reminderDate: dateReminder,
        ringingTone: selectedAudio, 
      });

      alert("Reminder Added successfully");
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
      <Box sx={{ mt: "20px" }}>
        <NotificationIcon />
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

          {/* Show all audios with play option */}
          <FormControl fullWidth margin="normal">
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Choose Your Reminder Audio
            </Typography>
            <RadioGroup
              value={selectedAudio}
              onChange={(e) => setSelectedAudio(e.target.value)}
            >
              {audios.map((audio) => (
                <Box 
                  key={audio.name} 
                  sx={{ display: "flex", alignItems: "center", mb: 1 }}
                >
                  <FormControlLabel
                    value={audio.name}
                    control={<Radio />}
                    label={audio.name}
                  />
                  <audio controls style={{ marginLeft: "10px" }}>
                    <source src={audio.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            sx={{ bgcolor: "green", color: "white", mt: 2 }}
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
