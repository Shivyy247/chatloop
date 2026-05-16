import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Skeleton, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/styles/StyledComponents";
import { darkPrimary } from "../../constants/color";
import { LineChart, DoughnutChart } from "../../components/specific/Charts";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data } = await axios.get(`${server}/api/v1/admin/stats`, {
          withCredentials: true,
        });

        setStats(data.stats);

        console.log("RAW DATA:", data);
        console.log("STATS:", data.stats);
      } catch (error) {
        console.log(error);

        toast.error(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong!",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon
          sx={{
            fontSize: "3rem",
          }}
        />

        <SearchField placeholder="Search..." />

        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />

        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>

        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget
        title={"Users"}
        value={stats?.usersCount || 0}
        Icon={<PersonIcon />}
      />

      <Widget
        title={"Chats"}
        value={stats?.totalChatsCount || 0}
        Icon={<GroupIcon />}
      />

      <Widget
        title={"Messages"}
        value={stats?.messagesCount || 0}
        Icon={<MessageIcon />}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton />
      ) : (
        <Container component={"main"}>
          {Appbar}

          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{ gap: "2rem" }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "45rem",
              }}
            >
              <Typography margin={"2rem 0"} variant="h4">
                Last Messages
              </Typography>

              <LineChart value={stats?.messagesChart || []} />
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                width: "100%",
                maxWidth: "25rem",
              }}
            >
              <DoughnutChart
                labels={["Single Chats", "Group Chats"]}
                value={[
                  (stats?.totalChatsCount || 0) - (stats?.groupsCount || 0),
                  stats?.groupsCount || 0,
                ]}
              />

              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon />
                <Typography>VS</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>

          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1.5rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: darkPrimary,
          fontWeight: "bold",
          borderRadius: "50%",
          border: `5px solid ${darkPrimary}`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.2rem",
        }}
      >
        {value}
      </Typography>

      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        {Icon}

        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;

// import React, { useEffect } from 'react'
// import AdminLayout from '../../components/layout/AdminLayout'
// import { Box, Container, Paper, Stack, Typography } from '@mui/material'
// import {
//   AdminPanelSettings as AdminPanelSettingsIcon,
//   Group as GroupIcon,
//   Message as MessageIcon,
//   Notifications as NotificationsIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import moment from 'moment'
// import { CurveButton, SearchField  } from '../../components/styles/StyledComponents';
// import { darkPrimary } from '../../constants/color';
// import { LineChart, DoughnutChart } from "../../components/specific/Charts";
// import { useFetchData } from '6pp';
// import { server } from '../../constants/config';
// import {LayoutLoader} from '../../components/layout/Loaders'
// import { useErrors } from '../../constants/hooks/hooks';

// const Dashboard = () => {

//   const { loading, data, error } = useFetchData(`${server}/api/v1/admin/stats`, "dashboard-stats");

//   const stats = data?.stats;

//   useErrors([{
//     isError: error,
//     error: error,
//   }])

//   useEffect(() => {
//     console.log("RAW DATA:", data);
//     console.log("STATS:", stats);
//   }, [data]);

//   const Appbar = (
//     <Paper
//       elevation={3}
//       sx={{
//         padding: "2rem", margin: "2rem 0", borderRadius: "1rem"
//       }}
//     >
//       <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} >
//         <AdminPanelSettingsIcon sx={{
//           fontSize: '3rem'
//         }} />

//         <SearchField placeholder='Search...' />

//         <CurveButton>Search</CurveButton>
//         <Box flexGrow={1} />

//         <Typography
//           display={{
//             xs: "none",
//             lg: "block"
//           }}
//           color={"rgba(0,0,0,0.7)"}
//           textAlign={"center"}
//         >
//           {moment().format("dddd, D MMMMM YYYY")}
//         </Typography>
//         <NotificationsIcon />
//       </Stack>
//     </Paper>
//   )

//   const Widgets = (
//     <Stack
//       direction={{
//         xs: "column",
//         sm: "row",
//       }}
//       spacing="2rem"
//       justifyContent="space-between"
//       alignItems={"center"}
//       margin={"2rem 0"}
//     >
//       <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon/>} />
//       <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<GroupIcon/>} />
//       <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon/>} />
//     </Stack>
//   );

//   console.log(stats);

//   return loading ? (
//     <LayoutLoader />
//   ) : (
//     <AdminLayout>
//       <Container component={"main"}>
//         {Appbar}

//         <Stack
//           direction={{
//             xs: "column",
//             lg: "row",
//           }}
//           flexWrap={"wrap"}
//           justifyContent={"center"}
//           alignItems={{
//             xs: "center",
//             lg: "stretch",
//           }}
//           sx={{ gap: "2rem" }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               padding: "2rem 3.5rem",
//               borderRadius: "1rem",
//               width: "100%",
//               maxWidth: "45rem",
//             }}
//           >
//             <Typography margin={"2rem 0"} variant="h4">
//               {" "}
//               Last Messages
//             </Typography>

//             <LineChart value={stats?.messagesChart || []} />
//           </Paper>
//           <Paper
//             elevation={3}
//             sx={{
//               padding: "1rem",
//               borderRadius: "1rem",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               position: "relative",
//               width: "100%",
//               maxWidth: "25rem",
//             }}
//           >
//             <DoughnutChart
//               labels={["Single Chats", "Group Chats"]}
//               value={[
//                 (stats?.totalChatsCount || 0) - (stats?.groupsCount || 0),
//                 stats?.groupsCount || 0,
//               ]}
//             />

//             <Stack
//               position={"absolute"}
//               direction={"row"}
//               justifyContent={"center"}
//               alignItems={"center"}
//               spacing={"0.5rem"}
//               width={"100%"}
//               height={"100%"}
//             >
//               <GroupIcon />
//               <Typography>VS</Typography>
//               <PersonIcon />
//             </Stack>
//           </Paper>
//         </Stack>
//         {Widgets}
//       </Container>
//     </AdminLayout>
//   );
// };

// const Widget = ({ title, value, Icon }) => (
//   <Paper
//     elevation={3}
//     sx={{
//       padding: "2rem",
//       margin: "2rem 0",
//       borderRadius: "1.5rem",
//       width: "20rem",
//     }}
//   >
//     <Stack alignItems={"center"} spacing={"1rem"}>
//       <Typography
//         sx={{
//           color: `${darkPrimary}`,
//           fontSize: "Bold",
//           borderRadius: "50%",
//           border: `5px solid ${darkPrimary}`,
//           width: "5rem",
//           height: "5rem",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {value}
//       </Typography>
//       <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
//         {Icon}
//         <Typography>{title}</Typography>
//       </Stack>
//     </Stack>
//   </Paper>
// );

// export default Dashboard
