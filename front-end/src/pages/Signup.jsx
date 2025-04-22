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

    // Clear error if credentials are valid
    setError("");
  };

  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" gutterBottom>
            Sign Up for AI Study
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create a new account to get started with smarter learning! 💡📚
          </Typography>
        </Box>

        {error && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
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

          {/* Sign Up Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Sign Up
          </Button>
        </form>

        {/* Login Link */}
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <Grid item>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Already have an account?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={() => alert("Navigate to Login page")}
              >
                Login
              </Button>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default SignUp;

