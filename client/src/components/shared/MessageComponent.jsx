// import { Box, Typography } from "@mui/material";

// import moment from "moment";

// import React, { memo } from "react";

// import { fileFormat } from "../../lib/features";

// import RenderAttachment from "./RenderAttachment";

// import { motion } from "framer-motion";

// const MessageComponent = ({ message, user }) => {
//   const { sender, content, attachments = [], createdAt } = message || {};

//   const sameSender = sender?._id === user?._id;

//   const timeAgo = moment(createdAt).format("h:mm A");

//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 12,
//         scale: 0.98,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//         scale: 1,
//       }}
//       transition={{
//         duration: 0.22,
//       }}
//       style={{
//         alignSelf: sameSender ? "flex-end" : "flex-start",

//         maxWidth: "75%",

//         display: "flex",

//         flexDirection: "column",
//       }}
//     >
//       <Box
//         sx={{
//           position: "relative",

//           padding: "0.9rem 1rem",

//           borderRadius: sameSender
//             ? "22px 22px 6px 22px"
//             : "22px 22px 22px 6px",

//           background: sameSender
//             ? "linear-gradient(135deg,#5B6CFF,#6E7DFF)"
//             : "rgba(255,255,255,0.05)",

//           border: sameSender ? "none" : "1px solid rgba(255,255,255,0.06)",

//           color: "white",

//           backdropFilter: "blur(18px)",

//           overflow: "hidden",

//           boxShadow: sameSender ? "0 10px 30px rgba(91,108,255,0.28)" : "none",
//         }}
//       >
//         {/* Glow */}

//         {sameSender && (
//           <Box
//             sx={{
//               position: "absolute",

//               width: 100,
//               height: 100,

//               borderRadius: "50%",

//               background: "rgba(255,255,255,0.10)",

//               filter: "blur(50px)",

//               top: -40,
//               right: -40,
//             }}
//           />
//         )}

//         {/* Sender */}

//         {!sameSender && (
//           <Typography
//             sx={{
//               color: "#7BE7D7",

//               fontWeight: 600,

//               fontSize: "0.78rem",

//               marginBottom: "0.35rem",
//             }}
//           >
//             {sender?.name || "Unknown"}
//           </Typography>
//         )}

//         {/* Message */}

//         {content && (
//           <Typography
//             sx={{
//               fontSize: "0.95rem",

//               lineHeight: 1.6,

//               color: "white",

//               wordBreak: "break-word",

//               zIndex: 2,

//               position: "relative",
//             }}
//           >
//             {content}
//           </Typography>
//         )}

//         {/* Attachments */}

//         {attachments.length > 0 &&
//           attachments.map((attachment, index) => {
//             const url = attachment.url;

//             const file = fileFormat(url);

//             return (
//               <Box
//                 key={index}
//                 sx={{
//                   marginTop: "0.8rem",

//                   borderRadius: "16px",

//                   overflow: "hidden",

//                   border: "1px solid rgba(255,255,255,0.08)",
//                 }}
//               >
//                 <a
//                   href={url}
//                   target="_blank"
//                   download
//                   style={{
//                     color: "white",

//                     textDecoration: "none",
//                   }}
//                 >
//                   <RenderAttachment file={file} url={url} />
//                 </a>
//               </Box>
//             );
//           })}

//         {/* Time */}

//         <Typography
//           sx={{
//             fontSize: "0.7rem",

//             opacity: 0.72,

//             marginTop: "0.45rem",

//             textAlign: "right",

//             color: sameSender ? "rgba(255,255,255,0.82)" : "#94A3B8",
//           }}
//         >
//           {timeAgo}
//         </Typography>
//       </Box>
//     </motion.div>
//   );
// };

// export default memo(MessageComponent);

// import { Box, Typography } from "@mui/material";
// import moment from "moment";
// import React, { memo } from "react";
// import { fileFormat } from "../../lib/features";
// import RenderAttachment from "./RenderAttachment";
// import { motion } from 'framer-motion';

// const MessageComponent = ({ message, user }) => {
//   const { sender, content, attachments = [], createdAt } = message || {};

//   const sameSender = sender?._id === user?._id;

//   const timeAgo = moment(createdAt).fromNow();

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -100 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.3 }}
//       style={{
//         alignSelf: sameSender ? "flex-end" : "flex-start",
//         backgroundColor: "white",
//         color: "black",
//         borderRadius: "5px",
//         padding: "0.5rem",
//         width: "fit-content",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       {!sameSender && (
//         <Typography color={"#2694ab"} fontWeight={"600"} variant="caption">
//           {sender?.name || "Unknown"}
//         </Typography>
//       )}

//       {content && <Typography>{content}</Typography>}

//       {attachments.length > 0 &&
//         attachments.map((attachment, index) => {
//           const url = attachment.url;
//           const file = fileFormat(url);

//           return (
//             <Box key={index}>
//               <a
//                 href={url}
//                 target="_blank"
//                 download
//                 style={{
//                   color: "black",
//                 }}
//               >
//                 <RenderAttachment file={file} url={url} />
//               </a>
//             </Box>
//           );
//         })}

//       <Typography
//         variant="caption"
//         color="textSecondary"
//         style={{ alignSelf: "flex-end" }}
//       >
//         {timeAgo}
//       </Typography>
//     </motion.div>
//   );
// };

// export default memo(MessageComponent);

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
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        maxWidth: "72%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          px: "1rem",
          py: "0.7rem",

          borderRadius: sameSender
            ? "18px 18px 4px 18px"
            : "18px 18px 18px 4px",

          background: sameSender ? "#10B981" : "#FFFFFF",

          color: sameSender ? "white" : "#111827",

          border: sameSender ? "none" : "1px solid rgba(16,185,129,0.12)",

          boxShadow: sameSender
            ? "0 4px 10px rgba(16,185,129,0.18)"
            : "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {!sameSender && (
          <Typography
            sx={{
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "#059669",
              mb: "0.2rem",
            }}
          >
            {sender?.name || "Unknown"}
          </Typography>
        )}

        {content && (
          <Typography
            sx={{
              fontSize: "0.95rem",
              lineHeight: 1.5,
              wordBreak: "break-word",
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
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <a
                  href={url}
                  target="_blank"
                  download
                  style={{
                    textDecoration: "none",
                    color: sameSender ? "white" : "#111827",
                  }}
                >
                  <RenderAttachment file={file} url={url} />
                </a>
              </Box>
            );
          })}

        <Typography
          sx={{
            fontSize: "0.68rem",
            mt: "0.35rem",
            textAlign: "right",
            opacity: 0.7,
            color: sameSender ? "white" : "#6B7280",
          }}
        >
          {timeAgo}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default memo(MessageComponent);