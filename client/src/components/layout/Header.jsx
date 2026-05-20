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

import { lazy, Suspense, useEffect, useState } from "react";

import {
  Menu as MenuIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcons,
  Add as AddIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
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

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");

      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");

      setDarkMode(false);
    } else {
      document.body.classList.add("dark");

      localStorage.setItem("theme", "dark");

      setDarkMode(true);
    }
  };

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
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "var(--bg-secondary)",

            borderBottom: "1px solid var(--border-color)",

            color: "var(--text-primary)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "4.5rem !important",

              px: {
                xs: 1,
                sm: 2,
                md: 3,
              },
            }}
          >
            {/* LOGO */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.8}
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
              }}
            >
              <Box
                component="img"
                src="/logof.png"
                alt="Logo"
                sx={{
                  width: 34,
                  height: 34,
                  objectFit: "contain",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  display: { xs: "none", sm: "block" },

                  fontWeight: 700,

                  fontSize: "1.22rem",

                  color: "var(--text-primary)",

                  letterSpacing: "-0.5px",
                }}
              >
                ChatLoop
              </Typography>
            </Stack>

            {/* MOBILE MENU */}

            <Box
              sx={{
                display: { xs: "block", sm: "none" },

                ml: 1,
              }}
            >
              <IconButton
                onClick={handleMobile}
                sx={{
                  color: "var(--text-secondary)",

                  borderRadius: "12px",

                  "&:hover": {
                    backgroundColor: "var(--hover-color)",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* ACTIONS */}

            <Stack direction={"row"} spacing={0.5}>
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
                title={darkMode ? "Light Mode" : "Dark Mode"}
                icon={darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                onClick={toggleTheme}
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
        size="large"
        onClick={onClick}
        sx={{
          color: "var(--text-secondary)",

          borderRadius: "12px",

          width: 42,
          height: 42,

          transition: "0.2s ease",

          "&:hover": {
            backgroundColor: "var(--hover-color)",

            color: "var(--emerald)",
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
