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

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields!");
      return;
    }

    // Handle sign-up logic here (API call, etc.)
    console.log("Signing up with:", name, email, password);
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
            Create Account ✨
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join AI StudyMate today to begin your smarter learning journey! 💡📚
          </Typography>
        </Box>

        {error && (
          <Box sx={{ mb: 2.5, p: 1.5, borderRadius: "10px", backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          </Box>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
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

          {/* Sign Up Button */}
          <Button
            type="submit"
            className="glow-button"
            fullWidth
            size="large"
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Button
              component={Link}
              to="/login"
              variant="text"
              color="secondary"
              sx={{ textTransform: "none", fontWeight: 700 }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
