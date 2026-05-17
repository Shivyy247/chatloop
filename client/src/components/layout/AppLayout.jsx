import React, { useCallback, useEffect, useRef, useState } from "react";

import Title from "../shared/Title";
import Header from "./Header";

import { Drawer, Grid, Skeleton, Box } from "@mui/material";

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

        {isLoading ? (
          <Skeleton
            variant="rectangular"
            height={"100vh"}
            sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
          />
        ) : (
          <Drawer
            open={isMobile}
            onClose={handleMobileClose}
            PaperProps={{
              sx: {
                width: "75vw",
                background: "linear-gradient(180deg,#07111F,#081426)",
                borderRight: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
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

        <Grid
          container
          sx={{
            height: "calc(100vh - 4.5rem)",
            minHeight: 0,
            background:
              "radial-gradient(circle at top, rgba(91,108,255,0.10), transparent 30%)",
          }}
        >
          {/* SIDEBAR */}
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: "none", sm: "block" },
              height: "100%",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(12,22,41,0.82)",
              backdropFilter: "blur(18px)",
              overflow: "hidden",
            }}
          >
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={"100%"}
                sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
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
          </Grid>

          {/* CHAT AREA */}
          <Grid
            size={{ xs: 12, sm: 8, md: 5, lg: 6 }}
            sx={{
              height: "100%",
              position: "relative",
              background: "linear-gradient(180deg,#07111F,#081426)",
              overflow: "hidden",
              minHeight: 0,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 300,
                height: 300,
                borderRadius: "50%",
                background: "rgba(91,108,255,0.12)",
                filter: "blur(120px)",
                top: -120,
                right: -120,
              }}
            />

            <Box sx={{ position: "relative", zIndex: 1, height: "100%" }}>
              <WrappedComponent {...props} chatId={chatId} user={user} />
            </Box>
          </Grid>

          {/* PROFILE */}
          <Grid
            size={{ md: 4, lg: 3 }}
            sx={{
              display: { xs: "none", md: "block" },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "1.5rem",
              borderLeft: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(12,22,41,0.82)",
              backdropFilter: "blur(18px)",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import Title from "../shared/Title";
// import Header from "./Header";
// import { Drawer, Grid, Skeleton } from "@mui/material";
// import Chatlist from "../specific/Chatlist";
// // import { sampleChats } from "../../constants/sampleData";
// import { useNavigate, useParams } from "react-router-dom";
// import Profile from "../specific/Profile";
// import { useMyChatsQuery } from "../../redux/api/api";
// import { useDispatch, useSelector } from "react-redux";
// import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from "../../redux/reducers/misc";
// import { useErrors, useSocketEvents } from "../../constants/hooks/hooks";
// import { getSocket } from "../../utils/socket";
// import { NEW_MESSAGE, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../constants/events";
// import { incrementNotification, setNewMessagesAlert } from "../../redux/reducers/chat";
// import { getOrSaveFromStorage } from "../../lib/features";
// import DeleteChatMenu from "./DeleteChatMenu";

// const AppLayout = (WrappedComponent) => {
//   return (props) => {

//     const params = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const chatId = params.chatId;
//     const deleteMenuAnchor = useRef(null);

//     const [onlineUsers, setOnlineUsers] = useState([]);

//     const socket = getSocket();

//     const { isMobile } = useSelector((state) => state.misc);
//     const { user } = useSelector((state) => state.auth);
//     const { newMessageAlert } = useSelector((state) => state.chat);

//     const { isLoading, data, isError, error, refetch } = useMyChatsQuery()

//     useErrors([{ isError, error }]);

//     useEffect(() => {
//       getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessageAlert });
//     }, [newMessageAlert]);

//     const handleDeleteChat = (e, chatId, groupChat) => {
//       dispatch(setIsDeleteMenu(true));
//       dispatch(setSelectedDeleteChat({chatId, groupChat}))
//       deleteMenuAnchor.current = e.currentTarget;
//     }

//     const handleMobileClose = () => dispatch(setIsMobile(false));

//     const newMessagesAlertHandler = useCallback(
//       (data) => {
//         if (data.chatId === chatId) return;

//         dispatch(setNewMessagesAlert(data));
//       },
//       [chatId, dispatch],
//     );

//     const newRequestHandler = useCallback(() => {
//       dispatch(incrementNotification());
//     }, [dispatch]);

//     const refetchListener = useCallback(async () => {
//       await refetch();
//     }, [refetch]);

//     const onlineUsersListener = useCallback((data) => {
//       setOnlineUsers(data);
//     }, []);

//     const eventHandler = {
//       [NEW_MESSAGE_ALERT]: newMessagesAlertHandler,
//       [NEW_REQUEST]: newRequestHandler,
//       [REFETCH_CHATS]: refetchListener,
//       [ONLINE_USERS]: onlineUsersListener,
//     };

//     useSocketEvents(socket, eventHandler);

//     return (
//       <>
//         <Title />
//         <Header />
//         <DeleteChatMenu
//           dispatch={dispatch}
//           deleteMenuAnchor={deleteMenuAnchor}
//         />

//         {isLoading ? (
//           <Skeleton />
//         ) : (
//           <Drawer open={isMobile} onClose={handleMobileClose}>
//             <Chatlist
//               w="70vw"
//               chats={data?.chats}
//               chatId={chatId}
//               handleDeleteChat={handleDeleteChat}
//               newMessageAlert={newMessageAlert}
//               onlineUsers={onlineUsers}
//             />
//           </Drawer>
//         )}

//         <Grid container height={"calc(100vh - 4rem)"}>
//           <Grid
//             size={{ sm: 4, md: 3 }}
//             sx={{
//               display: { xs: "none", sm: "block" },
//             }}
//             height="100%"
//           >
//             {isLoading ? (
//               <Skeleton />
//             ) : (
//               <Chatlist
//                 chats={data?.chats}
//                 chatId={chatId}
//                 handleDeleteChat={handleDeleteChat}
//                 newMessageAlert={newMessageAlert}
//                 onlineUsers={onlineUsers}
//               />
//             )}
//           </Grid>

//           <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height="100%">
//             <WrappedComponent {...props} chatId={chatId} user={user} />
//           </Grid>

//           <Grid
//             size={{ md: 4, lg: 3 }}
//             height="100%"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               padding: "2rem",
//               bgcolor: "#153D4C",
//             }}
//           >
//             <Profile user={user} />
//           </Grid>
//         </Grid>
//       </>
//     );
//   };
// };

// export default AppLayout;
