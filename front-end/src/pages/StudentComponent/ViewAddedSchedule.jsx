import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
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

  const deleteConformation = (id) => {
    const conformation = window.confirm("Are you sure you want to delete this Schedule?");
    if (conformation) {
      handleDelete(id);
    }
  };

  const calculateEndTime = (startTime, hourCount) => {
    if (!startTime) return "";
    const [hours, minutes] = startTime.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + hourCount, minutes, 0);
    return date.toTimeString().split(" ")[0].substring(0, 5); // "HH:MM"
  };

  const formatDate = (isoDate) => new Date(isoDate).toISOString().split("T")[0];

  return (
    <Box 
      className="glass-card page-enter"
      sx={{
        mt: 4,
        mb: 6,
        p: { xs: 2, md: 3 },
        borderRadius: "24px",
        overflow: "hidden"
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }}>Start Time</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }}>End Time</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }}>Topic</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }}>Hours</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }} align="center">Edit</TableCell>
              <TableCell sx={{ fontFamily: "Outfit", fontWeight: 600 }} align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledata.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4, color: "text.secondary" }}>
                  No schedules added yet.
                </TableCell>
              </TableRow>
            ) : (
              scheduledata.map((row) => {
                const isEditing = editId === row.studentDetailsId;
                const endTime = calculateEndTime(
                  isEditing ? editedRow.scheduleStartTime : row.scheduleStartTime,
                  isEditing ? editedRow.hourCount : row.hourCount
                );
                return (
                  <TableRow 
                    key={row.studentDetailsId}
                    sx={{ 
                      "&:hover": { backgroundColor: "rgba(99, 102, 241, 0.04) !important" },
                      transition: "background-color 0.2s ease"
                    }}
                  >
                    <TableCell sx={{ color: "text.secondary" }}>
                      {isEditing ? (
                        <TextField
                          type="date"
                          name="scheduleDate"
                          value={formatDate(editedRow.scheduleDate)}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        formatDate(row.scheduleDate)
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {isEditing ? (
                        <TextField
                          type="time"
                          name="scheduleStartTime"
                          value={editedRow.scheduleStartTime}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        row.scheduleStartTime.substring(0, 5)
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>{endTime}</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "text.primary" }}>
                      {isEditing ? (
                        <TextField
                          name="scheduleTopic"
                          value={editedRow.scheduleTopic}
                          onChange={handleChange}
                          size="small"
                        />
                      ) : (
                        row.scheduleTopic
                      )}
                    </TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {isEditing ? (
                        <TextField
                          type="number"
                          name="hourCount"
                          value={editedRow.hourCount}
                          onChange={handleChange}
                          size="small"
                          sx={{ width: 80 }}
                        />
                      ) : (
                        row.hourCount
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isEditing ? (
                        <Button 
                          variant="contained" 
                          color="success" 
                          size="small"
                          onClick={handleSaveClick}
                          sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button 
                          variant="outlined" 
                          color="primary" 
                          size="small"
                          onClick={() => handleEditClick(row)}
                          sx={{ borderRadius: "8px", textTransform: "none" }}
                        >
                          Edit
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        size="small"
                        onClick={() => deleteConformation(row.scheduleId)}
                        sx={{ 
                          borderRadius: "8px",
                          textTransform: "none"
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ViewAddedSchedule;
