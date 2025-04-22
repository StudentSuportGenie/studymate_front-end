import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
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

    // Clear error if credentials are valid
    setError("");
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Login to AI Study
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome back! Please enter your credentials to continue.
          </Typography>
        </Box>

        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          {/* Login Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Login
          </Button>
        </form>

        {/* Forgot Password Link */}
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer" }}
              onClick={() => alert("Forgot Password Clicked!")}
            >
              Forgot Password?
            </Typography>
          </Grid>
        </Grid>

        {/* Sign Up Section */}
        <Box textAlign="center" sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary">
            Don’t have an account?{" "}
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => alert("Navigate to Sign Up page")}
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;

