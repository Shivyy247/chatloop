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
        padding: "0.35rem 0",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        sx={{
          padding: "0.85rem 1rem",

          borderRadius: "18px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          transition: "0.25s ease",

          "&:hover": {
            background: "var(--hover-color)",
            transform: "translateY(-1px)",
          },

          ...styling,
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Avatar
            src={transfromImage(avatar)}
            sx={{
              width: 48,
              height: 48,
            }}
          />
        </Box>

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,

            color: "var(--text-primary)",

            fontWeight: 500,

            fontSize: "0.95rem",

            display: "-webkit-box",

            WebkitLineClamp: 1,

            WebkitBoxOrient: "vertical",

            overflow: "hidden",

            textOverflow: "ellipsis",

            width: "100%",
          }}
        >
          {name}
        </Typography>

        <IconButton
          size="small"
          onClick={() => handler?.(_id)}
          disabled={handlerIsLoading}
          sx={{
            width: 38,
            height: 38,

            borderRadius: "12px",

            background: isAdded
              ? "rgba(239,68,68,0.12)"
              : "rgba(16,185,129,0.12)",

            color: isAdded ? "#ef4444" : "#10B981",

            transition: "0.2s ease",

            "&:hover": {
              background: isAdded
                ? "rgba(239,68,68,0.18)"
                : "rgba(16,185,129,0.18)",

              transform: "scale(1.05)",
            },

            "&.Mui-disabled": {
              opacity: 0.6,
            },
          }}
        >
          {isAdded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
