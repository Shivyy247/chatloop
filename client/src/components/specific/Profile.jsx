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
        padding: "2rem 1.5rem",
        background:
          "linear-gradient(180deg, #14232c 0%, #101b22 50%, #0d171d 100%)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "-10px 0 30px rgba(0,0,0,0.25)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background: "rgba(0,200,170,0.18)",
          filter: "blur(100px)",
          top: "-60px",
          right: "-60px",
          zIndex: 0,
        }}
      />

      <Stack
        spacing={"1.5rem"}
        alignItems={"center"}
        sx={{
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#00c8aa",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Profile Details
        </Typography>

        <Box sx={{ position: "relative" }}>
          <Avatar
            src={transfromImage(user?.avatar?.url)}
            sx={{
              width: 130,
              height: 130,
              border: "4px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.4), 0 0 30px rgba(0,200,170,0.15)",
            }}
          />

          <Box
            sx={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#00c853",
              border: "3px solid #14232c",
              position: "absolute",
              bottom: 10,
              right: 10,
            }}
          />
        </Box>

        <Stack spacing={0.5} alignItems={"center"}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#ffffff",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              color: "#9fb4bc",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            @{user?.username}
          </Typography>
        </Stack>
      </Stack>

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
          text={moment(user?.createdAt).format("MMMM Do, YYYY")}
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
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(12px)",
      borderRadius: "14px",
      padding: "1rem",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      transition: "all 0.25s ease",

      "&:hover": {
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(0,200,170,0.3)",
        transform: "translateY(-2px)",
      },
    }}
  >
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "12px",
        background: "rgba(0,200,170,0.12)",
        border: "1px solid rgba(0,200,170,0.2)",
        color: "#00c8aa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>

    <Stack spacing={0.25} sx={{ overflow: "hidden" }}>
      <Typography
        sx={{
          fontSize: "0.72rem",
          color: "#8aa1aa",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}
      >
        {heading}
      </Typography>

      <Typography
        sx={{
          fontWeight: 500,
          fontSize: "1rem",
          color: "#ffffff",
          wordBreak: "break-word",
        }}
      >
        {text}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
