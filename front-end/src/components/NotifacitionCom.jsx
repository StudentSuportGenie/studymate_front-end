import { Box } from "@mui/material";

function NotificationIcon() {
  return (
    <Box
      sx={{
        position: "absolute", 
        top: 100,
        right: 16, 
      }}
    >
      <Box sx={{ position: "relative", display: "inline-block" }}>
        <img
          width="50"
          height="50"
          src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
          alt="Notification"
        />
        <Box
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
            backgroundColor: "whitesmoke",
            color: "black",
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            fontWeight: "bold",
            boxShadow: 2,
            border: "1px solid lightgray",
            cursor:"pointer"
          }}
        >
          5
        </Box>
      </Box>
    </Box>
  );
}

export default NotificationIcon;
