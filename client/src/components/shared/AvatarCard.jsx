import React from "react";
import { Avatar, AvatarGroup, Stack } from "@mui/material";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const avatars = Array.isArray(avatar) ? avatar : [avatar];

  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        {avatars.map((i, index) => (
          <Avatar
            key={index}
            src={i}
            alt={`Avatar ${index}`}
            sx={{ width: "3rem", height: "3rem" }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
