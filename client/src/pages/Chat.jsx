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
  const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages,
  );

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];

  const members = chatDetails?.data?.chat?.members;

  const messageOnChange = (e) => {
    setMessage(e.target.value);
    if (!iAmTyping) {
      socket.emit(START_TYPING, { members, chatId });
      setiAmTyping(true);
    }
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, { members, chatId });
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
    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");
  };

  useEffect(() => {
    socket.emit(CHAT_JOINED, { userId: user._id, members });
    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
      socket.emit(CHAT_LEAVED, { userId: user._id, members });
    };
  }, [chatId]);

  useEffect(() => {
    if (bottmRef.current)
      bottmRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatDetails.isError) navigate("/");
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
    ({ data, chatId: alertChatId }) => {
      if (alertChatId !== chatId) return;
      const messageForAlert = {
        content: data.message,
        sender: { _id: "admin_id", name: "System" },
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
      sx={{ bgcolor: "#111b21" }}
    />
  ) : (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#0b141a",
      }}
    >
      {/* MESSAGES AREA */}
      <Stack
        ref={containerRef}
        spacing={"0.5rem"} // Spacing kam rakhi hai for compact feel
        sx={{
          flexGrow: 1,
          overflowX: "hidden",
          overflowY: "auto",
          px: { xs: "0.5rem", sm: "1rem", md: "2rem" },
          py: "1rem",
          // WhatsApp Wallpapers usually have this hex or a pattern
          background: "#0b141a",
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.1)",
            borderRadius: "10px",
          },
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
        {userTyping && <TypingLoader />}
        <div ref={bottmRef} />
      </Stack>

      {/* INPUT AREA */}
      <Box
        component="form"
        onSubmit={submitHandler}
        sx={{
          minHeight: "62px",
          display: "flex",
          alignItems: "center",
          px: "1rem",
          bgcolor: "#202c33", // WhatsApp Input Bar color
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <IconButton
            onClick={handleFileOpen}
            sx={{ color: "#8696a0", "&:hover": { color: "#e9edef" } }}
          >
            <AttachFileIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <InputBox
              placeholder="Type a message"
              value={message}
              onChange={messageOnChange}
              sx={{
                bgcolor: "#2a3942", // Input field dark tone
                color: "#e9edef",
                borderRadius: "8px",
                padding: "9px 12px",
                border: "none",
                fontSize: "0.95rem",
                "&::placeholder": { color: "#8696a0" },
              }}
            />
          </Box>

          <IconButton
            type="submit"
            disabled={!message.trim()}
            sx={{
              color: message.trim() ? "#00a884" : "#8696a0", // Green only when typing
              transition: "0.2s",
              "&:hover": { transform: "scale(1.1)" },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Box>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </Box>
  );
};

export default AppLayout(Chat);
