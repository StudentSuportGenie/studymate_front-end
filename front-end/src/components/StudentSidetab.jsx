import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LogoutFunction from "./LogoutFunction";

function StudentSidetab() {
  return (
    <>
      <Box>
        <Typography>
          {" "}
          <Link to="/StudentHome"> DashBord</Link> {">"}{" "}
          <Link to="/TimeScheduleAdded">TimeSchedule</Link> {">"}{" "}
          <Link to="/DateReminder">DateReminder</Link>
          {">"}{" "}
          <LogoutFunction/>
        </Typography>
      </Box>
    </>
  );
}

export default StudentSidetab;
