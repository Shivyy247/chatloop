// import React from "react";

// import { Avatar, Box, Stack } from "@mui/material";

// import { transfromImage } from "../../lib/features";

// const AvatarCard = ({ avatar = [], max = 4 }) => {
//   const avatars = Array.isArray(avatar) ? avatar : [avatar];

//   const visibleAvatars = avatars.slice(0, max);

//   return (
//     <Stack
//       direction={"row"}
//       sx={{
//         position: "relative",

//         width:
//           visibleAvatars.length > 1
//             ? `${visibleAvatars.length * 18 + 36}px`
//             : "48px",

//         height: "48px",
//       }}
//     >
//       {visibleAvatars.map((i, index) => (
//         <Box
//           key={index}
//           sx={{
//             position: "absolute",

//             left: `${index * 18}px`,

//             transition: "transform 0.25s ease",

//             "&:hover": {
//               transform: "translateY(-2px)",
//             },

//             zIndex: visibleAvatars.length - index,
//           }}
//         >
//           <Avatar
//             src={transfromImage(i)}
//             alt={`Avatar ${index}`}
//             sx={{
//               width: 48,
//               height: 48,

//               border: "2px solid rgba(11,23,42,0.9)",

//               background: "rgba(255,255,255,0.08)",

//               boxShadow: "0 6px 18px rgba(0,0,0,0.28)",

//               backdropFilter: "blur(10px)",
//             }}
//           />
//         </Box>
//       ))}
//     </Stack>
//   );
// };

// export default AvatarCard;

// import React from "react";
// import { Avatar, AvatarGroup, Box, Stack } from "@mui/material";
// import { transfromImage } from "../../lib/features";

// const AvatarCard = ({ avatar = [], max = 4 }) => {
//   const avatars = Array.isArray(avatar) ? avatar : [avatar];

//   return (
//     <Stack direction={"row"} spacing={0.5}>
//       <AvatarGroup max={max}
//         sx={{
//           position: "relative"
//         }}
//       >
//         <Box width={"5rem"} height={"3rem"}>
//           {avatars.map((i, index) => (
//             <Avatar
//               key={index}
//               src={transfromImage(i)}
//               alt={`Avatar ${index}`}
//               sx={{
//                 width: "3rem",
//                 height: "3rem",
//                 position: "absolute",
//                 left: {
//                   xs: `${0.5 + index}rem`,
//                   sm: `${index}rem`
//                 }
//               }}
//             />
//           ))}
//         </Box>
//       </AvatarGroup>
//     </Stack>
//   );
// };

// export default AvatarCard;

import React from "react";

import { Avatar, AvatarGroup, Box } from "@mui/material";

import { transfromImage } from "../../lib/features";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  const avatars = Array.isArray(avatar) ? avatar : [avatar];

  return (
    <AvatarGroup
      max={max}
      sx={{
        justifyContent: "flex-start",

        "& .MuiAvatar-root": {
          width: 42,
          height: 42,
          fontSize: "0.9rem",
          border: "2px solid white",
          background: "#D1FAE5",
          color: "#065F46",
        },
      }}
    >
      {avatars.map((i, index) => (
        <Avatar key={index} src={transfromImage(i)} alt={`Avatar ${index}`} />
      ))}
    </AvatarGroup>
  );
};

export default AvatarCard;