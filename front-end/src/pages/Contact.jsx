import React, { useState, useRef } from "react";
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
import emailjs from "@emailjs/browser";

function Contact() {
  const formRef = useRef();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_l2dp9oo",        // Your EmailJS service ID
        "template_nymrduf",       // Your EmailJS template ID
        formRef.current,
        "0rTCCPd3w0dUM2d7d"       // Your EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        (error) => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };

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

        <form ref={formRef} onSubmit={sendEmail}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                fullWidth
                required
                variant="outlined"
                name="Name" // Capital N
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Your Email"
                fullWidth
                required
                variant="outlined"
                type="email"
                name="Email" // Capital E
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Subject"
                fullWidth
                required
                variant="outlined"
                name="Subject" // Capital S
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
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
                name="message" // Lowercase m
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
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
