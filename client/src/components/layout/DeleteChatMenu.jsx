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
    if (deleteMenuAnchor.current) deleteMenuAnchor.current = null;
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
  }, [deleteChatData, leaveGroupData, navigate]);

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
          width: "12rem", // Thoda compact width
          borderRadius: "12px",
          bgcolor: "#233138", // WhatsApp dark menu background
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.5)",
          overflow: "hidden",
        },
      }}
    >
      <Stack
        onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        sx={{
          padding: "0.8rem 1rem",
          cursor: "pointer",
          transition: "0.2s ease",
          "&:hover": {
            bgcolor: "#182229", // WhatsApp dark hover tone
          },
        }}
      >
        <Box
          sx={{
            width: 35,
            height: 35,
            borderRadius: "50%",
            bgcolor: "rgba(239, 68, 68, 0.15)", // Subtle red background
            color: "#ef4444", // Dangerous action red
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isGroup ? (
            <ExitToAppIcon sx={{ fontSize: "1.2rem" }} />
          ) : (
            <DeleteIcon sx={{ fontSize: "1.2rem" }} />
          )}
        </Box>

        <Typography
          sx={{
            color: "#e9edef", // Ivory text
            fontWeight: 500,
            fontSize: "0.9rem",
          }}
        >
          {isGroup ? "Leave Group" : "Delete Chat"}
        </Typography>
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
