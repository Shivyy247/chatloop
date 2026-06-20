import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Drawer, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../shared/Title";
import Header from "./Header";
import Chatlist from "../specific/ChatList";
import Profile from "../specific/Profile";
import DeleteChatMenu from "./DeleteChatMenu";
import { useMyChatsQuery } from "../../redux/api/api";
import {
  setIsDeleteMenu,
  setIsMobile,
  setIsProfile, // Added this
  setSelectedDeleteChat,
} from "../../redux/reducers/misc";
import { useErrors, useSocketEvents } from "../../constants/hooks/hooks";
import { getSocket } from "../../utils/socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constants/events";
import {
  incrementNotification,
  setNewMessagesAlert,
} from "../../redux/reducers/chat";
import { getOrSaveFromStorage } from "../../lib/features";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;
    const deleteMenuAnchor = useRef(null);
    const socket = getSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);
    const { isMobile, isProfile } = useSelector((state) => state.misc); // Pull isProfile from Redux
    const { user } = useSelector((state) => state.auth);
    const { newMessageAlert } = useSelector((state) => state.chat);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
    }, [newMessageAlert]);

    const handleMobileClose = () => dispatch(setIsMobile(false));

    // Toggle Profile Drawer off
    const handleProfileClose = () => dispatch(setIsProfile(false));

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({ chatId, groupChat }));
      deleteMenuAnchor.current = e.currentTarget;
    };

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: useCallback(
        (data) => {
          if (data.chatId !== chatId) dispatch(setNewMessagesAlert(data));
        },
        [chatId, dispatch],
      ),
      [NEW_REQUEST]: useCallback(
        () => dispatch(incrementNotification()),
        [dispatch],
      ),
      [REFETCH_CHATS]: useCallback(async () => await refetch(), [refetch]),
      [ONLINE_USERS]: useCallback((data) => setOnlineUsers(data), []),
    };

    useSocketEvents(socket, eventHandler);

    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          bgcolor: "#0b141a",
          overflow: "hidden",
        }}
      >
        <Title />
        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {/* --- MOBILE SIDEBAR DRAWER --- */}
        <Drawer open={isMobile} onClose={handleMobileClose}>
          <Box sx={{ width: "75vw", height: "100%", bgcolor: "#111b21" }}>
            <Chatlist
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={newMessageAlert}
              onlineUsers={onlineUsers}
            />
          </Box>
        </Drawer>

        {/* --- PROFILE DRAWER (Right Side) --- */}
        <Drawer anchor="right" open={isProfile} onClose={handleProfileClose}>
          <Box
            sx={{
              width: { xs: "100vw", sm: "350px" },
              height: "100%",
              bgcolor: "#111b21",
            }}
          >
            <Profile user={user} />
          </Box>
        </Drawer>

        {/* --- MAIN FLEX ENGINE --- */}
        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "calc(100vh - 60px)",
            width: "100%",
          }}
        >
          {/* LEFT SIDEBAR */}
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              width: { sm: "35%", md: "30%", lg: "25%" },
              height: "100%",
              bgcolor: "#111b21",
              borderRight: "1px solid #222d34",
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height="100%"
                sx={{ bgcolor: "#1c2a33" }}
              />
            ) : (
              <Chatlist
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
                newMessageAlert={newMessageAlert}
                onlineUsers={onlineUsers}
              />
            )}
          </Box>

          {/* CHAT/HOME AREA - Now wide and clean! */}
          <Box
            sx={{
              flex: 1,
              height: "100%",
              bgcolor: "#0b141a",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <WrappedComponent {...props} chatId={chatId} user={user} />
          </Box>
        </Box>
      </Box>
    );
  };
};

export default AppLayout;
