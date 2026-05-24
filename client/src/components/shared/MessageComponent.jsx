import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message || {};

  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).format("h:mm A");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: sameSender ? "flex-end" : "flex-start",
        width: "100%",
        // Vertical spacing: same sender ke messages chipke rahenge
        marginBottom: "4px",
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "90%",
            sm: "80%",
            md: "60%",
          },
          px: "0.6rem",
          pt: "0.3rem",
          pb: "0.2rem",
          borderRadius: sameSender
            ? "8px 0px 8px 8px" // WhatsApp style sharp corner for tail
            : "0px 8px 8px 8px",

          background: sameSender ? "#005c4b" : "#202c33", // Solid WhatsApp Dark Colors
          color: "#e9edef",
          position: "relative",
          boxShadow: "0 1px 0.5px rgba(0,0,0,0.13)",
          minWidth: "60px",
        }}
      >
        {/* Sender Name for Groups */}
        {!sameSender && (
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#53bdeb", // WhatsApp default light blue for other names
              mb: "0.1rem",
              px: "0.2rem",
              display: "block",
            }}
          >
            {sender?.name || "Unknown"}
          </Typography>
        )}

        {/* Attachments Section */}
        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;
            const file = fileFormat(url);

            return (
              <Box
                key={index}
                sx={{
                  mt: "0.2rem",
                  mb: "0.2rem",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <RenderAttachment file={file} url={url} />
                </a>
              </Box>
            );
          })}

        {/* Content & Time Wrapper - This makes the time float next to text */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexWrap: "wrap",
            px: "0.2rem",
          }}
        >
          {content && (
            <Typography
              sx={{
                fontSize: "0.9rem",
                lineHeight: 1.4,
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
                color: "#e9edef",
                flex: "1 1 auto",
                mr: "1rem", // Space for the floating timestamp
                mb: "0.2rem",
              }}
            >
              {content}
            </Typography>
          )}

          {/* Timestamp - Tucked in bottom right */}
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "#8696a0",
              pb: "0.2rem",
              ml: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {timeAgo}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default memo(MessageComponent);
