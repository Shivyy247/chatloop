import React from "react";
import { Avatar, AvatarGroup, Box } from "@mui/material";
import { transfromImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const avatars = Array.isArray(avatar) ? avatar : [avatar];

  return (
    <Box
      sx={{
        position: "relative",
        width: "fit-content",
      }}
    >
      <AvatarGroup
        max={max}
        sx={{
          justifyContent: "flex-start",
          "& .MuiAvatar-root": {
            width: 44,
            height: 44,
            fontSize: "0.9rem",
            fontWeight: 600,
            // Border ko sidebar background (#111B21) se match kiya hai
            border: "2px solid #111b21",
            // Solid dark background for initial letters
            background: "#2a3942",
            color: "#e9edef",
            transition: "transform 0.2s ease",
            // Shadows messaging apps mein avatars par nahi hoti
            boxShadow: "none",
            "&:hover": {
              transform: "scale(1.05)",
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
