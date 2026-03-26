import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  Groups as GroupsIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { accent } from "../../constants/color";

const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover{
  color: rgba(0,0,0,0.54);
}
`


const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    path: "/admin/users-management",
    icon: <ManageAccountsIcon />,
  },
  {
    name: "Chats",
    path: "/admin/chats-management",
    icon: <GroupsIcon />,
  },
  {
    name: "Messages",
    path: "/admin/message",
    icon: <MessageIcon />,
  },
];

const Sidebar = ({ w = "100%" }) => {

  const location = useLocation();
  
  const logoutHandler = () => {
    console.log("logout!")
  }

    return (
      <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
        <Typography variant="h5" textTransform={"uppercase"}>
          CHATLOOP
        </Typography>
        <Stack spacing={"1rem"}>
          {adminTabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              sx={{
                ...(location.pathname === tab.path && {
                  bgcolor: accent,
                  color: "white",
                  "&:hover": { color: "black" },
                }),
              }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                {tab.icon}
                <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
              </Stack>
            </Link>
          ))}

          <Link
            onClick={logoutHandler}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              <ExitToAppIcon/>
              <Typography>LogOut</Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>
    );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);

  if(!isAdmin) return <Navigate to="/admin" />

  return (
    <Box>
      <Grid container sx={{ minHeight: "100vh" }}>
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "fixed",
            right: 16,
            top: 16,
            zIndex: 1300,
          }}
        >
          <IconButton onClick={handleMobile}>
            {isMobile ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        <Grid md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Grid>

        <Grid
          xs={12}
          md={8}
          lg={9}
          sx={{
            bgcolor: "#140C30",
          }}
        >
          {children}
        </Grid>

        <Drawer open={isMobile} onClose={handleClose}>
          <Sidebar w="50vw" />
        </Drawer>
      </Grid>
    </Box>
  );
};

export default AdminLayout;
