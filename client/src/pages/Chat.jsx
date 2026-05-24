import React, { useCallback, useEffect, useRef, useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import { IconButton, Skeleton, Stack, Box, Typography } from "@mui/material";

import {
  AttachFile as AttachFileIcon,
  SendRounded as SendIcon,
} from "@mui/icons-material";

import { InputBox } from "../components/styles/StyledComponents";

import FileMenu from "../components/dialogs/FileMenu";

import MessageComponent from "../components/shared/MessageComponent";

import { getSocket } from "../utils/socket";

import {
  ALERT,
  CHAT_JOINED,
  CHAT_LEAVED,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constants/events";

import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";

import { useErrors, useSocketEvents } from "../constants/hooks/hooks";

import { useInfiniteScrollTop } from "6pp";

import { useDispatch } from "react-redux";

import { setIsFileMenu } from "../redux/reducers/misc";

import { removeNewMessageAlert } from "../redux/reducers/chat";

import { TypingLoader } from "../components/layout/Loaders";

import { useNavigate } from "react-router-dom";

const Chat = ({ chatId, user }) => {
  const socket = getSocket();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const containerRef = useRef(null);

  const bottmRef = useRef(null);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [page, setPage] = useState(1);

  const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

  const [iAmTyping, setiAmTyping] = useState(false);

  const [userTyping, setUserTyping] = useState(false);

  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

  const oldMessagesChunk = useGetMessagesQuery({
    chatId,
    page,
  });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
  );

  const errors = [
    {
      isError: chatDetails.isError,
      error: chatDetails.error,
    },
    {
      isError: oldMessagesChunk.isError,
      error: oldMessagesChunk.error,
    },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);

    if (!iAmTyping) {
      socket.emit(START_TYPING, {
        members,
        chatId,
      });

      setiAmTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, {
        members,
        chatId,
      });

      setiAmTyping(false);
    }, 2000);
  };

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));

    setFileMenuAnchor(e.currentTarget);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, {
      chatId,
      members,
      message,
    });

    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, {
      userId: user._id,
      members,
    });

    dispatch(removeNewMessageAlert(chatId));

    return () => {
      setMessages([]);

      setMessage("");

      setOldMessages([]);

      setPage(1);

      socket.emit(CHAT_LEAVED, {
        userId: user._id,
        members,
      });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottmRef.current)
      bottmRef.current.scrollIntoView({
        behavior: "smooth",
      });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) {
      navigate("/");
    }
  }, [chatDetails.isError, navigate]);

  const newMessageListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId],
  );

  const startTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(true);
    },
    [chatId],
  );

  const stopTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setUserTyping(false);
    },
    [chatId],
  );

  const alertListener = useCallback(
    ({ data, chatId }) => {
      if (data.chatId !== chatId) return;

      const messageForAlert = {
        content: data.message,

        sender: {
          _id: "shivi123",
          name: "Admin",
        },

        chat: chatId,

        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageForAlert]);
    },
    [chatId],
  );

  const eventHandler = {
    [ALERT]: alertListener,

    [NEW_MESSAGE]: newMessageListner,

    [START_TYPING]: startTypingListner,

    [STOP_TYPING]: stopTypingListner,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  const allMessages = [...(oldMessages || []), ...messages];

  return chatDetails.isLoading ? (
    <Skeleton
      variant="rectangular"
      height={"100%"}
      sx={{
        borderRadius: "24px",
      }}
    />
  ) : (
    <>
      <Stack
        ref={containerRef}
        spacing={"1rem"}
        height={"calc(100vh - 10.3rem)"}
        sx={{
          overflowX: "hidden",

          overflowY: "auto",

          px: {
            xs: "0.9rem",
            sm: "1.2rem",
            md: "1.5rem",
          },

          py: "1.2rem",

          background: "linear-gradient(to bottom, #e8eef4, #eef3f7, #f4f7fb)",

          "&::-webkit-scrollbar": {
            width: "5px",
          },

          "&::-webkit-scrollbar-thumb": {
            background: "rgba(100,116,139,0.35)",
            borderRadius: "20px",
          },
        }}
      >
        {!chatId ? (
          <Stack
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1.5}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1.5rem",
                  md: "2rem",
                },

                fontWeight: 700,

                color: "var(--text-primary)",

                letterSpacing: "-0.5px",
              }}
            >
              Welcome to ChatLoop
            </Typography>

            <Typography
              sx={{
                color: "var(--text-secondary)",

                fontSize: "0.95rem",

                textAlign: "center",

                maxWidth: "340px",
              }}
            >
              Select a conversation and start chatting with your friends
            </Typography>
          </Stack>
        ) : (
          <>
            {allMessages.map((i) => (
              <MessageComponent key={i._id} message={i} user={user} />
            ))}

            {userTyping && <TypingLoader />}

            <div ref={bottmRef} />
          </>
        )}
      </Stack>

      {chatId && (
        <form
          onSubmit={submitHandler}
          style={{
            height: "5.3rem",

            background: "rgba(255,255,255,0.55)",

            backdropFilter: "blur(12px)",

            borderTop: "1px solid rgba(148,163,184,0.16)",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{
              height: "100%",

              px: {
                xs: "0.8rem",
                sm: "1rem",
              },
            }}
          >
            <IconButton
              sx={{
                width: 46,

                height: 46,

                borderRadius: "16px",

                background: "rgba(255,255,255,0.7)",

                border: "1px solid rgba(148,163,184,0.15)",

                color: "var(--text-secondary)",

                "&:hover": {
                  background: "rgba(255,255,255,0.95)",
                },
              }}
              onClick={handleFileOpen}
            >
              <AttachFileIcon />
            </IconButton>

            <Box
              sx={{
                flexGrow: 1,

                height: 50,
              }}
            >
              <InputBox
                placeholder="Write a message..."
                value={message}
                onChange={messageOnChange}
              />
            </Box>

            <IconButton
              type="submit"
              sx={{
                width: 48,

                height: 48,

                borderRadius: "16px",

                background: "linear-gradient(135deg, #0f766e, #115e59)",

                color: "white",

                boxShadow: "0 10px 25px rgba(15,118,110,0.25)",

                "&:hover": {
                  transform: "translateY(-1px)",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
      )}

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout(Chat);