import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import LogoutFunction from "./LogoutFunction";

function AdminSidebartab() {
  return (
    <Box
      sx={{
        width: "98%",
        p: 2,
        marginTop: 2,
        marginBottom: 2,
        background: "#67696aff",
        color: "#fff",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <NavItem to="/AdminHome" icon={<HomeIcon />}>
            Home
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />

          <NavItem to="/KnowdgleItemAdded" icon={<MenuBookIcon />}>
            Knowledge
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ bgcolor: "#fff" }} />

          <NavItem to="/AllDateReminders" icon={<EventIcon />}>
            Date Reminder
          </NavItem>
        </Stack>

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

export default AdminSidebartab;
