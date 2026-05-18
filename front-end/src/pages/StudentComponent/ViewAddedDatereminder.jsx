import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import API from "../../Context/Axiox";

import AUD1 from "../../Audios/ringtone.mp3";
import AUD2 from "../../Audios/samsung.mp3";
import AUD3 from "../../Audios/wake_up.mp3";

function ViewAddedDatereminder() {
  const [reminderDetails, setReminderDetails] = useState([]);
  const [triggeredIds, setTriggeredIds] = useState(new Set());

  const audioFiles = {
    Ringtone: AUD1,
    Samsung: AUD2,
    "Wake Up": AUD3,
  };

  const audioRefs = {
    Ringtone: useRef(null),
    Samsung: useRef(null),
    "Wake Up": useRef(null),
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkForNotifications();
    }, 30000); // check every 30 seconds

    return () => clearInterval(interval);
  }, [reminderDetails, triggeredIds]);

  const checkForNotifications = () => {
    const now = new Date();

    reminderDetails.forEach((reminder) => {
      const reminderDateTime = new Date(
        `${reminder.reminderDate}T${reminder.reminderTime}`
      );

      const nowKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
      const reminderKey = `${reminderDateTime.getFullYear()}-${reminderDateTime.getMonth()}-${reminderDateTime.getDate()} ${reminderDateTime.getHours()}:${reminderDateTime.getMinutes()}`;

      if (
        nowKey === reminderKey &&
        !triggeredIds.has(reminder.dateReminderId)
      ) {
        showNotification(reminder);
        setTriggeredIds((prev) => new Set(prev).add(reminder.dateReminderId));
      }
    });
  };

  const showNotification = (reminder) => {
    alert(
      `🔔 Reminder: ${reminder.reminderTopic || "You have a reminder now!"}`
    );

    const audioName = reminder.ringingTone;
    if (audioName && audioRefs[audioName]?.current) {
      audioRefs[audioName].current
        .play()
        .catch((err) => console.error("Audio play failed:", err));
    }
  };

  const fetchDetails = async () => {
    try {
      const respond = await API.get(`getReminder`);
      setReminderDetails(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  function convertTo12Hour(time24) {
    if (!time24) return "";
    const [hourStr, minuteStr] = time24.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  const handleDelete = async (dateReminderId) => {
    try {
      await API.delete(`deleteReminder?dateReminderId=${dateReminderId}`);
      alert("Deleted Successfully");
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

  const deleteConfirmation = (dateReminderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Reminder?"
    );
    if (confirmDelete) {
      handleDelete(dateReminderId);
    }
  };

  return (
    <Box sx={{ mb: 5 }}>
      {/* Hidden audio players */}
      {Object.entries(audioFiles).map(([name, file]) => (
        <audio key={name} ref={audioRefs[name]} src={file} />
      ))}

      <Typography 
        align="center" 
        variant="h4" 
        sx={{ 
          mt: 4, 
          mb: 3, 
          fontFamily: "Outfit", 
          fontWeight: 700,
        }}
      >
        Your Active Reminders 🔔
      </Typography>

      <TableContainer className="glass-card" sx={{ overflow: "hidden" }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Topic</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Ringtone</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Edit</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminderDetails.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No active reminders scheduled yet.
                </TableCell>
              </TableRow>
            ) : (
              reminderDetails.map((reminder) => (
                <TableRow 
                  key={reminder.dateReminderId}
                  sx={{ "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04)" }, transition: "background-color 0.2s" }}
                >
                  <TableCell sx={{ color: "text.secondary" }}>{reminder.reminderDate?.split("T")[0]}</TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{convertTo12Hour(reminder.reminderTime)}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>{reminder.reminderTopic}</TableCell>
                  <TableCell sx={{ color: "text.secondary", textTransform: "capitalize" }}>
                    🎵 {reminder.ringingTone}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: "8px", textTransform: "none" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      onClick={() => deleteConfirmation(reminder.dateReminderId)}
                      sx={{ borderRadius: "8px", textTransform: "none" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewAddedDatereminder;
