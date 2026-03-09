import { Box, Stack, Typography } from "@mui/material";
import { Link } from "../styles/StyledComponents";
import { memo } from "react";
import AvatarCard from "./AvatarCard";
import { useParams } from "react-router-dom";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
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
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: activeChat ? "#0F172A" : "#162C4A",
          color: "#E6EDF5",
          position: "relative",
          borderBottom: "2px solid rgba(255,255,255,0.35)",
        }}
        onMouseEnter={(e) => {
          if (!activeChat) {
            e.currentTarget.style.backgroundColor = "#2E5A8A";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = activeChat
            ? "#0F172A"
            : "#162C4A";
        }}
      >
        <AvatarCard avatar={avatar} />

        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography>{newMessageAlert.count} New Message</Typography>
          )}
        </Stack>

        {isOnline && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#22C55E",
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
            }}
          />
        )}
      </div>
    </Link>
  );
};

export default memo(Chatitem);
