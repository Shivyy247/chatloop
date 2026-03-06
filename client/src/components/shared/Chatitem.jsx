import { Box, Stack, Typography } from "@mui/material";
import { Link } from "../styles/StyledComponents";
import { memo } from "react";

const Chatitem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link
      sx={{
        padding: "0",
      }}
      to={`/chat/${_id}`}
      onContextMenu={(e) => handleDeleteChatOpen(e, _id, groupChat)}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          padding: "1rem",
          backgroundColor: sameSender ? "#1F3B5C" : "#162C4A",
          color: sameSender ? "#E6EDF5" : "#E6EDF5",
          position: "relative",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#2E5A8A")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = sameSender
            ? "#1F3B5C"
            : "#162C4A")
        }
      >
        {/* avatar card  */}
        <Stack>
          <Typography>{name}</Typography>
          {newMessageAlert && (
            <Typography> {newMessageAlert.count} New Message </Typography>
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
