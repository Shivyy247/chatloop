import React from "react";
import Title from "../shared/Title";
import Header from "./Header";
import { Grid } from "@mui/material";
import Chatlist from "../specific/Chatlist";
import { sampleChats } from "../../constants/sampleData";
import { useParams } from "react-router-dom";
import Profile from "../specific/Profile";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    
    const params = useParams();
    const chatId = params.chatId;

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault()
      console.log("Delete Chat", _id, groupChat)
    }

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
            <Chatlist
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
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
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
