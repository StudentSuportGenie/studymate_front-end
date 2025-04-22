import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static" color="primary" sx={{ px: 2 }}>
      <Toolbar>
        {/* Logo / Brand */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          📚 AI Study
        </Typography>

        {/* Navigation Links */}
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/about"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            About Us
          </Button>
          <Button
            component={Link}
            to="/contact"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Contact Us
          </Button>
        </Stack>

        {/* Login Button */}
        <Box ml={3}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 3,
            }}
          >
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;



