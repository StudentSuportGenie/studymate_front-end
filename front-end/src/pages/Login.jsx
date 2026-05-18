import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    // Handle login logic here (API call, etc.)
    console.log("Logging in with:", email, password);
    setError("");
  };

  return (
    <Container maxWidth="xs" className="page-enter" sx={{ py: 8 }}>
      <Box className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
        <Box textAlign="center" mb={4}>
          <Typography 
            variant="h3" 
            gutterBottom
            sx={{
              fontFamily: "Outfit",
              fontWeight: 800,
              background: "linear-gradient(45deg, #818cf8, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}
          >
            Welcome Back Key 🔑
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please enter your credentials to access your StudyMate.
          </Typography>
        </Box>

        {error && (
          <Box sx={{ mb: 2.5, p: 1.5, borderRadius: "10px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          </Box>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
            required
          />

          {/* Login Button */}
          <Button
            type="submit"
            className="glow-button"
            fullWidth
            size="large"
          >
            Login
          </Button>
        </form>

        {/* Forgot Password Link */}
        <Grid container justifyContent="flex-end" sx={{ mt: 2.5 }}>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", fontWeight: 600, "&:hover": { color: "secondary.main" } }}
              onClick={() => alert("Forgot Password feature under development.")}
            >
              Forgot Password?
            </Typography>
          </Grid>
        </Grid>

        {/* Sign Up Section */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account yet?{" "}
            <Button
              component={Link}
              to="/signup"
              variant="text"
              color="secondary"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
