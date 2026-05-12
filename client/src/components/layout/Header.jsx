import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import  { lazy, Suspense, useState } from "react";
import { headerBg } from "../../constants/color";
import {
  Menu as MenuIcon,
  Group as GroupIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcons,
  Add as AddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
const SearchDialog = lazy(()=> import("../specific/Search"))
const NofificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));
import { setIsNewGroup } from "../../redux/reducers/misc";



const Header = () => {

  const navigate = useNavigate()
  
  const dispatch = useDispatch();

  const { isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc,
  );
  const { notificationCount } = useSelector((state) => state.chat);

    const handleMobile = () => {
      dispatch(setIsMobile(true));
    }
    const OpenSearchDialog = () => {
      dispatch(setIsSearch(true));
    };
  

  const openNewGroup = () => {
    console.log("clicked");
      dispatch(setIsNewGroup(true));
  };
  
  const openNotification = () => {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount())
  }

    const navigateToGroup = () => navigate("/group")

    const LogoutHandler = async() => {

      try {
        const { data } = await axios.get(`${server}/api/v1/user/logout`, {
          withCredentials: true,
        });

        dispatch(userNotExists());
        toast.success(data.message);


      } catch (error) {
        toast.error(error?.response?.data?.message || "something went wrong!");
      }

    }



  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: headerBg,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Chatloop
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcons />}
                onClick={OpenSearchDialog}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
                value={notificationCount}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Box>
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
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? <Badge badgeContent={value} color="error" >{icon}</Badge> : icon}

        </IconButton>
      </Tooltip>
    );
}

export default Header;
