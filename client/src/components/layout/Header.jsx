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
  Avatar,
} from "@mui/material";
import { lazy, Suspense, cloneElement } from "react";
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
  setIsProfile,
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
  const { user } = useSelector((state) => state.auth);
  const { notificationCount } = useSelector((state) => state.chat);

  const handleMobile = () => dispatch(setIsMobile(true));
  const OpenSearchDialog = () => dispatch(setIsSearch(true));
  const openNewGroup = () => dispatch(setIsNewGroup(true));
  const openProfile = () => dispatch(setIsProfile(true));

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
      <Box sx={{ flexGrow: 0 }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "#202C33",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            color: "#E9EDEF",
          }}
        >
          <Toolbar
            disableGutters
            sx={{
              minHeight: "64px !important",
              px: 0,
            }}
          >
            {/* Logo */}
            <Stack
              direction="row"
              alignItems="center"
              // spacing={0.1}
              onClick={() => navigate("/")}
              sx={{
                cursor: "pointer",
                ml: 0.5,
              }}
            >
              <Box
                component="img"
                src="/fff.png"
                sx={{
                  width: 34,
                  height: 34,
                  objectFit: "contain",
                }}
              />

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "1.25rem",
                  color: "#E9EDEF",
                  letterSpacing: "0.2px",
                  display: { xs: "none", sm: "block" },
                }}
              >
                ChatLoop
              </Typography>
            </Stack>

            <Box sx={{ flexGrow: 1 }} />

            {/* Right Icons */}
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              sx={{ mr: 1 }}
            >
              <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton color="inherit" onClick={handleMobile}>
                  <MenuIcon sx={{ fontSize: "1.4rem" }} />
                </IconButton>
              </Box>

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

              <Tooltip title="My Profile">
                <IconButton
                  onClick={openProfile}
                  sx={{
                    p: "4px",
                    ml: 0.5,
                  }}
                >
                  <Avatar
                    src={user?.avatar?.url}
                    sx={{
                      width: 32,
                      height: 32,
                      border: "2px solid #00A884",
                    }}
                  />
                </IconButton>
              </Tooltip>

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
        onClick={onClick}
        sx={{
          color: "#AEBAC1",
          padding: "8px",
          transition: "0.2s",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.08)",
            color: "#E9EDEF",
          },
        }}
      >
        {value ? (
          <Badge
            badgeContent={value}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: "#00A884",
                color: "white",
                fontSize: "0.6rem",
                minWidth: "16px",
                height: "16px",
              },
            }}
          >
            {cloneElement(icon, { sx: { fontSize: "1.3rem" } })}
          </Badge>
        ) : (
          cloneElement(icon, { sx: { fontSize: "1.3rem" } })
        )}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
