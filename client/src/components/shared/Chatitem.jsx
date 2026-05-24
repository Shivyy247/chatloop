import { Box, Stack, Typography } from "@mui/material";

import { Link } from "../styles/StyledComponents";

import { memo } from "react";

import AvatarCard from "./AvatarCard";

import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const { chatId } = useParams();

  const activeChat = chatId === String(_id);

  return (
    <Link
      sx={{
        textDecoration: "none",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => {
        e.preventDefault();

        handleDeleteChat(e, _id, groupChat);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.22,
          delay: index * 0.03,
        }}
        style={{
          position: "relative",

          display: "flex",

          alignItems: "center",

          gap: "0.9rem",

          padding: "0.9rem",

          borderRadius: "20px",

          marginBottom: "0.18rem",

          background: activeChat
            ? "linear-gradient(135deg, #1E293B 0%, #243447 100%)"
            : "transparent",

          border: activeChat
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",

          transition: "all 0.22s ease",

          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (!activeChat) {
            e.currentTarget.style.background = "rgba(30, 41, 59, 0.55)";
          }
        }}
        onMouseLeave={(e) => {
          if (!activeChat) {
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        {activeChat && (
          <Box
            sx={{
              position: "absolute",

              left: 0,

              top: "22%",

              width: "4px",

              height: "56%",

              borderRadius: "0px 10px 10px 0px",

              background: "linear-gradient(to bottom, #14B8A6, #0F766E)",
            }}
          />
        )}

        <Box
          sx={{
            position: "relative",

            flexShrink: 0,
          }}
        >
          <AvatarCard avatar={avatar} />

          {isOnline && (
            <Box
              sx={{
                position: "absolute",

                bottom: 2,

                right: 2,

                width: "11px",

                height: "11px",

                borderRadius: "50%",

                background: "#22C55E",

                border: "2px solid #0F172A",
              }}
            />
          )}
        </Box>

        <Stack
          spacing={0.2}
          sx={{
            minWidth: 0,

            flexGrow: 1,
          }}
        >
          <Typography
            noWrap
            sx={{
              fontSize: "0.96rem",

              fontWeight: activeChat ? 600 : 500,

              color: activeChat ? "#F8FAFC" : "var(--text-primary)",

              letterSpacing: "-0.2px",
            }}
          >
            {name}
          </Typography>

          <Typography
            noWrap
            sx={{
              fontSize: "0.77rem",

              color: activeChat
                ? "rgba(255,255,255,0.65)"
                : "var(--text-secondary)",
            }}
          >
            {isOnline ? "Online now" : "Tap to open chat"}
          </Typography>
        </Stack>

        {newMessageAlert && (
          <Box
            sx={{
              minWidth: "23px",

              height: "23px",

              px: "6px",

              borderRadius: "999px",

              background: "linear-gradient(135deg,#14B8A6,#0F766E)",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              color: "white",

              fontSize: "0.72rem",

              fontWeight: 700,

              flexShrink: 0,

              boxShadow: "0 4px 12px rgba(20,184,166,0.35)",
            }}
          >
            {newMessageAlert.count}
          </Box>
        )}
      </motion.div>
    </Link>
  );
};

export default memo(Chatitem);
