// import React from 'react'
// import AppLayout from '../components/layout/AppLayout'
// import { Box, Typography } from '@mui/material';

// const Home = () => {
//   return (
//     <Box bgcolor={"#1f57c0"} height={"100%"}>
//       <Typography p={"2rem"} variant="h5" textAlign={"center"}>
//         Select a Friend to Chat
//       </Typography>
//     </Box>
//   );
// }

// export default AppLayout(Home);


import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography, Stack } from "@mui/material";
import { chatBodyBg, textSecondary } from "../constants/color";

const Home = () => {
  return (
    <Box
      sx={{
        bgcolor: chatBodyBg, // Midnight Black (#020617)
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ghost Watermark Logo - Very subtle Branding */}
      <Box
        component="img"
        src="/logo.jpg"
        alt="Watermark"
        sx={{
          position: "absolute",
          width: "300px",
          height: "300px",
          opacity: 0.03, // Extremely subtle
          filter: "grayscale(1) brightness(2)",
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <Stack
        spacing={1}
        alignItems={"center"}
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Typography
          variant="h5"
          color="white"
          sx={{
            fontWeight: 600,
            letterSpacing: "1px",
            opacity: 0.8,
          }}
        >
          Welcome to ChatLoop
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: textSecondary,
            fontSize: "0.9rem",
            fontWeight: 300,
          }}
        >
          Select a friend or group to start looping
        </Typography>
      </Stack>
    </Box>
  );
};

export default AppLayout(Home);
