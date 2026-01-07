import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EventNoteIcon from "@mui/icons-material/EventNote";
import SchoolIcon from "@mui/icons-material/School";
import LogoutFunction from "./LogoutFunction";

function StudentSidetab() {
  return (
    <Box
      sx={{
        width: "98%",
        p: 2,
        background: "#67696aff",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 3,
        marginTop: 2,
        marginBottom: 2,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <NavItem to="/StudentHome" icon={<DashboardIcon />}>
            Dashboard
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />

          <NavItem to="/TimeScheduleAdded" icon={<ScheduleIcon />}>
            Time Schedule
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />

          <NavItem to="/DateReminder" icon={<EventNoteIcon />}>
            Date Reminder
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />

          <NavItem to="/StudentHelper" icon={<SchoolIcon />}>
            Student Helper
          </NavItem>
        </Stack>

        {/* Logout */}
        <LogoutFunction />
      </Stack>
    </Box>
  );
}

function NavItem({ to, icon, children }) {
  return (
    <Typography
      component={Link}
      to={to}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.7,
        textDecoration: "none",
        color: "#fff",
        fontWeight: 500,
        px: 1.5,
        py: 0.7,
        borderRadius: 1.5,
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.15)",
          transform: "translateY(-1px)",
        },
      }}
    >
      {icon}
      {children}
    </Typography>
  );
}

export default StudentSidetab;
