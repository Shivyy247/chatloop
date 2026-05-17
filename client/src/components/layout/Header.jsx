import {
  AppBar,
  Backdrop,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";

import { lazy, Suspense } from "react";

import {
  Menu as MenuIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcons,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { server } from "../../constants/config";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { userNotExists } from "../../redux/reducers/auth";

import {
  setIsMobile,
  setIsNotification,
  setIsSearch,
  setIsNewGroup,
} from "../../redux/reducers/misc";

import { resetNotificationCount } from "../../redux/reducers/chat";

const SearchDialog = lazy(() => import("../specific/Search"));
const NofificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc,
  );

  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));

  const OpenSearchDialog = () => dispatch(setIsSearch(true));

  const openNewGroup = () => dispatch(setIsNewGroup(true));

  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  };

  const navigateToGroup = () => navigate("/group");

  const LogoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());

      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          height: "4.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(to right, #081120, #0B1527)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "4.5rem !important",
              px: { xs: 1, sm: 1, md: 2 },
            }}
          >
            {/* LOGO SECTION */}
            <Stack
              direction="row"
              alignItems="center"
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                gap: "4px",
              }}
            >
              <Box
                component="img"
                src="/logo2.png"
                alt="Logo"
                sx={{
                  width: 40,
                  height: 40,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 12px rgba(94,234,212,0.35))",
                  transition: "0.3s ease",

                  "&:hover": {
                    transform: "rotate(-4deg) scale(1.04)",
                  },
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                  background: "linear-gradient(90deg,#ffffff,#cbd5e1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ChatLoop
              </Typography>
            </Stack>

            {/* MOBILE MENU */}
            <Box sx={{ display: { xs: "block", sm: "none" }, ml: 1 }}>
              <IconButton
                color="inherit"
                onClick={handleMobile}
                sx={{
                  borderRadius: "14px",
                  color: "#CBD5E1",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.06)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* ACTION ICONS */}
            <Stack direction={"row"} spacing={1}>
              <IconBtn
                title="Search"
                icon={<SearchIcons />}
                onClick={OpenSearchDialog}
              />
              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title="Manage Group"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NofificationDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick, value }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        color="inherit"
        size="large"
        onClick={onClick}
        sx={{
          color: "#94A3B8",

          borderRadius: "14px",

          transition: "all 0.25s ease",

          width: 44,
          height: 44,

          "&:hover": {
            bgcolor: "rgba(255,255,255,0.06)",

            color: "white",

            transform: "translateY(-2px)",
          },
        }}
      >
        {value ? (
          <Badge badgeContent={value} color="error">
            {icon}
          </Badge>
        ) : (
          icon
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;

// import {
//   Add as AddIcon,
//   Group as GroupIcon,
//   Logout as LogoutIcon,
//   Menu as MenuIcon,
//   Notifications as NotificationsIcon,
//   Search as SearchIcons,
// } from "@mui/icons-material";
// import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
// import axios from "axios";
// import { lazy, Suspense } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { headerBg } from "../../constants/color";
// import { server } from "../../constants/config";
// import { userNotExists } from "../../redux/reducers/auth";
// import { resetNotificationCount } from "../../redux/reducers/chat";
// import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
// const SearchDialog = lazy(()=> import("../specific/Search"))
// const NofificationDialog = lazy(() => import("../specific/Notifications"));
// const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

// const Header = () => {

//   const navigate = useNavigate()

//   const dispatch = useDispatch();

//   const { isSearch, isNotification, isNewGroup } = useSelector(
//     (state) => state.misc,
//   );
//   const { notificationCount } = useSelector((state) => state.chat);

//     const handleMobile = () => {
//       dispatch(setIsMobile(true));
//     }
//     const OpenSearchDialog = () => {
//       dispatch(setIsSearch(true));
//     };

//   const openNewGroup = () => {
//     console.log("clicked");
//       dispatch(setIsNewGroup(true));
//   };

//   const openNotification = () => {
//     dispatch(setIsNotification(true));
//     dispatch(resetNotificationCount())
//   }

//     const navigateToGroup = () => navigate("/group")

//     const LogoutHandler = async() => {

//       try {
//         const { data } = await axios.get(`${server}/api/v1/user/logout`, {
//           withCredentials: true,
//         });

//         dispatch(userNotExists());
//         toast.success(data.message);

//       } catch (error) {
//         toast.error(error?.response?.data?.message || "something went wrong!");
//       }

//     }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1 }} height={"4rem"}>
//         <AppBar
//           position="static"
//           sx={{
//             bgcolor: headerBg,
//           }}
//         >
//           <Toolbar>
//             <Typography
//               variant="h6"
//               sx={{ display: { xs: "none", sm: "block" } }}
//             >
//               Chatloop
//             </Typography>
//             <Box
//               sx={{
//                 display: { xs: "block", sm: "none" },
//               }}
//             >
//               <IconButton color="inherit" onClick={handleMobile}>
//                 <MenuIcon />
//               </IconButton>
//             </Box>

//             <Box
//               sx={{
//                 flexGrow: 1,
//               }}
//             />

//             <Box>
//               <IconBtn
//                 title={"Search"}
//                 icon={<SearchIcons />}
//                 onClick={OpenSearchDialog}
//               />
//               <IconBtn
//                 title={"New Group"}
//                 icon={<AddIcon />}
//                 onClick={openNewGroup}
//               />
//               <IconBtn
//                 title={"Manage Group"}
//                 icon={<GroupIcon />}
//                 onClick={navigateToGroup}
//               />

//               <IconBtn
//                 title={"Notifications"}
//                 icon={<NotificationsIcon />}
//                 onClick={openNotification}
//                 value={notificationCount}
//               />
//               <IconBtn
//                 title={"Logout"}
//                 icon={<LogoutIcon />}
//                 onClick={LogoutHandler}
//               />
//             </Box>
//           </Toolbar>
//         </AppBar>
//       </Box>

//       {isSearch && (
//         <Suspense fallback={<Backdrop open />}>
//           <SearchDialog />
//         </Suspense>
//       )}
//       {isNotification && (
//         <Suspense fallback={<Backdrop open />}>
//           <NofificationDialog />
//         </Suspense>
//       )}
//       {isNewGroup && (
//         <Suspense fallback={<Backdrop open />}>
//           <NewGroupDialog />
//         </Suspense>
//       )}
//     </>
//   );
// };

// const IconBtn = ({ title, icon, onClick, value }) => {
//     return (
//       <Tooltip title={title}>
//         <IconButton color="inherit" size="large" onClick={onClick}>
//           {value ? <Badge badgeContent={value} color="error" >{icon}</Badge> : icon}

//         </IconButton>
//       </Tooltip>
//     );
// }

// export default Header;
