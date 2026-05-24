import {
  Avatar,
  IconButton,
  ListItem,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React, { memo } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { transfromImage } from "../../lib/features";

const UserItem = ({
  user,
  handler,
  handlerIsLoading,
  isAdded = false,
  styling = {},
}) => {
  const { name, _id, avatar } = user;

  return (
    <ListItem
      sx={{
        padding: "0.25rem 0",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        sx={{
          padding: "0.6rem 0.8rem",
          borderRadius: "12px", // Professional semi-rounded
          bgcolor: "#1f2c33", // WhatsApp Card dark tone
          border: "1px solid rgba(255, 255, 255, 0.05)",
          transition: "0.2s ease-in-out",
          "&:hover": {
            bgcolor: "#2a3942", // Light grey-green hover
          },
          ...styling,
        }}
      >
        <Avatar
          src={transfromImage(avatar)}
          sx={{
            width: 44,
            height: 44,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            color: "#e9edef", // Soft Ivory
            fontWeight: 500,
            fontSize: "0.95rem",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handler?.(_id)}
          disabled={handlerIsLoading}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            // Emerald Green for Add, Muted Red for Remove
            bgcolor: isAdded
              ? "rgba(239, 68, 68, 0.15)"
              : "rgba(0, 168, 132, 0.15)",
            color: isAdded ? "#ef4444" : "#00a884",
            "&:hover": {
              bgcolor: isAdded
                ? "rgba(239, 68, 68, 0.25)"
                : "rgba(0, 168, 132, 0.25)",
            },
            "&.Mui-disabled": {
              opacity: 0.4,
            },
          }}
        >
          {isAdded ? (
            <RemoveIcon sx={{ fontSize: "1.2rem" }} />
          ) : (
            <AddIcon sx={{ fontSize: "1.2rem" }} />
          )}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
