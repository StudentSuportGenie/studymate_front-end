import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Stack } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { instance, accounts } = useMsal();
  const navigate = useNavigate();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  useEffect(() => {
    if (accounts.length > 0) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          sessionStorage.setItem("studyBuddy", response.idToken);

          const decode = jwtDecode(response.idToken);
          const Role = decode.jobTitle;

          console.log(Role);

          if (Role === "Student") {
            navigate("/StudentHome");
          } else if (Role === "Admin") {
            navigate("/AdminHome");
          } else {
            navigate("/");
          }
        });
    }
  }, [accounts, instance]);

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
          <Button
            component={Link}
            to="/StudentHelper"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
             Student Helper
          </Button>
        </Stack>

        {/* Login Button */}
        <Box ml={3}>
          <Button
            onClick={handleLogin}
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