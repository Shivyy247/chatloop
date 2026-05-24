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
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.18,
      }}
      style={{
        display: "flex",

        flexDirection: "column",

        alignItems: sameSender ? "flex-end" : "flex-start",

        width: "100%",
      }}
    >
      <Box
        sx={{
          maxWidth: {
            xs: "85%",
            sm: "74%",
            md: "68%",
          },

          px: "0.95rem",

          py: "0.72rem",

          borderRadius: sameSender
            ? "18px 18px 5px 18px"
            : "18px 18px 18px 5px",

          background: sameSender ? "var(--primary)" : "var(--bg-card)",

          color: sameSender ? "#ffffff" : "var(--text-primary)",

          border: sameSender ? "none" : "1px solid var(--border-color)",

          boxShadow: sameSender
            ? "0 2px 10px rgba(0,168,132,0.14)"
            : "0 2px 8px rgba(0,0,0,0.16)",

          backdropFilter: "blur(10px)",

          transition: "0.2s ease",

          "&:hover": {
            transform: "translateY(-1px)",
          },
        }}
      >
        {!sameSender && (
          <Typography
            sx={{
              fontSize: "0.76rem",

              fontWeight: 600,

              color: "var(--primary)",

              mb: "0.28rem",

              letterSpacing: "0.2px",
            }}
          >
            {sender?.name || "Unknown"}
          </Typography>
        )}

        {content && (
          <Typography
            sx={{
              fontSize: "0.94rem",

              lineHeight: 1.55,

              wordBreak: "break-word",

              color: sameSender ? "#ffffff" : "var(--text-primary)",
            }}
          >
            {content}
          </Typography>
        )}

        {attachments.length > 0 &&
          attachments.map((attachment, index) => {
            const url = attachment.url;

            const file = fileFormat(url);

            return (
              <Box
                key={index}
                sx={{
                  mt: "0.7rem",

                  borderRadius: "14px",

                  overflow: "hidden",

                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    textDecoration: "none",

                    color: sameSender ? "#ffffff" : "var(--text-primary)",
                  }}
                >
                  <RenderAttachment file={file} url={url} />
                </a>
              </Box>
            );
          })}

        <Typography
          sx={{
            fontSize: "0.66rem",

            mt: "0.42rem",

            textAlign: "right",

            color: sameSender
              ? "rgba(255,255,255,0.72)"
              : "var(--text-secondary)",

            letterSpacing: "0.2px",
          }}
        >
          {timeAgo}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default memo(MessageComponent);
