import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Button,
} from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useNavigate } from "react-router-dom";

const team = [
  {
    name: "Neranji Abeysekara",
    role: "Co-Founder | Developer 💻",
    bio: "Loves UI/UX, building cool tools, and making study time smarter and smoother!",
    image: "https://via.placeholder.com/250x250",
  },
  {
    name: "Janod Abesekara",
    role: "Co-Founder | Developer 🚀",
    bio: "Passionate about tech, automation, and helping students with creative tools!",
    image: "https://via.placeholder.com/250x250",
  },
];

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.getItem("studyBuddy");
  }, []);

  const navigatetopage = () => {
    navigate("/ProfieSettings");
  };

  return (
    <Container maxWidth="lg" className="page-enter" sx={{ py: 6 }}>
      {/* Heading */}
      <Box textAlign="center" mb={5}>
        <EmojiObjectsIcon sx={{ fontSize: 60, color: "#fbbf24", animation: "float 4s ease-in-out infinite" }} />
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
          About AI StudyMate 🌟
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: "Outfit", fontWeight: 500, color: "text.secondary" }}>
          Smart tools made by smart students — for smart learning! 🧠💻
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper
        className="glass-card"
        sx={{
          p: { xs: 4, sm: 5 },
          mb: 6,
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            fontFamily: "Outfit", 
            fontWeight: 700,
            background: "linear-gradient(45deg, #a5b4fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3
          }}
        >
          🎯 Our Mission
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", paragraph: true, fontSize: "1.1rem" }}>
          At AI StudyMate, our mission is to revolutionize the way students learn,
          plan, and grow academically. 📚✨ We believe that with the right tools,
          every student can study smarter, not harder.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", paragraph: true, fontSize: "1.1rem" }}>
          We aim to build a digital companion that feels like a friend — one who
          keeps your calendar on track 🗓️, helps you focus better 🎯, and gives
          you helpful nudges so you can reach your goals stress-free 💆‍♀️.
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", fontWeight: 500 }}>
          Together, let’s make study time productive, organized, and even fun! 🚀🎉
        </Typography>
      </Paper>

      <Divider sx={{ mb: 6, opacity: 0.1 }} />

      {/* Team Section */}
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom
        sx={{ fontFamily: "Outfit", fontWeight: 700, mb: 4 }}
      >
        👨‍💻 Meet the Founders
      </Typography>

      <Box textAlign="center" mb={5}>
        <Button 
          variant="contained" 
          className="glow-button"
          onClick={navigatetopage}
          size="large"
        >
          Profile Settings
        </Button>
      </Box>

      {/* 👇 PARALLEL SIDE-BY-SIDE LAYOUT */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={5} key={index}>
            <Card
              className="glass-card"
              sx={{
                textAlign: "center",
                p: { xs: 3, sm: 4 },
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(99, 102, 241, 0.12)"
                }
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    mb: 3,
                    objectFit: "cover",
                    border: "3px solid rgba(99, 102, 241, 0.4)",
                    boxShadow: "0 0 16px rgba(99, 102, 241, 0.2)"
                  }}
                />
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h5" sx={{ fontFamily: "Outfit", fontWeight: 700, mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontFamily: "Outfit", 
                      fontWeight: 600,
                      color: "primary.main",
                      mb: 2
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.02rem" }}>
                    {member.bio}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
