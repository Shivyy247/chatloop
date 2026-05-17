import React, { useCallback, useEffect, useRef, useState } from "react";

import AppLayout from "../components/layout/AppLayout";

import { IconButton, Skeleton, Stack, Box } from "@mui/material";

import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
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
    <Skeleton />
  ) : (
    <>
      {/* CHAT AREA */}

      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        spacing={"1rem"}
        height={"calc(100vh - 8rem)"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          padding: "1.5rem",
          background: "linear-gradient(180deg,#050B18 0%, #071120 100%)",
          position: "relative",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
          },
        }}
      >
        {/* Glow */}

        <Box
          sx={{
            position: "absolute",

            width: 350,
            height: 350,

            borderRadius: "50%",

            background: "rgba(91,108,255,0.10)",

            filter: "blur(140px)",

            top: -100,
            right: -100,
          }}
        />

        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}

        {userTyping && <TypingLoader />}

        <div ref={bottmRef} />
      </Stack>

      {/* INPUT AREA */}

      <form
        onSubmit={submitHandler}
        style={{
          height: "5rem",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem 1.2rem"}
          alignItems={"center"}
          spacing={1}
          sx={{
            background: "rgba(8,17,32,0.96)",

            borderTop: "1px solid rgba(255,255,255,0.05)",

            backdropFilter: "blur(20px)",
          }}
        >
          <IconButton
            sx={{
              width: 48,
              height: 48,

              borderRadius: "16px",

              color: "var(--text-secondary)",

              background: "rgba(255,255,255,0.04)",

              "&:hover": {
                background: "rgba(255,255,255,0.08)",
              },
            }}
            onClick={handleFileOpen}
          >
            <AttachFileIcon />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,

              height: 54,
            }}
          >
            <InputBox
              placeholder="Type a message..."
              value={message}
              onChange={messageOnChange}
            />
          </Box>

          <IconButton
            type="submit"
            sx={{
              width: 52,
              height: 52,

              borderRadius: "18px",

              background: "linear-gradient(135deg,#5B6CFF,#7BE7D7)",

              color: "white",

              boxShadow: "0 10px 30px rgba(91,108,255,0.3)",

              transition: "all 0.25s ease",

              "&:hover": {
                transform: "translateY(-2px)",
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

// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import AppLayout from "../components/layout/AppLayout";
// import { IconButton, Skeleton, Stack } from "@mui/material";
// import { AttachFile as AttachFileIcon, Send as SendIcon } from "@mui/icons-material";
// import { InputBox } from "../components/styles/StyledComponents";
// import FileMenu from "../components/dialogs/FileMenu";
// import MessageComponent from "../components/shared/MessageComponent";
// import { getSocket } from "../utils/socket";
// import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from "../constants/events";
// import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
// import { useErrors, useSocketEvents } from "../constants/hooks/hooks";
// import { useInfiniteScrollTop } from "6pp";
// import { useDispatch } from "react-redux";
// import { setIsFileMenu } from "../redux/reducers/misc";
// import { removeNewMessageAlert } from "../redux/reducers/chat";
// import { TypingLoader } from "../components/layout/Loaders";
// import { useNavigate } from "react-router-dom";

// const Chat = ({ chatId, user }) => {

//   const socket = getSocket();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const containerRef = useRef(null);
//   const bottmRef = useRef(null);

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [page, setPage] = useState(1);
//   const [fileMenuAnchor, setFileMenuAnchor] = useState(null);

//   const [iAmTyping, setiAmTyping] = useState(false);
//   const [userTyping, setUserTyping] = useState(false);
//   const typingTimeout = useRef(null);

//  const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

//   const oldMessagesChunk = useGetMessagesQuery({ chatId, page });

//   const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
//     containerRef,
//     oldMessagesChunk.data?.totalPages,
//     page,
//     setPage,
//     oldMessagesChunk.data?.messages,
//   );

//   const errors = [
//     {
//       isError: chatDetails.isError,
//       error: chatDetails.error,
//     },
//     {
//       isError: oldMessagesChunk.isError,
//       error: oldMessagesChunk.error,
//     },
//   ];

//   const members = chatDetails?.data?.chat?.members;

//   const messageOnChange = (e) => {
//     setMessage(e.target.value);

//     if (!iAmTyping) {
//       socket.emit(START_TYPING, { members, chatId });
//       setiAmTyping(true);
//     }

//     if (typingTimeout.current) clearTimeout(typingTimeout.current);

//     typingTimeout.current = setTimeout(() => {
//       socket.emit(STOP_TYPING, {members, chatId});
//       setiAmTyping(false);
//      }, 2000);
//   }

//   const handleFileOpen = (e) => {
//     dispatch(setIsFileMenu(true));
//     setFileMenuAnchor(e.currentTarget);
//   }

//   const submitHandler = (e) => {

//     e.preventDefault();
//     if (!message.trim()) return;

//     socket.emit(NEW_MESSAGE, { chatId, members, message });
//     setMessage("");

//   };

//   useEffect(() => {
//     socket.emit(CHAT_JOINED, { userId: user._id , members });

//     dispatch(removeNewMessageAlert(chatId));
//     return () => {
//       setMessages([]);
//       setMessage("");
//       setOldMessages([]);
//       setPage(1);
//       socket.emit(CHAT_LEAVED, { userId: user._id, members });
//     }
//   }, [chatId])

//   useEffect(() => {
//     if (bottmRef.current) bottmRef.current.scrollIntoView({
//       behavior: "smooth"
//     });
//   }, [messages]);

//   useEffect(() => {
//     if (chatDetails.isError) {
//       navigate("/");
//     }
//   }, [chatDetails.isError, navigate]);

//   // const fileMenuRef = useRef(null);

//   const newMessageListner = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;

//       setMessages((prev) => [...prev, data.message]);
//     },
//     [chatId],
//   );

//   const startTypingListner = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;

//       console.log("typing", data)
//       setUserTyping(true);
//     },
//     [chatId],
//   );

//   const stopTypingListner = useCallback(
//     (data) => {
//       if (data.chatId !== chatId) return;

//       console.log("typing", data);
//       setUserTyping(false);
//     },
//     [chatId],
//   );

//   const alertListener = useCallback(
//     ({data,chatId}) => {
//       if (data.chatId !== chatId) return;
//       const messageForAlert = {
//         content: data.message,
//         sender: {
//           _id: "shivi123",
//           name: "Admin",
//         },
//         chat: chatId,
//         createdAt: new Date().toISOString(),
//       };

//       setMessages((prev) => [...prev, messageForAlert]);
//     },
//     [chatId],
//   );

//   const eventHandler = {
//     [ALERT]: alertListener,
//     [NEW_MESSAGE]: newMessageListner,
//     [START_TYPING]: startTypingListner,
//     [STOP_TYPING]: stopTypingListner,
//   };

//   useSocketEvents(socket, eventHandler);

//   useErrors(errors);

//   const allMessages = [...(oldMessages || []), ...messages];

//   return chatDetails.isLoading ? (
//     <Skeleton />
//   ) : (
//     <>
//       <Stack
//         ref={containerRef}
//         boxSizing={"border-box"}
//         padding={"1rem"}
//         spacing={"1rem"}
//         bgcolor={"#4272cc"}
//         height={"90%"}
//         sx={{
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >
//         {allMessages.map((i) => (
//           <MessageComponent key={i._id} message={i} user={user} />
//         ))}

//         {userTyping && <TypingLoader />}
//           <div ref={bottmRef} />

//       </Stack>
//       <form
//         style={{
//           height: "10%",
//         }}
//         onSubmit={submitHandler}
//       >
//         <Stack
//           direction={"row"}
//           height={"100%"}
//           padding={"1rem"}
//           alignItems={"center"}
//           position={"relative"}
//         >
//           <IconButton
//             sx={{
//               position: "absolute",
//               left: "1.5rem",
//               rotate: "30deg",
//             }}
//             onClick={handleFileOpen}
//           >
//             <AttachFileIcon />
//           </IconButton>

//           <InputBox
//             placeholder="Type msg here..."
//             value={message}
//             onChange={messageOnChange}
//           />

//           <IconButton
//             type="submit"
//             sx={{
//               rotate: "-30deg",
//               bgcolor: "#1f57c0",
//               color: "white",
//               marginLeft: "1rem",
//               padding: "0.5rem",
//               "&:hover": {
//                 bgcolor: "error.dark",
//               },
//             }}
//           >
//             <SendIcon />
//           </IconButton>
//         </Stack>
//       </form>

//       <FileMenu anchorEl={fileMenuAnchor} chatId={chatId} />
//     </>
//   );
// };

// export default AppLayout(Chat);
