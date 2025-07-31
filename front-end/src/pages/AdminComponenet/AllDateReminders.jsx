import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";
import AdminSidebartab from "../../components/AdminSidebartab";

function AllDateReminders() {
  const [dateReminders, setDateReminders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await API.get("AllDatareminders");
      setDateReminders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching date reminders:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <>
      <AdminSidebartab />
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          All Date Reminders
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reminder Date</TableCell>
              <TableCell>Reminder Time</TableCell>
              <TableCell>Reminder Topic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateReminders.map((reminder) => (
              <TableRow key={reminder.dateReminderId}>
                <TableCell>
                  {new Date(reminder.reminderDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{reminder.reminderTime}</TableCell>
                <TableCell>{reminder.reminderTopic}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AllDateReminders;
