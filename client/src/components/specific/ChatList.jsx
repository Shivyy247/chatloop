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
      height={"100%"}
      sx={{
        background: "linear-gradient(to bottom, #111827 0%, #0F172A 100%)",

        overflowY: "auto",

        position: "relative",

        "&::-webkit-scrollbar": {
          width: "5px",
        },

        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },

        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.08)",

          borderRadius: "20px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
          background: "rgba(255,255,255,0.16)",
        },
      }}
    >
      <Box
        sx={{
          position: "sticky",

          top: 0,

          zIndex: 20,

          px: "1.25rem",

          pt: "1.2rem",

          pb: "1rem",

          background: "rgba(17,24,39,0.92)",

          backdropFilter: "blur(16px)",

          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.45rem",

            fontWeight: 700,

            color: "var(--text-primary)",

            letterSpacing: "-0.5px",
          }}
        >
          Messages
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",

            color: "var(--text-secondary)",

            mt: "0.2rem",
          }}
        >
          Stay connected with your people
        </Typography>
      </Box>

      <Stack
        spacing={0.25}
        sx={{
          padding: "0.65rem",
        }}
      >
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
    </Stack>
  );
};

export default Chatlist;
