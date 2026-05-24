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

const Home = () => {
  return (
    <Box
      sx={{
        background: "var(--bg-primary)",

        height: "100%",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        justifyContent: "center",

        position: "relative",

        overflow: "hidden",

        transition: "0.25s ease",
      }}
    >
      {/* WATERMARK */}

      <Box
        component="img"
        src="/logof.png"
        alt="Watermark"
        sx={{
          position: "absolute",

          width: {
            xs: 180,
            sm: 260,
            md: 320,
          },

          height: {
            xs: 180,
            sm: 260,
            md: 320,
          },

          opacity: 0.04,

          filter: "grayscale(1)",

          pointerEvents: "none",

          userSelect: "none",
        }}
      />

      {/* CONTENT */}

      <Stack
        spacing={1}
        alignItems={"center"}
        sx={{
          position: "relative",

          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,

            color: "var(--text-primary)",

            letterSpacing: "-0.5px",

            textAlign: "center",
          }}
        >
          Welcome to ChatLoop
        </Typography>

        <Typography
          sx={{
            color: "var(--text-secondary)",

            fontSize: "0.95rem",

            textAlign: "center",
          }}
        >
          Select a chat to start messaging
        </Typography>
      </Stack>
    </Box>
  );
};

export default AppLayout(Home);
