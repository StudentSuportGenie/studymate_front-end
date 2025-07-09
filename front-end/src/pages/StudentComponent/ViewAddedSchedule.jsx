import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import API from "../../Context/Axiox";

function ViewAddedSchedule() {
  const [scheduledata, setscheduledata] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedRow, setEditedRow] = useState({});

  useEffect(() => {
    fetchscheduledata();
  }, []);

  const fetchscheduledata = async () => {
    try {
      const respond = await API.get("getalldetails");
      setscheduledata(respond.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (row) => {
    setEditId(row.studentDetailsId);
    setEditedRow({ ...row });
  };

  const handleSaveClick = async () => {
    try {
      const formattedRow = {
        ...editedRow,
        scheduleStartTime: formatTimeToHHMMSS(editedRow.scheduleStartTime),
      };

      await API.put("UpdateDetails", formattedRow);
      alert("Updated successfully");
      setEditId(null);
      fetchscheduledata();
    } catch (error) {
      console.log(error);
    }
  };

  const formatTimeToHHMMSS = (time) => {
    if (!time) return "";
    return time.length === 5 ? `${time}:00` : time;
  };

  const handleChange = (e) => {
    setEditedRow({
      ...editedRow,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`deleteDetails?scheduleId=${id}`);
      alert("Deleted successfully");
      fetchscheduledata();
    }catch (error) {
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

  const deleteConformation = (id) => {
    const conformation = window.confirm("Are you sure you wanto delete this Schedule ?");
    if(conformation) {
      handleDelete(id);
    }
  }

  const calculateEndTime = (startTime, hourCount) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + hourCount, minutes, 0);
    return date.toTimeString().split(" ")[0].substring(0, 5); // "HH:MM"
  };

  const formatDate = (isoDate) => new Date(isoDate).toISOString().split("T")[0];

  return (
    <Box sx={{
      mt:4,
      mb:5,
    }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell>Hours</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledata.map((row) => {
              const isEditing = editId === row.studentDetailsId;
              const endTime = calculateEndTime(
                isEditing ? editedRow.scheduleStartTime : row.scheduleStartTime,
                isEditing ? editedRow.hourCount : row.hourCount
              );
              return (
                <TableRow key={row.studentDetailsId}>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        type="date"
                        name="scheduleDate"
                        value={formatDate(editedRow.scheduleDate)}
                        onChange={handleChange}
                      />
                    ) : (
                      formatDate(row.scheduleDate)
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        type="time"
                        name="scheduleStartTime"
                        value={editedRow.scheduleStartTime}
                        onChange={handleChange}
                      />
                    ) : (
                      row.scheduleStartTime.substring(0, 5)
                    )}
                  </TableCell>
                  <TableCell>{endTime}</TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        name="scheduleTopic"
                        value={editedRow.scheduleTopic}
                        onChange={handleChange}
                      />
                    ) : (
                      row.scheduleTopic
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <TextField
                        type="number"
                        name="hourCount"
                        value={editedRow.hourCount}
                        onChange={handleChange}
                      />
                    ) : (
                      row.hourCount
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Button onClick={handleSaveClick}>Save</Button>
                    ) : (
                      <Button onClick={() => handleEditClick(row)}>Edit</Button>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteConformation(row.scheduleId)} sx={{
                      bgcolor:"red",
                      color:"white"
                      
                    }}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewAddedSchedule;
