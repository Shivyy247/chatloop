import { AppBar, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { headerBg } from "../../constants/color";
import {Menu as MenuIcon, Group as GroupIcon} from "@mui/icons-material"
import { Search as SearchIcons, Add as AddIcon, Logout as LogoutIcon } from "@mui/icons-material";
import {useNavigate} from "react-router-dom"



const Header = () => {

    const navigate = useNavigate()

    const handleMobile = () => {
        console.log("Mobile");
    }
    const OpenSearchDialog = () => {
      console.log("Search");
    };
    const openNewGroup = () => {
      console.log("open new group");
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
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={LogoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
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
