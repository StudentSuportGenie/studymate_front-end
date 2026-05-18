import React, { useState, useRef } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
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
        "service_l2dp9oo",        
        "template_nymrduf",      
        formRef.current,
        "0rTCCPd3w0dUM2d7d"       
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
        () => {
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <Container maxWidth="sm" className="page-enter" sx={{ py: 6 }}>
      <Box className="glass-card" sx={{ p: { xs: 3, md: 4 } }}>
        <Box textAlign="center" mb={4}>
          <ContactMailIcon sx={{ fontSize: 50, color: "primary.main", mb: 1, animation: "float 4s ease-in-out infinite" }} />
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
            Contact Us 📬
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Have questions, feedback, or just want to say hi? We'd love to hear
            from you! 😊
          </Typography>
        </Box>

        <form ref={formRef} onSubmit={sendEmail}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <TextField
                label="Your Name"
                fullWidth
                required
                variant="outlined"
                name="Name"
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
                name="Email"
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
                name="Subject"
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
                name="message"
                value={Message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
              <Button
                type="submit"
                className="glow-button"
                fullWidth
                size="large"
              >
                Send Message ✉️
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Contact;
