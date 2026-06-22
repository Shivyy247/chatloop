import { Box, Stack, Typography } from "@mui/material";
import { Link } from "../styles/StyledComponents";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GroupsIcon from "@mui/icons-material/Groups";


const Chatitem = ({
  avatar = [],
  groupAvatar,
  name,
  _id,
  groupChat = false,
  members = [],
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const { chatId } = useParams();
  const activeChat = chatId === String(_id);

  return (
    <Link
      sx={{ textDecoration: "none", padding: 0 }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => {
        e.preventDefault();
        handleDeleteChat(e, _id, groupChat);
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -10 }} // Sliding effect for smoother entry
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: index * 0.02 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={"0.85rem"}
          sx={{
            position: "relative",
            padding: "0.85rem 1rem",
            // WhatsApp style border color
            borderBottom: "1px solid #222d34",
            // Jab active ho toh WhatsApp ka dark hover color (#2a3942)
            backgroundColor: activeChat ? "#2a3942" : "transparent",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: activeChat ? "#2a3942" : "#202c33",
            },
          }}
        >
          {/* Active Indicator Bar (Left Side) */}
          {activeChat && (
            <Box
              sx={{
                position: "absolute",
                left: 0,
                width: "4px",
                height: "100%",
                background: "#00a884", // Pure WhatsApp Emerald
              }}
            />
          )}

          {/* Avatar Section */}
          <Box sx={{ position: "relative", flexShrink: 0 }}>
            <AvatarCard avatar={avatar} groupAvatar={groupAvatar} />

            {groupChat ? (
              <Box
                sx={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  bgcolor: "#00a884",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #111b21",
                }}
              >
                <GroupsIcon
                  sx={{
                    fontSize: 10,
                    color: "#fff",
                  }}
                />
              </Box>
            ) : (
              isOnline && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 2,
                    right: 2,
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#00a884",
                    border: "2px solid #111b21",
                  }}
                />
              )
            )}
          </Box>

          {/* Name and Status Section */}
          <Stack spacing={0.3} sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography
              noWrap
              sx={{
                fontSize: "1rem",
                fontWeight: activeChat ? 600 : 400,
                // Jab select ho toh text color green rakhte hain
                color: activeChat ? "#00a884" : "#e9edef",
              }}
            >
              {name}
            </Typography>

            <Typography
              noWrap
              sx={{
                fontSize: "0.82rem",
                color: activeChat ? "#00a884" : "#8696a0",
                opacity: activeChat ? 0.9 : 1,
              }}
            >
              {groupChat
                ? `${members?.length || 0} members • Group`
                : isOnline
                  ? "Online"
                  : "Tap to chat"}
            </Typography>
          </Stack>

          {/* Notification Badge */}
          {newMessageAlert && (
            <Stack alignItems="flex-end" spacing={0.5}>
              <Box
                sx={{
                  minWidth: "20px",
                  height: "20px",
                  px: "6px",
                  borderRadius: "50%",
                  background: "#00a884",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0b141a",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {newMessageAlert.count}
              </Box>
            </Stack>
          )}
        </Stack>
      </motion.div>
    </Link>
  );
};

export default memo(Chatitem);
