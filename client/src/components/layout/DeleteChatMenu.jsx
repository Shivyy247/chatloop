import { Menu, Stack, Typography, Box } from "@mui/material";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";

import { setIsDeleteMenu } from "../../redux/reducers/misc";

import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useAsyncMutation } from "../../constants/hooks/hooks";

import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();

  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc,
  );

  const [deleteChat, , deleteChatData] = useAsyncMutation(
    useDeleteChatMutation,
  );

  const [leaveGroup, , leaveGroupData] = useAsyncMutation(
    useLeaveGroupMutation,
  );

  const isGroup = selectedDeleteChat?.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));

    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = () => {
    closeHandler();

    leaveGroup("Leaving Group...", {
      chatId: selectedDeleteChat.chatId,
    });
  };

  const deleteChatHandler = () => {
    closeHandler();

    deleteChat("Deleting Chat...", {
      chatId: selectedDeleteChat.chatId,
    });
  };

  useEffect(() => {
    if (deleteChatData?.success || leaveGroupData?.success) {
      navigate("/");
    }
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          width: "14rem",

          mt: 1,

          borderRadius: "18px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          boxShadow: "var(--shadow-md)",

          overflow: "hidden",
        },
      }}
    >
      <Stack
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.9rem"}
        sx={{
          padding: "0.95rem 1rem",

          cursor: "pointer",

          transition: "0.2s ease",

          "&:hover": {
            background: "rgba(239,68,68,0.08)",
          },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,

            borderRadius: "12px",

            background: "rgba(239,68,68,0.12)",

            color: "#ef4444",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",
          }}
        >
          {isGroup ? <ExitToAppIcon /> : <DeleteIcon />}
        </Box>

        <Typography
          sx={{
            color: "var(--text-primary)",

            fontWeight: 500,

            fontSize: "0.95rem",
          }}
        >
          {isGroup ? "Leave Group" : "Delete Chat"}
        </Typography>
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
