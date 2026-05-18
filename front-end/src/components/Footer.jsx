import React from "react";
import { Box, Grid, Typography, Link, IconButton, Divider, Container } from "@mui/material";
import { Facebook, Instagram, Twitter, GitHub } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function Footer() {
  return (
    <Box 
      sx={{ 
        background: "var(--footer-bg)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid var(--glass-border)",
        color: "text.primary", 
        padding: "60px 0 30px",
        transition: "all 0.3s ease",
        mt: "auto"
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{ 
                fontFamily: "Outfit", 
                fontWeight: 800,
                background: "linear-gradient(45deg, #818cf8, #ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2
              }}
            >
              📚 AI StudyMate
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 300 }}>
              Your friendly AI assistant for stress-free studying, planning, and academic growth. Learn smarter, not harder. 💻🎓
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 700, mb: 2.5 }}>
              🌐 Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1.5}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="text.secondary" 
                underline="none"
                sx={{ transition: "color 0.2s", "&:hover": { color: "primary.main" } }}
              >
                Home
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="text.secondary" 
                underline="none"
                sx={{ transition: "color 0.2s", "&:hover": { color: "primary.main" } }}
              >
                About Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="text.secondary" 
                underline="none"
                sx={{ transition: "color 0.2s", "&:hover": { color: "primary.main" } }}
              >
                Contact Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/login" 
                color="text.secondary" 
                underline="none"
                sx={{ transition: "color 0.2s", "&:hover": { color: "primary.main" } }}
              >
                Login
              </Link>
            </Box>
          </Grid>

          {/* Contact Details */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 700, mb: 2.5 }}>
              📞 Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: <Link href="mailto:hello@aistudy.com" color="primary.main" underline="none">hello@aistudy.com</Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +94 712 345 678
            </Typography>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 700, mb: 2.5 }}>
              🔗 Follow Us
            </Typography>
            <Box display="flex" gap={1}>
              <IconButton 
                color="inherit" 
                href="#"
                sx={{ 
                  color: "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": { color: "primary.main", transform: "translateY(-3px)" }
                }}
              >
                <Facebook size="small" />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="#"
                sx={{ 
                  color: "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": { color: "secondary.main", transform: "translateY(-3px)" }
                }}
              >
                <Instagram size="small" />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="#"
                sx={{ 
                  color: "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": { color: "primary.main", transform: "translateY(-3px)" }
                }}
              >
                <Twitter size="small" />
              </IconButton>
              <IconButton 
                color="inherit" 
                href="#"
                sx={{ 
                  color: "text.secondary",
                  transition: "all 0.2s",
                  "&:hover": { color: "text.primary", transform: "translateY(-3px)" }
                }}
              >
                <GitHub size="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "var(--glass-border)" }} />

        <Typography variant="body2" align="center" color="text.secondary" sx={{ fontFamily: "Outfit", fontWeight: 500 }}>
          © {new Date().getFullYear()} AI StudyMate. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
