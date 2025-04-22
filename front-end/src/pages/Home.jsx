import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Home() {
  return (
    <Box
      sx={{
        minHeight: '90vh', // fills most of the screen
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // vertical center
        alignItems: 'center',     // horizontal center
        textAlign: 'center',
        px: 2
      }}
    >
      <Typography variant="h3" gutterBottom>
        📚 Welcome to AI StudyMate!
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Your smart study assistant to plan, learn, and grow 💡✨
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 2, maxWidth: '1000px' }}>
        {/* Card 1 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <SchoolIcon fontSize="large" color="primary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                AI Study Guide
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Personalized notes, tips, and quizzes 🤓
              </Typography>
              <Button sx={{ mt: 2 }} variant="contained">Explore</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <CalendarMonthIcon fontSize="large" color="secondary" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Study Calendar
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your daily study plans and goals 🗓️
              </Typography>
              <Button sx={{ mt: 2 }} variant="contained" color="secondary">Plan Now</Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: 'center', p: 2 }}>
            <CardContent>
              <AccountCircleIcon fontSize="large" color="success" />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Your Profile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                See progress, achievements & scores 🎯
              </Typography>
              <Button sx={{ mt: 2 }} variant="contained" color="success">View</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;


