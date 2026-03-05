import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
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
const SearchDialog = lazy(()=> import("../specific/Search"))
const NofificationDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));



const Header = () => {

    const navigate = useNavigate()

    const [isMobile, setIsMobile] = useState(false)
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const handleMobile = () => {
        setIsMobile((prev) => !prev);
    }
    const OpenSearchDialog = () => {
        setIsSearch(prev=>!prev);
    };
    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev);
    };
    const openNotification = () => {
        setIsNotification((prev) => !prev);
    };

    const navigateToGroup = () => navigate("/group")

    const LogoutHandler = () => {
        console.log("Logout")
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
              varient="h6"
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
        <Suspense fallback={<div>Loading...</div>}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<div>Loading...</div>}>
          <NofificationDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<div>Loading...</div>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    );
}

export default Header;
