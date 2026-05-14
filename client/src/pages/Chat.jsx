import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../utils/socket";
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
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
      socket.emit(START_TYPING, { members, chatId });
      setiAmTyping(true);
    }

    if (typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      socket.emit(STOP_TYPING, {members, chatId});
      setiAmTyping(false);
     }, 2000);
  }

  const handleFileOpen = (e) => {
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  }

  const submitHandler = (e) => {

    e.preventDefault();
    if (!message.trim()) return;


    socket.emit(NEW_MESSAGE, { chatId, members, message });
    setMessage("");

  };

  useEffect(() => {

    dispatch(removeNewMessageAlert(chatId));
    return () => {
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1);
    }
  }, [chatId])
  
  useEffect(() => { 
    if (bottmRef.current) bottmRef.current.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  useEffect(() => {
    if (!chatDetails.data?.chat) return navigate('/');
  }, [chatDetails.data]);

  // const fileMenuRef = useRef(null);

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

      console.log("typing", data)
      setUserTyping(true);
    },
    [chatId],
  );

  const stopTypingListner = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      console.log("typing", data);
      setUserTyping(false);
    },
    [chatId],
  );

  const alertListener = useCallback(
    (content) => {
      
      const messageForAlert = {
        content,
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
    <Skeleton />
  ) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"#4272cc"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}
          <div ref={bottmRef} />
          

      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type msg here..."
            value={message}
            onChange={messageOnChange}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: "#1f57c0",
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
    </>
  );
};

export default AppLayout(Chat);
