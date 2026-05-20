// import { Avatar, Stack, Typography, Box } from "@mui/material";

// import {
//   Face as FaceIcon,
//   AlternateEmail as UserNameIcon,
//   CalendarMonth as CalenderIcon,
//   Info as InfoIcon,
// } from "@mui/icons-material";

// import React from "react";

// import moment from "moment";

// import { transfromImage } from "../../lib/features";

// const Profile = ({ user }) => {
//   return (
//     <Stack
//       direction={"column"}
//       alignItems={"center"}
//       spacing={"1.1rem"}
//       sx={{
//         height: "100%",
//         minHeight: 0,
//         flex: 1,
//         justifyContent: "flex-start",
//         paddingTop: "1rem",
//         paddingBottom: 0,
//       }}
//     >
//       {/* TOP SECTION */}

//       <Stack spacing={1} alignItems={"center"}>
//         <Box sx={{ position: "relative" }}>
//           <Box
//             sx={{
//               position: "absolute",
//               inset: -10,
//               borderRadius: "50%",
//               background: "rgba(91,108,255,0.10)",
//               filter: "blur(24px)",
//               zIndex: 0,
//             }}
//           />

//           <Avatar
//             src={transfromImage(user?.avatar?.url)}
//             sx={{
//               width: 170,
//               height: 170,
//               objectFit: "cover",
//               border: "3px solid rgba(255,255,255,0.06)",
//               boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
//               position: "relative",
//               zIndex: 1,
//             }}
//           />
//         </Box>

//         <Typography
//           sx={{
//             fontSize: "1.2rem",
//             fontWeight: 600,
//             color: "var(--text-primary)",
//           }}
//         >
//           {user?.name}
//         </Typography>

//         <Typography
//           sx={{
//             color: "var(--text-secondary)",
//             fontSize: "0.9rem",
//           }}
//         >
//           @{user?.username}
//         </Typography>
//       </Stack>

//       {/* INFO CARDS */}

//       <Stack spacing={"0.85rem"} width={"100%"}>
//         <ProfileCard
//           heading="Bio"
//           text={user?.bio || "No bio available"}
//           Icon={<InfoIcon />}
//         />
//         <ProfileCard
//           heading="Username"
//           text={user?.username}
//           Icon={<UserNameIcon />}
//         />
//         <ProfileCard heading="Name" text={user?.name} Icon={<FaceIcon />} />
//         <ProfileCard
//           heading="Joined"
//           text={moment(user?.createdAt).fromNow()}
//           Icon={<CalenderIcon />}
//         />
//       </Stack>
//     </Stack>
//   );
// };

// const ProfileCard = ({ text, Icon, heading }) => (
//   <Stack
//     direction={"row"}
//     alignItems={"center"}
//     spacing={"1rem"}
//     sx={{
//       color: "white",
//       padding: "1rem 1.1rem",
//       borderRadius: "16px",

//       background: "rgba(12,22,41,0.92)",

//       border: "1px solid rgba(255,255,255,0.05)",

//       transition: "0.2s ease",

//       position: "relative",
//       overflow: "hidden",

//       "&:hover": {
//         background: "rgba(12,22,41,1)",
//         transform: "translateY(-2px)",
//         border: "1px solid rgba(255,255,255,0.08)",
//       },
//     }}
//   >
//     {/* subtle glow (same tone as chatlist background system) */}
//     <Box
//       sx={{
//         position: "absolute",
//         width: 80,
//         height: 80,
//         borderRadius: "50%",
//         background: "rgba(91,108,255,0.08)",
//         filter: "blur(40px)",
//         right: -30,
//         top: -30,
//       }}
//     />

//     {/* Icon */}
//     <Box
//       sx={{
//         width: 40,
//         height: 40,
//         borderRadius: "12px",
//         background: "rgba(255,255,255,0.04)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         color: "var(--text-secondary)",
//       }}
//     >
//       {Icon}
//     </Box>

