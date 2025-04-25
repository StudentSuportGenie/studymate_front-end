import React from "react";
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
import { Link } from "react-router-dom";

const team = [
  {
    name: "Neranji Abeysekara",
    role: "Co-Founder | Developer 💻",
    bio: "Loves UI/UX, building cool tools, and making study time smarter and smoother!",
    image: "https://via.placeholder.com/250x250", // Replace with your photo later
  },
  {
    name: "Janod Abesekara",
    role: "Co-Founder | Developer 🚀",
    bio: "Passionate about tech, automation, and helping students with creative tools!",
    image: "https://via.placeholder.com/250x250", // Replace with Janod’s photo later
  },
];

function About() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
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
        <Typography variant="body1" color="text.secondary" paragraph>
          At AI StudyMate, our mission is to revolutionize the way students
          learn, plan, and grow academically. 📚✨ We believe that with the
          right tools, every student can study smarter, not harder.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We aim to build a digital companion that feels like a friend — one who
          keeps your calendar on track 🗓️, helps you focus better 🎯, and gives
          you helpful nudges so you can reach your goals stress-free 💆‍♀️.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our platform combines simplicity with smartness using AI and
          human-centered design. We’re not just building features — we’re
          building better student lives 🧠💡.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We’re here to empower learners like you, who dream big, hustle hard,
          and need a study buddy that actually understands 💪❤️. Together, let’s
          make study time productive, organized, and even a little bit fun! 🚀🎉
        </Typography>
      </Paper>

      {/* Divider */}
      <Divider sx={{ mb: 6 }} />

      {/* Team Section */}
      <Typography variant="h5" align="center" gutterBottom>
        👨‍💻 Meet the Founders
      </Typography>

      <Grid container spacing={4} justifyContent="center" mt={2}>
        {team.map((member, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              sx={{
                textAlign: "center",
                borderRadius: 3,
                p: 2,
                boxShadow: 3,
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
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
