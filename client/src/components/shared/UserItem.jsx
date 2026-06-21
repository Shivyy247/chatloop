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
  isAdmin = false,
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
          padding: "1rem 1.2rem",
          borderRadius: "12px",
          bgcolor: "#1f2c33",
          border: "1px solid rgba(255,255,255,0.05)",
          transition: "0.2s ease-in-out",
          "&:hover": {
            bgcolor: "#2a3942",
          },
          ...styling,
        }}
      >
        <Avatar
          src={transfromImage(avatar)}
          sx={{
            width: 52,
            height: 52,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "#e9edef",
              fontWeight: 500,
              fontSize: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>

          {isAdmin && (
            <Box
              sx={{
                px: 1,
                py: 0.3,
                borderRadius: "20px",
                bgcolor: "rgba(0,200,170,0.15)",
                color: "#00c8aa",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              👑 Admin
            </Box>
          )}
        </Box>

        {!(isAdded && isAdmin) && (
          <IconButton
            size="small"
            onClick={() => handler?.(_id)}
            disabled={handlerIsLoading}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              bgcolor: isAdded
                ? "rgba(239,68,68,0.15)"
                : "rgba(0,200,170,0.15)",
              color: isAdded ? "#ef4444" : "#00c8aa",
              "&:hover": {
                bgcolor: isAdded
                  ? "rgba(239,68,68,0.25)"
                  : "rgba(0,200,170,0.25)",
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
        )}
      </Stack>
    </ListItem>
  );
};

export default memo(UserItem);
