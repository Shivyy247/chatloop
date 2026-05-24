import { Avatar, Stack, Typography, Box } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import React from "react";
import moment from "moment";
import { transfromImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"2.5rem"} // Increased for better breathing space
      alignItems={"center"}
      sx={{
        height: "100%",
        padding: "2rem 1.5rem",
        background: "var(--bg-sidebar)", // #18191D - Matching the sidebar
        overflowY: "auto",
        position: "relative",
        "&::-webkit-scrollbar": { width: "4px" },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.1)",
          borderRadius: "10px",
        },
      }}
    >
      {/* Subtle Glow - Kam kiya taaki distracting na ho */}
      <Box
        sx={{
          position: "absolute",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          background: "var(--primary-light)",
          filter: "blur(90px)",
          top: "-30px",
          right: "-30px",
          opacity: 0.4,
        }}
      />

      {/* PROFILE TOP */}
      <Stack
        spacing={"2rem"}
        alignItems={"center"}
        sx={{
          height: "100%",
          padding: "2rem 1.5rem",
          bgcolor: "#111b21",
          overflowY: "auto", // Scroll allow karega par dikhayega nahi niche waali properties se

          // Hide scrollbar for Chrome, Safari and Opera
          "&::-webkit-scrollbar": {
            display: "none",
          },
          // Hide scrollbar for IE, Edge and Firefox
          msOverflowStyle: "none" /* IE and Edge */,
          scrollbarWidth: "none" /* Firefox */,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={transfromImage(user?.avatar?.url)}
            sx={{
              width: 124,
              height: 124,
              border: "3px solid var(--bg-card)",
              boxShadow: "0 12px 24px rgba(0,0,0,0.4)",
            }}
          />
          {/* Online Status Dot */}
          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "var(--primary)",
              border: "3px solid var(--bg-sidebar)",
              position: "absolute",
              bottom: 8,
              right: 8,
            }}
          />
        </Box>

        <Stack spacing={0.2} alignItems={"center"}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "1.25rem",
              color: "var(--text-primary)",
              letterSpacing: "-0.3px",
            }}
          >
            {user?.name}
          </Typography>
          <Typography
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              opacity: 0.8,
            }}
          >
            @{user?.username}
          </Typography>
        </Stack>
      </Stack>

      {/* INFO CARDS SECTION */}
      <Stack
        spacing={"0.75rem"}
        width={"100%"}
        sx={{ position: "relative", zIndex: 2 }}
      >
        <ProfileCard
          heading="Bio"
          text={user?.bio || "Hey there! I am using ChatLoop."}
          icon={<InfoIcon sx={{ fontSize: "1.2rem" }} />}
        />
        <ProfileCard
          heading="Username"
          text={user?.username}
          icon={<UserNameIcon sx={{ fontSize: "1.2rem" }} />}
        />
        <ProfileCard
          heading="Name"
          text={user?.name}
          icon={<FaceIcon sx={{ fontSize: "1.2rem" }} />}
        />
        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).format("MMMM Do, YYYY")} // Professional date format
          icon={<CalendarIcon sx={{ fontSize: "1.2rem" }} />}
        />
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={"1rem"}
    alignItems={"center"}
    sx={{
      background: "rgba(255,255,255,0.02)",
      borderRadius: "12px", // Matching AppLayout design
      padding: "1rem",
      border: "1px solid var(--border-color)",
      transition: "all 0.2s ease",
      "&:hover": {
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(255,255,255,0.1)",
      },
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "10px",
        background: "rgba(255,255,255,0.03)",
        color: "var(--primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: "1px solid var(--border-color)",
      }}
    >
      {icon}
    </Box>

    <Stack spacing={0.1} sx={{ overflow: "hidden" }}>
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: "var(--text-secondary)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {heading}
      </Typography>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "0.95rem",
          color: "var(--text-primary)",
          wordBreak: "break-word",
        }}
      >
        {text}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
