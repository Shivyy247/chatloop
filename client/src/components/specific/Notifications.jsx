import React from 'react'
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleNotifications } from '../../constants/sampleData';


const Notifications = () => {

  const friendRequestHandler = ({_id, accept})
  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notiifications</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map(({ sender, _id }) => (
            <NotoficationItem sender={sender} _id={_id} handler={friendRequestHandler} key={_id} />
          ))
        ) : (
          <Typography textAlign={"center"}>0 notifications</Typography>
        )}
      </Stack>
    </Dialog>
  );
}

const NotoficationItem = ({ sender, _id, handler }) => {


  return <></>
}


export default Notifications
