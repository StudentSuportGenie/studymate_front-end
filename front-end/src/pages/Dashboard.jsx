import React, { useState } from "react";
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Paper, Box } from "@mui/material";
import { CalendarToday, Chat, AccountCircleOutlined } from "@mui/icons-material";
import Calendar from "react-calendar"; // You can use any calendar package for React

function Dashboard() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h4" gutterBottom>
          Welcome to your Dashboard! 🚀
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Stay organized, ask questions, and manage your learning journey 📚✨
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Calendar Section */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
            <CalendarToday sx={{ fontSize: 40, color: "primary.main" }} />
            <CardContent>
              <Typography variant="h6">Your Calendar 📅</Typography>
              <Typography variant="body1" color="text.secondary">
                Stay on top of your schedule! Set up reminders, deadlines, and events here.
              </Typography>
            </CardContent>
            <CardActions>
              {/* Render the calendar */}
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
                maxDate={new Date(2025, 11, 31)}
                sx={{
                  width: "100%",
                  marginTop: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              />
            </CardActions>
          </Card>
        </Grid>

        {/* AI Chat Section */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
            <Chat sx={{ fontSize: 40, color: "secondary.main" }} />
            <CardContent>
              <Typography variant="h6">Ask AI your Questions 🤖</Typography>
              <Typography variant="body1" color="text.secondary">
                Have a question? Our AI chat is here to assist you! Just ask away.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="secondary" sx={{ mt: 2 }}>
                Chat with AI
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* User Profile Section */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 3 }}>
            <AccountCircleOutlined sx={{ fontSize: 40, color: "primary.main" }} />
            <CardContent>
              <Typography variant="h6">Profile</Typography>
              <Typography variant="h4" color="primary">
                John Doe
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined" color="primary">
                Edit Profile
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

