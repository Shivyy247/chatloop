import React from "react";
import { Box, Typography } from "@mui/material";
import { transfromImage } from "../../lib/features";
import {
  FileOpen as FileOpenIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";

const RenderAttachment = ({ file, url }) => {
  // WhatsApp Style subtle border
  const commonBorder = "1px solid rgba(255, 255, 255, 0.1)";

  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width={"200px"}
          controls
          style={{
            borderRadius: "8px",
            background: "#000",
            display: "block",
          }}
        />
      );

    case "image":
      return (
        <img
          src={transfromImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          style={{
            objectFit: "cover",
            borderRadius: "8px",
            border: commonBorder,
            display: "block",
          }}
        />
      );

    case "audio":
      return (
        <Box
          sx={{
            background: "#111b21", // Dark sidebar color for audio bars
            padding: "0.5rem",
            borderRadius: "8px",
            border: commonBorder,
            width: "200px",
            "& audio": {
              width: "100%",
              height: "35px",
            },
          }}
        >
          <audio src={url} preload="none" controls />
        </Box>
      );

    default:
      return (
        <Box
          sx={{
            width: 200,
            padding: "0.75rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            borderRadius: "8px",
            background: "#1f2c33", // Lighter charcoal for files
            border: commonBorder,
            color: "#e9edef",
          }}
        >
          <FileIcon sx={{ color: "#8696a0" }} />

          <Typography
            variant="caption"
            noWrap
            sx={{
              fontSize: "0.8rem",
              color: "#e9edef",
              flex: 1,
            }}
          >
            File Attachment
          </Typography>

          <FileOpenIcon sx={{ fontSize: "1.2rem", color: "#00a884" }} />
        </Box>
      );
  }
};

export default RenderAttachment;
