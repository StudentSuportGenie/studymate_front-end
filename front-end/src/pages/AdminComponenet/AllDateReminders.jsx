import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
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
    } catch (error) {
      console.error("Error fetching date reminders:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <AdminSidebartab />
      
      <TableContainer className="glass-card" sx={{ mt: 4, overflow: "hidden" }}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ 
            mt: 4, 
            mb: 3, 
            fontFamily: "Outfit", 
            fontWeight: 700,
            background: "linear-gradient(45deg, #818cf8, #ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Date Reminders 🗓️
        </Typography>
        
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Reminder Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reminder Time</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Reminder Topic</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dateReminders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No date reminders scheduled yet.
                </TableCell>
              </TableRow>
            ) : (
              dateReminders.map((reminder) => (
                <TableRow 
                  key={reminder.dateReminderId}
                  sx={{ "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04)" }, transition: "background-color 0.2s" }}
                >
                  <TableCell sx={{ color: "text.secondary" }}>
                    {new Date(reminder.reminderDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: "text.secondary" }}>{reminder.reminderTime}</TableCell>
                  <TableCell sx={{ fontWeight: 500, color: "text.primary" }}>{reminder.reminderTopic}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AllDateReminders;
