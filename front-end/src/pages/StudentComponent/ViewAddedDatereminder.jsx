import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";

function ViewAddedDatereminder() {
  const [reminderDetails, setreminderdetails] = useState([]);

  useEffect(() => {
    fetchdetails();
  }, []);

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
    console.log(dateReminderId);
    try {
      const respond = await API.delete(
        `deleteReminder?dateReminderId=${dateReminderId}`
      );
      alert("Delete Success fully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box>
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
                  <TableCell>
                    {convertTo12Hour(reminder.reminderTime)}
                  </TableCell>
                  <TableCell>{reminder.reminderTopic}</TableCell>
                  <TableCell>
                    <Button>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handelDelete(reminder.dateReminderId)}
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
