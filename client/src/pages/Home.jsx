import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography, Stack } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        // WhatsApp Dark Chat Area Background
        background: "#0b141a",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* WATERMARK - Subtle Branding */}
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
          height: "auto",
          opacity: 0.03, // Ekdum halka watermark
          filter: "grayscale(1)",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {/* CONTENT - Professional Muted Look */}
      <Stack
        spacing={1.5}
        alignItems={"center"}
        sx={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600, // Medium bold
            fontSize: { xs: "1.5rem", md: "2rem" },
            color: "#e9edef", // Soft Ivory
            letterSpacing: "-0.5px",
            textAlign: "center",
          }}
        >
          ChatLoop 
        </Typography>

        <Typography
          sx={{
            color: "#8696a0", // Muted Grey
            fontSize: "0.9rem",
            textAlign: "center",
            maxWidth: "350px",
            lineHeight: 1.5,
          }}
        >
          Find your crew. Start the conversation
          <br />
          Select a chat to get started
        </Typography>
      </Stack>

      {/* Footer Line - WhatsApp Desktop signature */}
      <Box
        sx={{
          position: "absolute",
          bottom: "40px",
          color: "#667781",
          fontSize: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <span style={{ fontSize: "1rem" }}>🔒</span> End-to-end encrypted
      </Box>
    </Box>
  );
};

export default AppLayout(Home);
