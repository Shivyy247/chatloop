import React from "react";
import Title from "../shared/Title";
import Header from "./Header";
import { Grid } from "@mui/material";
import Chatlist from "../specific/Chatlist";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            size={{ sm: 4, md: 3 }}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height="100%"
          >
            <Chatlist chats={[1,2,3,4,5]} />
          </Grid>

          <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} height="100%">
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            size={{ md: 4, lg: 3 }}
            height="100%"
            sx={{
              display: { xs: "none", sm: "block" },
              padding: "2rem",
              bgcolor: "#153D4C",
            }}
          >
            Third
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
