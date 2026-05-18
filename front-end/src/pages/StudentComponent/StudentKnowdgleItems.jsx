import React from "react";
import { Box, Typography } from "@mui/material";
import StudentSidetab from "../../components/StudentSidetab";
import ViewKnowdgleItems from "../AdminComponenet/ViewKnowdgleItems";

function StudentKnowdgleItems() {
  return (
    <Box className="page-enter" sx={{ px: { xs: 2, md: 4 } }}>
      <StudentSidetab />
      
      <Typography
        align="center"
        variant="h4"
        sx={{
          mt: 4,
          mb: 4,
          fontFamily: "Outfit",
          fontWeight: 700,
          background: "linear-gradient(45deg, #818cf8, #ec4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        Academic Knowledge Items 📚
      </Typography>

      <ViewKnowdgleItems showDelete={false} />
    </Box>
  );
}

export default StudentKnowdgleItems;
