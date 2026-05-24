import React from "react";
import { Box } from "@mui/material";
import { transfromImage } from "../../lib/features";
import {
  FileOpen as FileOpenIcon,
  InsertDriveFile as FileIcon,
} from "@mui/icons-material";


const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "video":
      return (
        <video
          src={url}
          preload="none"
          width={"200px"}
          controls
          style={{
            borderRadius: "12px",
            background: "black",
          }}
        />
      );

    case "image":
      return (
        <img
          src={transfromImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "cover",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
          }}
        />
      );

    case "audio":
      return (
        <Box
          sx={{
            background: "var(--bg-primary)",
            padding: "0.6rem",
            borderRadius: "12px",
            border: "1px solid var(--border-color)",
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
            padding: "1rem",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",

            borderRadius: "12px",

            background: "var(--bg-primary)",

            border: "1px solid var(--border-color)",

            color: "var(--text-primary)",
          }}
        >
          <FileIcon />

          <FileOpenIcon />
        </Box>
      );
  }
};

export default RenderAttachment;
