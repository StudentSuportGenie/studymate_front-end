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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Heading */}
      <Box textAlign="center" mb={5}>
        <EmojiObjectsIcon color="warning" sx={{ fontSize: 60 }} />
        <Typography variant="h4" gutterBottom>
          About AI StudyMate 🌟
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Smart tools made by smart students — for smart learning! 🧠💻
        </Typography>
      </Box>

      {/* Mission Section */}
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 6,
          borderRadius: 3,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          🎯 Our Mission
        </Typography>
        <Typography color="text.secondary" paragraph>
          At AI StudyMate, our mission is to revolutionize the way students learn,
          plan, and grow academically. 📚✨ We believe that with the right tools,
          every student can study smarter, not harder.
        </Typography>
        <Typography color="text.secondary" paragraph>
          We aim to build a digital companion that feels like a friend — one who
          keeps your calendar on track 🗓️, helps you focus better 🎯, and gives
          you helpful nudges so you can reach your goals stress-free 💆‍♀️.
        </Typography>
        <Typography color="text.secondary">
          Together, let’s make study time productive, organized, and even fun! 🚀🎉
        </Typography>
      </Paper>

      <Divider sx={{ mb: 6 }} />

      {/* Team Section */}
      <Typography variant="h5" align="center" gutterBottom>
        👨‍💻 Meet the Founders
      </Typography>

      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={navigatetopage}>
          Profile
        </Button>
      </Box>

      {/* 👇 FIXED GRID LAYOUT */}
      <Grid container spacing={4} justifyContent="center">
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
            <Card
              sx={{
                textAlign: "center",
                borderRadius: 3,
                p: 2,
                boxShadow: 3,
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                image={member.image}
                alt={member.name}
                sx={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  mx: "auto",
                  mt: 2,
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {member.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default About;
