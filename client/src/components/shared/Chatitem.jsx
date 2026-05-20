// import { Box, Stack, Typography } from "@mui/material";
// import { Link } from "../styles/StyledComponents";
// import { memo } from "react";
// import AvatarCard from "./AvatarCard";
// import { useParams } from "react-router-dom";
// import { motion } from 'framer-motion';
// const Chatitem = ({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,
// }) => {
//   const { chatId } = useParams();
//   const activeChat = chatId === String(_id);

//   return (
//     <Link
//       sx={{
//         padding: "0",
//       }}
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => {
//         e.preventDefault();
//         handleDeleteChat(e, _id, groupChat);
//       }}
//     >
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.2 }}
//         style={{
//           display: "flex",
//           gap: "1rem",
//           alignItems: "center",
//           padding: "1rem",
//           backgroundColor: activeChat ? "#0F172A" : "#162C4A",
//           color: "#E6EDF5",
//           position: "relative",
//           borderBottom: "2px solid rgba(255,255,255,0.35)",
//         }}
//         onMouseEnter={(e) => {
//           if (!activeChat) {
//             e.currentTarget.style.backgroundColor = "#2E5A8A";
//           }
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.backgroundColor = activeChat
//             ? "#0F172A"
//             : "#162C4A";
//         }}
//       >
//         <AvatarCard avatar={avatar} />

//         <Stack>
//           <Typography>{name}</Typography>
//           {newMessageAlert && (
//             <Typography>{newMessageAlert.count} New Message</Typography>
//           )}
//         </Stack>

//         {isOnline && (
//           <Box
//             sx={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               backgroundColor: "#22C55E",
//               position: "absolute",
//               top: "50%",
//               right: "1rem",
//               transform: "translateY(-50%)",
//             }}
//           />
//         )}
//       </motion.div>
//     </Link>
//   );
// };

// export default memo(Chatitem);

// import { Box, Stack, Typography } from "@mui/material";

// import { Link } from "../styles/StyledComponents";

// import { memo } from "react";

// import AvatarCard from "./AvatarCard";

// import { useParams } from "react-router-dom";

// import { motion } from "framer-motion";

// const Chatitem = ({
//   avatar = [],
//   name,
//   _id,
//   groupChat = false,
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   index = 0,
//   handleDeleteChat,
// }) => {
//   const { chatId } = useParams();

//   const activeChat = chatId === String(_id);

//   return (
//     <Link
//       sx={{
//         padding: 0,

//         textDecoration: "none",
//       }}
//       to={`/chat/${_id}`}
//       onContextMenu={(e) => {
//         e.preventDefault();

//         handleDeleteChat(e, _id, groupChat);
//       }}
//     >
//       <motion.div
//         initial={{
//           opacity: 0,
//           y: 12,
//         }}
//         animate={{
//           opacity: 1,
//           y: 0,
//         }}
//         transition={{
//           delay: index * 0.03,
//           duration: 0.25,
//         }}
//         whileHover={{
//           y: -2,
//         }}
//         style={{
//           display: "flex",

//           gap: "1rem",

//           alignItems: "center",

//           padding: "1rem",

//           background: activeChat
//             ? "rgba(91,108,255,0.14)"
//             : "rgba(255,255,255,0.02)",

//           border: activeChat
//             ? "1px solid rgba(91,108,255,0.24)"
//             : "1px solid transparent",

//           color: "white",

//           position: "relative",

//           marginBottom: "0.45rem",

//           borderRadius: "20px",

//           transition: "all 0.25s ease",

//           backdropFilter: "blur(18px)",

//           overflow: "hidden",

