import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
} from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";

function Contact() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Box textAlign="center" mb={3}>
          <ContactMailIcon color="primary" sx={{ fontSize: 50 }} />
          <Typography variant="h4" gutterBottom>
            Contact Us 📬
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Have questions, feedback, or just want to say hi? We'd love to hear
            from you! 😊
          </Typography>
        </Box>

        <form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Email"
                fullWidth
                required
                variant="outlined"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Message"
                multiline
                rows={4}
                fullWidth
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ px: 5, py: 1.5, borderRadius: 2 }}
              >
                Send Message ✉️
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Contact;