//     {/* Text */}
//     <Stack spacing={0.2} sx={{ zIndex: 1, overflow: "hidden" }}>
//       <Typography
//         noWrap
//         sx={{
//           fontWeight: 500,
//           color: "var(--text-primary)",
//           fontSize: "0.92rem",
//         }}
//       >
//         {text}
//       </Typography>

//       <Typography
//         sx={{
//           color: "var(--text-secondary)",
//           fontSize: "0.7rem",
//           textTransform: "uppercase",
//           letterSpacing: "1px",
//         }}
//       >
//         {heading}
//       </Typography>
//     </Stack>
//   </Stack>
// );

// export default Profile;

// import { Avatar, Stack, Typography } from '@mui/material';
// import {
//     Face as FaceIcon,
//     AlternateEmail as UserNameIcon,
//     CalendarMonth as CalenderIcon
// } from "@mui/icons-material"
// import React from 'react'
// import moment from "moment"
// import { transfromImage } from '../../lib/features';

// const Profile = ({user}) => {
//   return (
//     <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
//       <Avatar
//         src={transfromImage(user?.avatar?.url)}
//         sx={{
//           width: 200,
//           height: 200,
//           objectFit: "contain",
//           marginBottom: "1rem",
//           border: "5px solid white",
//         }}
//       />
//       <ProfileCard heading={"Bio"} text={user?.bio} />
//       <ProfileCard
//         heading={"Username"}
//         text={user?.username}
//         Icon={<UserNameIcon />}
//       />
//       <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />

//       <ProfileCard
//         heading={"Joined"}
//         text={moment(user.createdAt).fromNow()}
//         Icon={<CalenderIcon />}
//       />
//     </Stack>
//   );
// }

// const ProfileCard = ({ text, Icon, heading }) => <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
//     {Icon && Icon}
//     <Stack>
//         <Typography variant='body1'>{text}</Typography>
//         <Typography color={"gray"} variant='caption' >{heading}</Typography>
//     </Stack>
// </Stack>;

// export default Profile

import { Avatar, Stack, Typography, Box } from "@mui/material";

import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

import React from "react";

import moment from "moment";

import { transfromImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <Stack
      spacing={"1.5rem"}
      alignItems={"center"}
      sx={{
        height: "100%",
        padding: "1.5rem 1rem",
        background: "#F9FAFB",
      }}
    >
      <Avatar
        src={transfromImage(user?.avatar?.url)}
        sx={{
          width: 110,
          height: 110,
          border: "4px solid white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      />

      <Stack spacing={0.3} alignItems={"center"}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#111827",
          }}
        >
          {user?.name}
        </Typography>

        <Typography
          sx={{
            color: "#6B7280",
            fontSize: "0.9rem",
          }}
        >
          @{user?.username}
        </Typography>
      </Stack>

      <Stack spacing={"0.9rem"} width={"100%"}>
        <ProfileCard
          heading="Bio"
          text={user?.bio || "No bio available"}
          icon={<InfoIcon />}
        />

        <ProfileCard
          heading="Username"
          text={user?.username}
          icon={<UserNameIcon />}
        />

        <ProfileCard heading="Name" text={user?.name} icon={<FaceIcon />} />

        <ProfileCard
          heading="Joined"
          text={moment(user?.createdAt).fromNow()}
          icon={<CalendarIcon />}
        />
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={"1rem"}
    alignItems={"center"}
    sx={{
      background: "white",
      borderRadius: "14px",
      padding: "1rem",
      border: "1px solid #E5E7EB",
    }}
  >
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: "12px",
        background: "#ECFDF5",
        color: "#10B981",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>

    <Stack spacing={0.2}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "0.92rem",
          color: "#111827",
        }}
      >
        {text}
      </Typography>

      <Typography
        sx={{
          fontSize: "0.72rem",
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;