//           boxShadow: activeChat ? "0 10px 30px rgba(91,108,255,0.12)" : "none",
//         }}
//         onMouseEnter={(e) => {
//           if (!activeChat) {
//             e.currentTarget.style.background = "rgba(255,255,255,0.05)";
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!activeChat) {
//             e.currentTarget.style.background = "rgba(255,255,255,0.02)";
//           }
//         }}
//       >
//         {/* Glow Background */}

//         {activeChat && (
//           <Box
//             sx={{
//               position: "absolute",

//               width: 100,
//               height: 100,

//               borderRadius: "50%",

//               background: "rgba(91,108,255,0.18)",

//               filter: "blur(60px)",

//               top: -40,
//               right: -30,
//             }}
//           />
//         )}

//         {/* Active Indicator */}

//         {activeChat && (
//           <Box
//             sx={{
//               width: "4px",

//               height: "65%",

//               borderRadius: "20px",

//               background: "linear-gradient(180deg,#7BE7D7,#5B6CFF)",

//               position: "absolute",

//               left: 0,
//             }}
//           />
//         )}

//         {/* Avatar */}

//         <Box
//           sx={{
//             position: "relative",

//             zIndex: 2,
//           }}
//         >
//           <AvatarCard avatar={avatar} />

//           {isOnline && (
//             <Box
//               sx={{
//                 width: 12,
//                 height: 12,

//                 borderRadius: "50%",

//                 background: "#22C55E",

//                 border: "2px solid #0B172A",

//                 position: "absolute",

//                 bottom: 0,
//                 right: 0,

//                 boxShadow: "0 0 12px rgba(34,197,94,0.7)",
//               }}
//             />
//           )}
//         </Box>

//         {/* Content */}

//         <Stack
//           spacing={0.4}
//           sx={{
//             flexGrow: 1,

//             overflow: "hidden",

//             zIndex: 2,
//           }}
//         >
//           <Typography
//             noWrap
//             sx={{
//               fontWeight: activeChat ? 600 : 500,

//               fontSize: "0.98rem",

//               color: "var(--text-primary)",

//               letterSpacing: "-0.2px",
//             }}
//           >
//             {name}
//           </Typography>

//           {newMessageAlert && (
//             <Typography
//               sx={{
//                 color: "var(--accent)",

//                 fontSize: "0.78rem",

//                 fontWeight: 500,
//               }}
//             >
//               {newMessageAlert.count} new message
//             </Typography>
//           )}
//         </Stack>

//         {/* Unread Count */}

//         {newMessageAlert && (
//           <Box
//             sx={{
//               minWidth: 24,
//               height: 24,

//               borderRadius: "50%",

//               background: "linear-gradient(135deg,#5B6CFF,#7C8CFF)",

//               display: "flex",

//               alignItems: "center",

//               justifyContent: "center",

//               fontSize: "0.75rem",

//               fontWeight: 600,

//               color: "white",

//               padding: "0 6px",

//               zIndex: 2,

//               boxShadow: "0 8px 20px rgba(91,108,255,0.3)",
//             }}
//           >
//             {newMessageAlert.count}
//           </Box>
//         )}
//       </motion.div>
//     </Link>
//   );
// };

// export default memo(Chatitem);

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
        padding: 0,
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
          duration: 0.2,
          delay: index * 0.03,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.9rem",

          padding: "0.9rem 1rem",

          borderRadius: "16px",

          backgroundColor: activeChat ? "#DDF4EC" : "transparent",

          border: activeChat ? "1px solid #B7E4D2" : "1px solid transparent",

          transition: "all 0.2s ease",

          position: "relative",
        }}
        onMouseEnter={(e) => {
          if (!activeChat) {
            e.currentTarget.style.backgroundColor = "#F2F8F5";
          }
        }}
        onMouseLeave={(e) => {
          if (!activeChat) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {activeChat && (
          <Box
            sx={{
              position: "absolute",
              left: "-0.5rem",
              width: "4px",
              height: "55%",
              borderRadius: "10px",
              backgroundColor: "#10B981",
            }}
          />
        )}

        <Box sx={{ position: "relative" }}>
          <AvatarCard avatar={avatar} />

          {isOnline && (
            <Box
              sx={{
                width: "11px",
                height: "11px",
                borderRadius: "50%",
                backgroundColor: "#22C55E",
                border: "2px solid white",
                position: "absolute",
                bottom: 2,
                right: 2,
              }}
            />
          )}
        </Box>

        <Stack
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
          spacing={0.2}
        >
          <Typography
            noWrap
            sx={{
              fontSize: "0.97rem",
              fontWeight: activeChat ? 600 : 500,
              color: "#111827",
            }}
          >
            {name}
          </Typography>

          {newMessageAlert && (
            <Typography
              sx={{
                fontSize: "0.78rem",
                color: "#059669",
                fontWeight: 500,
              }}
            >
              {newMessageAlert.count} new message
            </Typography>
          )}
        </Stack>

        {newMessageAlert && (
          <Box
            sx={{
              minWidth: "22px",
              height: "22px",
              borderRadius: "999px",
              backgroundColor: "#10B981",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "white",
              fontSize: "0.72rem",
              fontWeight: 600,

              px: "6px",
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