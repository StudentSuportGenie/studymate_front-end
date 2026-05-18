import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link, useNavigate } from 'react-router-dom';
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig.jsx";
import { useSelector } from "react-redux";

function Home() {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/StudentHome");
    } else {
      instance.loginRedirect(loginRequest);
    }
  };

  return (
    <Container maxWidth="lg" className="page-enter" sx={{ py: 6 }}>
      {/* 🚀 HERO SECTION */}
      <Grid container spacing={6} alignItems="center" sx={{ mb: 10, mt: { xs: 0, md: 2 } }}>
        <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Box 
            sx={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 1, 
              px: 2, 
              py: 0.8, 
              borderRadius: "20px", 
              background: "rgba(99, 102, 241, 0.1)", 
              color: "primary.main",
              mb: 3,
              border: "1px solid rgba(99, 102, 241, 0.2)"
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 16 }} />
            <Typography variant="body2" sx={{ fontFamily: "Outfit", fontWeight: 600 }}>
              AI-Powered Academic Companion
            </Typography>
          </Box>
          <Typography 
            variant="h2" 
            sx={{
              fontFamily: "Outfit",
              fontWeight: 800,
              background: "linear-gradient(45deg, #818cf8, #ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2.5,
              lineHeight: 1.1,
              fontSize: { xs: "2.8rem", sm: "3.5rem", md: "4.2rem" }
            }}
          >
            Smarter Learning, Made Effortless.
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ fontFamily: "Outfit", mb: 4, lineHeight: 1.6, fontWeight: 400 }}>
            StudyMate is your intelligent study assistant. Plan your schedule, set smart date reminders, scan study materials with OCR, and optimize your academic progress stress-free.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" }, flexDirection: { xs: "column", sm: "row" } }}>
            <Button 
              onClick={handleGetStarted}
              className="glow-button" 
              size="large" 
              sx={{ px: 4, textTransform: "none", fontFamily: "Outfit", fontWeight: 600 }}
            >
              {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            </Button>
            <Button 
              component={Link} 
              to="/about" 
              variant="outlined" 
              color="primary" 
              size="large" 
              sx={{ borderRadius: "12px", px: 4, textTransform: "none", fontFamily: "Outfit", fontWeight: 600 }}
            >
              Meet The Founders
            </Button>
          </Box>
        </Grid>

        {/* HERO MOCK DASHBOARD VISUAL */}
        <Grid item xs={12} md={6}>
          <Card 
            className="glass-card" 
            sx={{ 
              p: 4, 
              position: "relative", 
              overflow: "hidden", 
              display: "flex", 
              flexDirection: "column", 
              gap: 3,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.08)",
              animation: "float 6s ease-in-out infinite"
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 700 }}>
                🚀 Study Stats Dashboard
              </Typography>
              <Box 
                sx={{ 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: "20px", 
                  background: "rgba(20, 184, 166, 0.15)", 
                  color: "#14b8a6", 
                  fontSize: "0.8rem", 
                  fontWeight: 700 
                }}
              >
                LIVE PROGRESS
              </Box>
            </Box>
            
            <Divider sx={{ borderColor: "var(--glass-border)" }} />
            
            <Grid container spacing={2.5}>
              <Grid item xs={6}>
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: "16px", 
                    background: "rgba(99, 102, 241, 0.04)", 
                    border: "1px solid var(--glass-border)",
                    textAlign: "center"
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Focus Hours</Typography>
                  <Typography variant="h4" sx={{ fontFamily: "Outfit", fontWeight: 800, mt: 0.5, color: "primary.main" }}>
                    42.5 hrs
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box 
                  sx={{ 
                    p: 2, 
                    borderRadius: "16px", 
                    background: "rgba(236, 72, 153, 0.04)", 
                    border: "1px solid var(--glass-border)",
                    textAlign: "center"
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Tasks Done</Typography>
                  <Typography variant="h4" sx={{ fontFamily: "Outfit", fontWeight: 800, mt: 0.5, color: "secondary.main" }}>
                    94%
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 2, 
                p: 2, 
                borderRadius: "16px", 
                background: "rgba(20, 184, 166, 0.04)", 
                border: "1px solid var(--glass-border)" 
              }}
            >
              <Box sx={{ width: 10, height: 10, borderRadius: "50%", background: "#14b8a6", animation: "pulse 2s infinite" }} />
              <Typography variant="body2" color="text.secondary">
                Next Reminder: <strong>Database Exam Prep</strong> at 5:00 PM
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 8, borderColor: "var(--glass-border)", opacity: 0.5 }} />

      {/* ⚡ FEATURES TITLE */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography 
          variant="h3" 
          sx={{ 
            fontFamily: "Outfit", 
            fontWeight: 800, 
            mb: 1.5,
            fontSize: { xs: "2rem", sm: "2.5rem" }
          }}
        >
          Explore Our Powerful Features ⚡
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Everything you need to master your calendar, notes, goals, and focus points in one premium study assistant.
        </Typography>
      </Box>

      {/* 📦 CARD FEATURE GRID */}
      <Grid container spacing={4} justifyContent="center">
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card 
            className="glass-card" 
            sx={{ 
              textAlign: 'center', 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(99, 102, 241, 0.1)"
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <SchoolIcon sx={{ fontSize: 50, color: "primary.main", animation: "float 4s ease-in-out infinite", mb: 1 }} />
              <Typography variant="h5" sx={{ mt: 2, mb: 1, fontFamily: "Outfit", fontWeight: 700 }}>
                AI Study Guide
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Scan, upload, and extract study summaries using intelligent OCR reading capabilities. 🤓
              </Typography>
            </CardContent>
            <Box sx={{ mt: 4 }}>
              <Button 
                component={Link}
                to="/StudentHelper"
                fullWidth 
                className="glow-button"
              >
                Explore Guide
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card 
            className="glass-card" 
            sx={{ 
              textAlign: 'center', 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(99, 102, 241, 0.1)"
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <CalendarMonthIcon sx={{ fontSize: 50, color: "secondary.main", animation: "float 5s ease-in-out infinite", mb: 1 }} />
              <Typography variant="h5" sx={{ mt: 2, mb: 1, fontFamily: "Outfit", fontWeight: 700 }}>
                Study Calendar
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Track daily academic targets, schedule subjects, and trigger sound reminders automatically. 🗓️
              </Typography>
            </CardContent>
            <Box sx={{ mt: 4 }}>
              <Button 
                component={Link}
                to="/TimeScheduleAdded"
                fullWidth 
                variant="contained" 
                color="secondary"
                sx={{ borderRadius: "12px", textTransform: "none", py: 1, fontFamily: "Outfit", fontWeight: 600 }}
              >
                Plan Now
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card 
            className="glass-card" 
            sx={{ 
              textAlign: 'center', 
              p: 4, 
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: "0 12px 30px rgba(99, 102, 241, 0.1)"
              }
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <AccountCircleIcon sx={{ fontSize: 50, color: "success.main", animation: "float 6s ease-in-out infinite", mb: 1 }} />
              <Typography variant="h5" sx={{ mt: 2, mb: 1, fontFamily: "Outfit", fontWeight: 700 }}>
                Your Profile
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Manage custom profile settings, gender declarations, birthdates, and profile pictures. 🎯
              </Typography>
            </CardContent>
            <Box sx={{ mt: 4 }}>
              <Button 
                component={Link}
                to="/StudentHome"
                fullWidth 
                variant="outlined" 
                color="primary"
                sx={{ borderRadius: "12px", textTransform: "none", py: 1, fontFamily: "Outfit", fontWeight: 600 }}
              >
                View Profile
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
