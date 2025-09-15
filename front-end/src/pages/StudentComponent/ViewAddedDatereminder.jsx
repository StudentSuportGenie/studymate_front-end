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
    }, 30000); // ✅ check every 30 seconds

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
      console.log(respond.data);
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
      alert("Delete Successfully");
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
    <>
      {/* Hidden audio players */}
      {Object.entries(audioFiles).map(([name, file]) => (
        <audio key={name} ref={audioRefs[name]} src={file} />
      ))}

      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography textAlign="center" variant="h6" sx={{ margin: "10px" }}>
          Your Added Reminders
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Audio</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reminderDetails.map((reminder) => (
                <TableRow key={reminder.dateReminderId}>
                  <TableCell>{reminder.reminderDate?.split("T")[0]}</TableCell>
                  <TableCell>{convertTo12Hour(reminder.reminderTime)}</TableCell>
                  <TableCell>{reminder.reminderTopic}</TableCell>
                  <TableCell>{reminder.ringingTone}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteConfirmation(reminder.dateReminderId)}
                      sx={{ bgcolor: "red", color: "white" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ViewAddedDatereminder;
