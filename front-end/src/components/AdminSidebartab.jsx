import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EventIcon from "@mui/icons-material/Event";
import LogoutFunction from "./LogoutFunction";

function AdminSidebartab() {
  return (
    <Box
      className="glass-card page-enter"
      sx={{
        width: "100%",
        p: 1.5,
        mt: 2,
        mb: 2,
        borderRadius: "20px",
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

          <Divider orientation="vertical" flexItem sx={{ borderColor: "divider" }} />

          <NavItem to="/KnowdgleItemAdded" icon={<MenuBookIcon />}>
            Knowledge
          </NavItem>

          <Divider orientation="vertical" flexItem sx={{ borderColor: "divider" }} />

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
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Typography
      component={Link}
      to={to}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.8,
        textDecoration: "none",
        color: isActive ? "primary.main" : "text.secondary",
        fontWeight: 600,
        px: 2,
        py: 1,
        borderRadius: "12px",
        background: isActive ? "rgba(99, 102, 241, 0.12)" : "transparent",
        border: isActive ? "1px solid rgba(99, 102, 241, 0.25)" : "1px solid transparent",
        boxShadow: isActive ? "0 4px 12px rgba(99, 102, 241, 0.08)" : "none",
        transition: "all 0.25s ease",
        "&:hover": {
          color: "primary.main",
          backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.05)",
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
