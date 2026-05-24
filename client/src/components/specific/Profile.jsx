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
      spacing={"2rem"}
      alignItems={"center"}
      sx={{
        height: "100%",

        padding: "1.6rem 1.2rem",

        background: "linear-gradient(to bottom, #111827 0%, #0F172A 100%)",

        overflowY: "auto",

        position: "relative",

        "&::-webkit-scrollbar": {
          width: "5px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.08)",

          borderRadius: "20px",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",

          width: "180px",

          height: "180px",

          borderRadius: "50%",

          background: "rgba(20,184,166,0.08)",

          filter: "blur(80px)",

          top: "-40px",

          right: "-40px",
        }}
      />

      {/* PROFILE TOP */}

      <Stack
        spacing={1.3}
        alignItems={"center"}
        width={"100%"}
        sx={{
          position: "relative",

          zIndex: 2,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            src={transfromImage(user?.avatar?.url)}
            sx={{
              width: 118,

              height: 118,

              border: "4px solid rgba(255,255,255,0.06)",

              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            }}
          />

          <Box
            sx={{
              width: 16,

              height: 16,

              borderRadius: "50%",

              background: "#22C55E",

              border: "3px solid #111827",

              position: "absolute",

              bottom: 8,

              right: 8,
            }}
          />
        </Box>

        <Stack spacing={0.3} alignItems={"center"}>
          <Typography
            sx={{
              fontWeight: 700,

              fontSize: "1.18rem",

              color: "var(--text-primary)",

              letterSpacing: "-0.4px",
            }}
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              color: "var(--text-secondary)",

              fontSize: "0.9rem",

              fontWeight: 500,
            }}
          >
            @{user?.username}
          </Typography>
        </Stack>
      </Stack>

      {/* INFO CARDS */}

      <Stack
        spacing={"1rem"}
        width={"100%"}
        sx={{
          position: "relative",

          zIndex: 2,
        }}
      >
        <ProfileCard
          heading="Bio"
          text={user?.bio || "No bio available"}
          icon={<InfoIcon fontSize="small" />}
        />

        <ProfileCard
          heading="Username"
          text={user?.username}
          icon={<UserNameIcon fontSize="small" />}
        />

        <ProfileCard
          heading="Name"
          text={user?.name}
          icon={<FaceIcon fontSize="small" />}
        />

        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).fromNow()}
          icon={<CalendarIcon fontSize="small" />}
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
      background: "rgba(255,255,255,0.03)",

      borderRadius: "20px",

      padding: "1rem",

      border: "1px solid rgba(255,255,255,0.05)",

      backdropFilter: "blur(14px)",

      transition: "all 0.22s ease",

      cursor: "default",

      "&:hover": {
        transform: "translateY(-3px)",

        background: "rgba(255,255,255,0.05)",

        borderColor: "rgba(20,184,166,0.16)",
      },
    }}
  >
    <Box
      sx={{
        width: 44,

        height: 44,

        borderRadius: "14px",

        background:
          "linear-gradient(135deg, rgba(20,184,166,0.16), rgba(20,184,166,0.05))",

        color: "#5EEAD4",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Stack spacing={0.2} sx={{ overflow: "hidden" }}>
      <Typography
        noWrap
        sx={{
          fontWeight: 600,

          fontSize: "0.94rem",

          color: "var(--text-primary)",
        }}
      >
        {text}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.72rem",

          color: "var(--text-secondary)",

          letterSpacing: "0.4px",

          textTransform: "uppercase",
        }}
      >
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
