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
    if (!studentdetails || !studentdetails.studentDetailsId) {
      alert("Student profile details not found. Please fill in your details on the Home page first!");
      return;
    }
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
        <NotificationIcon />
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
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Time"
            fullWidth
            margin="normal"
            type="time"
            value={timesetReminder}
            onChange={(e) => settimeReminder(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Reminder Topic"
            fullWidth
            margin="normal"
            type="text"
            value={reminderTopic}
            onChange={(e) => setreminderTopic(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Show all audios with play option */}
          <FormControl fullWidth margin="normal" sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: "Outfit", fontWeight: 600 }}>
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
                  <audio controls style={{ marginLeft: "10px", height: "32px" }}>
                    <source src={audio.file} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </Box>
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            className="glow-button"
            fullWidth
            size="large"
          >
            Submit Reminder
          </Button>
        </form>
      </Box>
      <Box sx={{ mt: 4 }}>
        <ViewAddedDatereminder />
      </Box>
    </Box>
  );
}

export default DateReminder;
