import React from "react";

import { Avatar, AvatarGroup, Box } from "@mui/material";

import { transfromImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const avatars = Array.isArray(avatar) ? avatar : [avatar];

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <AvatarGroup
        max={max}
        spacing="medium"
        sx={{
          justifyContent: "flex-start",

          "& .MuiAvatar-root": {
            width: 46,

            height: 46,

            fontSize: "0.92rem",

            fontWeight: 600,

            border: "2px solid #0F172A",

            background: "linear-gradient(135deg, #1E293B 0%, #334155 100%)",

            color: "#F8FAFC",

            transition: "all 0.22s ease",

            boxShadow: "0 4px 14px rgba(0,0,0,0.25)",

            "&:hover": {
              transform: "translateY(-2px) scale(1.03)",
            },
          },
        }}
      >
        {avatars.map((i, index) => (
          <Avatar key={index} src={transfromImage(i)} alt={`Avatar ${index}`} />
        ))}
      </AvatarGroup>
    </Box>
  );
};

export default AvatarCard;
