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
          padding: {
            xs: "0.7rem",
            sm: "0.9rem",
          },

          paddingBottom: 0,

          background: "transparent",
        }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: "rgba(17, 24, 39, 0.78)",

            border: "1px solid var(--border-color)",

            backdropFilter: "blur(18px)",

            borderRadius: "24px",

            boxShadow: "var(--shadow-sm)",

            color: "var(--text-primary)",
          }}
        >
          <Toolbar
            sx={{
              minHeight: "4.5rem !important",

              px: {
                xs: 1.2,
                sm: 2,
                md: 2.5,
              },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1.1}
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
                  width: 40,
                  height: 40,
                  objectFit: "contain",

                  filter: "drop-shadow(0 0 12px rgba(94,234,212,0.35))",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  display: {
                    xs: "none",
                    sm: "block",
                  },

                  fontWeight: 700,

                  fontSize: "1.15rem",

                  letterSpacing: "-0.4px",

                  color: "var(--text-primary)",
                }}
              >
                ChatLoop
              </Typography>
            </Stack>

            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "none",
                },

                ml: 1,
              }}
            >
              <IconBtn
                title="Menu"
                icon={<MenuIcon />}
                onClick={handleMobile}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Stack
              direction={"row"}
              spacing={{
                xs: 0.5,
                sm: 0.7,
              }}
              alignItems={"center"}
            >
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
                title="Groups"
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
        size="large"
        onClick={onClick}
        sx={{
          color: "var(--text-secondary)",

          width: 42,
          height: 42,

          borderRadius: "14px",

          background: "rgba(255,255,255,0.03)",

          border: "1px solid rgba(255,255,255,0.04)",

          transition: "var(--transition)",

          "&:hover": {
            backgroundColor: "var(--primary-hover)",

            color: "var(--primary)",

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
