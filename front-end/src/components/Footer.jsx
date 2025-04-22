import React from "react";
import { Box, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, GitHub } from "@mui/icons-material";

function Footer() {
  return (
    <Box sx={{ backgroundColor: "#2f2f87", color: "white", padding: "40px 20px" }}>
      <Grid container spacing={4}>
        {/* About */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>📚 AI Study</Typography>
          <Typography variant="body2">
            Your friendly AI assistant for stress-free studying 💻🎓
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>🌐 Quick Links</Typography>
          <Box display="flex" flexDirection="column" gap={1}>
            <Link href="/" color="inherit" underline="hover">Home</Link>
            <Link href="/about" color="inherit" underline="hover">About Us</Link>
            <Link href="/contact" color="inherit" underline="hover">Contact</Link>
            <Link href="/login" color="inherit" underline="hover">Login</Link>
          </Box>
        </Grid>

        {/* Contact */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>📞 Contact</Typography>
          <Typography variant="body2">Email: hello@aistudy.com</Typography>
          <Typography variant="body2">Phone: +94 712 345 678</Typography>
        </Grid>

        {/* Social Icons */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>🔗 Follow Us</Typography>
          <Box display="flex" gap={2}>
            <IconButton color="inherit" href="#"><Facebook /></IconButton>
            <IconButton color="inherit" href="#"><Instagram /></IconButton>
            <IconButton color="inherit" href="#"><Twitter /></IconButton>
            <IconButton color="inherit" href="#"><GitHub /></IconButton>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: "white" }} />

      <Typography variant="body2" align="center">
        © 2025 AI Study Assistant 
      </Typography>
    </Box>
  );
}

export default Footer;

