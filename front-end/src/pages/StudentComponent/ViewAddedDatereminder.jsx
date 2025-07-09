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
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";

function ViewAddedDatereminder() {
  const [reminderDetails, setreminderdetails] = useState([]);

  useEffect(() => {
    fetchdetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      checkForNotifications();
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [reminderDetails]); // Now listens to changes

  const checkForNotifications = () => {
    const now = new Date();

    reminderDetails.forEach((reminder) => {
      const reminderDateTime = new Date(`${reminder.reminderDate}T${reminder.reminderTime}`);
      const timeDiff = Math.abs(now.getTime() - reminderDateTime.getTime());

      if (timeDiff < 1000) {
        showNotification(reminder);
      }
    });
  };

  const showNotification = (reminder) => {
    alert(`🔔 Reminder: ${reminder.reminderTopic || 'You have a reminder now!'}`);
  };

  const fetchdetails = async () => {
    try {
      const respond = await API.get(`getReminder`);
      setreminderdetails(respond.data);
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

  const handelDelete = async (dateReminderId) => {
    try {
      const respond = await API.delete(
        `deleteReminder?dateReminderId=${dateReminderId}`
      );
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

  const deleteConformation = (dateReminderId) => {
    const conformdelete = window.confirm(
      "Are you sure you want to delete this Reminder?"
    );
    if (conformdelete) {
      handelDelete(dateReminderId);
    }
  };

  return (
    <>
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography textAlign="center" variant="h6" sx={{ margin: "10px" }}>
          Your Added Reminders
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>reminderDate</TableCell>
                <TableCell>reminderTime</TableCell>
                <TableCell>reminderTopic</TableCell>
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
                  <TableCell>
                    <Button>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        deleteConformation(reminder.dateReminderId)
                      }
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
