import { Stack, Box, Typography } from "@mui/material";
import Chatitem from "../shared/Chatitem";

const Chatlist = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      direction={"column"}
      overflow={"auto"}
      height={"100%"}
      spacing={0.5}
      sx={{
        background: "linear-gradient(180deg,#0B172A 0%, #091321 100%)",

        padding: 0, // ❌ removed extra outer padding

        borderRight: "1px solid rgba(255,255,255,0.04)",

        backdropFilter: "blur(20px)",

        "&::-webkit-scrollbar": {
          width: "6px",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.08)",
          borderRadius: "999px",
        },
      }}
    >
      {/* TOP TITLE */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: "1.2rem",
          pt: "0.6rem",
          pb: "0.4rem",
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: "1.7rem",
            fontWeight: 700,
          }}
        >
          Messages
        </Typography>

        <Typography
          sx={{
            color: "#94A3B8",
            fontSize: "0.9rem",
          }}
        >
          {chats.length} chats
        </Typography>
      </Box>

      {/* CHAT ITEMS */}

      {chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const messageAlert = newMessageAlert.find(
          ({ chatId }) => chatId === _id,
        );

        const isOnline = members?.some((member) =>
          onlineUsers.includes(member),
        );

        return (
          <Chatitem
            index={index}
            newMessageAlert={messageAlert}
            isOnline={isOnline}
            avatar={avatar}
            _id={_id}
            key={_id}
            groupChat={groupChat}
            name={name}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default Chatlist;

// import { Stack } from "@mui/material";
// import Chatitem from "../shared/Chatitem";
// import { accentDark } from "../../constants/color";

// const Chatlist = ({
//   w = "100%",
//   chats = [],
//   chatId,
//   onlineUsers = [],
//   newMessageAlert = [
//     {
//       chatId: "",
//       count: 0,
//     },
//   ],
//   handleDeleteChat,
// }) => {
//   return (
//     <Stack
//       width={w}
//       direction={"column"}
//       overflow={"auto"}
//       height={"100%"}
//       sx={{
//         backgroundImage: accentDark,
//       }}
//     >
//       {chats?.map((data, index) => {
//         const { avatar, _id, name, groupChat, members } = data;

//         const messageAlert = newMessageAlert.find(
//           ({ chatId }) => chatId === _id,
//         );

//         const isOnline = members?.some((member) =>
//           onlineUsers.includes(member),
//         );

//         return (
//           <Chatitem
//             index={index}
//             newMessageAlert={messageAlert}
//             isOnline={isOnline}
//             avatar={avatar}
//             _id={_id}
//             key={_id}
//             groupChat={groupChat}
//             name={name}
//             sameSender={chatId === _id}
//             handleDeleteChat={handleDeleteChat}
//           />
//         );
//       })}
//     </Stack>
//   );
// };

// export default Chatlist;
