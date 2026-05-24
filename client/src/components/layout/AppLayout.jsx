import React, { useCallback, useEffect, useRef, useState } from "react";
import Title from "../shared/Title";
import Header from "./Header";
import { Box, Drawer, Grid, Skeleton } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsDeleteMenu,
  setIsMobile,
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
import DeleteChatMenu from "./DeleteChatMenu";


const AppLayout = (WrappedComponent) => {
  return (props) => {
    const params = useParams();

    const dispatch = useDispatch();

    const chatId = params.chatId;

    const deleteMenuAnchor = useRef(null);

    const socket = getSocket();

    const [onlineUsers, setOnlineUsers] = useState([]);

    const { isMobile } = useSelector((state) => state.misc);

    const { user } = useSelector((state) => state.auth);

    const { newMessageAlert } = useSelector((state) => state.chat);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

    useErrors([{ isError, error }]);

    useEffect(() => {
      getOrSaveFromStorage({
        key: NEW_MESSAGE_ALERT,
        value: newMessageAlert,
      });
    }, [newMessageAlert]);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispatch(setIsDeleteMenu(true));

      dispatch(setSelectedDeleteChat({ chatId, groupChat }));

      deleteMenuAnchor.current = e.currentTarget;
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    const newMessagesAlertHandler = useCallback(
      (data) => {
        if (data.chatId === chatId) return;

        dispatch(setNewMessagesAlert(data));
      },
      [chatId, dispatch],
    );

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotification());
    }, [dispatch]);

    const refetchListener = useCallback(async () => {
      await refetch();
    }, [refetch]);

    const onlineUsersListener = useCallback((data) => {
      setOnlineUsers(data);
    }, []);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
      [REFETCH_CHATS]: refetchListener,
      [ONLINE_USERS]: onlineUsersListener,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />

        <Header />

        <DeleteChatMenu
          dispatch={dispatch}
          deleteMenuAnchor={deleteMenuAnchor}
        />

        {/* MOBILE DRAWER */}

        {!isLoading && (
          <Drawer
            open={isMobile}
            onClose={handleMobileClose}
            PaperProps={{
              sx: {
                width: "82vw",

                background: "var(--bg-sidebar)",

                borderRight: "1px solid var(--border-color)",
              },
            }}
          >
            <Chatlist
              w="100%"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
              newMessageAlert={newMessageAlert}
              onlineUsers={onlineUsers}
            />
          </Drawer>
        )}

        {/* MAIN LAYOUT */}

        <Box
          sx={{
            height: "calc(100vh - 4.5rem)",

            background: "var(--bg-main)",

            padding: {
              xs: "0.6rem",
              sm: "0.9rem",
              md: "1rem",
            },
          }}
        >
          <Grid
            container
            spacing={1.5}
            sx={{
              height: "100%",
            }}
          >
            {/* SIDEBAR */}

            <Grid
              size={{ sm: 4, md: 3 }}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },

                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",

                  borderRadius: "24px",

                  overflow: "hidden",

                  background: "var(--bg-sidebar)",

                  border: "1px solid var(--border-color)",

                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {isLoading ? (
                  <Skeleton variant="rectangular" height={"100%"} />
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
            </Grid>

            {/* CHAT AREA */}

            <Grid
              size={{
                xs: 12,
                sm: 8,
                md: 5,
                lg: 6,
              }}
              sx={{
                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",

                  borderRadius: {
                    xs: "22px",
                    md: "26px",
                  },

                  overflow: "hidden",

                  background: "var(--bg-chat)",

                  border: "1px solid var(--border-color)",

                  boxShadow: "var(--shadow-md)",

                  minHeight: 0,
                }}
              >
                <WrappedComponent {...props} chatId={chatId} user={user} />
              </Box>
            </Grid>

            {/* PROFILE */}

            <Grid
              size={{ md: 4, lg: 3 }}
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },

                height: "100%",
              }}
            >
              <Box
                sx={{
                  height: "100%",

                  borderRadius: "24px",

                  overflow: "hidden",

                  background: "var(--bg-sidebar)",

                  border: "1px solid var(--border-color)",

                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Profile user={user} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  };
};

export default AppLayout;
