import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button, Typography, Box, Stack } from "@mui/material";

const Login = () => {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["https://studentsupportdemo.onmicrosoft.com/api/user.read"],
      authority:
        "https://studtSupportdemo.b2clogin.com/studtSupportdemo.onmicrosoft.com/B2C_1_study",
    });
  };

  const handlePasswordReset = () => {
    instance.loginRedirect({
      authority:
        "https://studtSupportdemo.b2clogin.com/studtSupportdemo.onmicrosoft.com/B2C_1_reset",
    });
  };

  const handleProfileEdit = () => {
    instance.loginRedirect({
      authority:
        "https://studtSupportdemo.b2clogin.com/studtSupportdemo.onmicrosoft.com/B2C_1_profileEdir",
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173/",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the App
      </Typography>
      <Stack spacing={2} direction="column">
        {!accounts.length ? (
          <>
            <Button variant="contained" onClick={handleLogin}>
              Sign in
            </Button>
            <Button variant="outlined" onClick={handlePasswordReset}>
              Reset Password
            </Button>
            <Button variant="outlined" onClick={handleProfileEdit}>
              Edit Profile
            </Button>
          </>
        ) : (
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Login;
