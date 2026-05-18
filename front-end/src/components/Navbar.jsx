import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Stack, IconButton } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logoutSuccess } from "../store/authSlice";
import { loginRequest } from "../authConfig.jsx";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "../ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Navbar() {
  const { instance, accounts } = useMsal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { mode, toggleThemeMode } = useThemeMode();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  useEffect(() => {
    if (accounts.length > 0 && !isAuthenticated) {
      instance
        .acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        .then((response) => {
          // Dispatch login to Redux store
          dispatch(loginSuccess(response.idToken));

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
        })
        .catch((error) => {
          console.error("Silent token acquisition failed:", error);
        });
    }
  }, [accounts, instance, isAuthenticated, dispatch, navigate]);


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
        <Stack direction="row" spacing={2} alignItems="center">
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

          {/* Theme Mode Toggle Button */}
          <IconButton 
            onClick={toggleThemeMode} 
            color="inherit" 
            sx={{ 
              ml: 1, 
              transition: "transform 0.3s ease", 
              "&:hover": { transform: "rotate(20deg) scale(1.1)" } 
            }}
          >
            {mode === "dark" ? (
              <LightModeIcon sx={{ color: "#fbbf24" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#ffffff" }} />
            )}
          </IconButton>
        </Stack>

        {/* Dynamic Auth Section */}
        {isAuthenticated ? (
          <Stack direction="row" spacing={2} alignItems="center" ml={3}>
            <Typography variant="body2" sx={{ color: "white", fontWeight: "medium" }}>
              Hi, {user?.name || "User"}
            </Typography>
            <Button
              component={Link}
              to={user?.role === "Admin" ? "/AdminHome" : "/StudentHome"}
              variant="outlined"
              color="inherit"
              sx={{ textTransform: "none", borderRadius: "20px" }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => {
                dispatch(logoutSuccess());
                instance.logoutRedirect({
                  postLogoutRedirectUri: "http://localhost:5173",
                });
              }}
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: "20px",
                px: 3,
              }}
            >
              Logout
            </Button>
          </Stack>
        ) : (
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
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

