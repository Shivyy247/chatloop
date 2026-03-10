import React, { memo } from 'react'
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleNotifications } from '../../constants/sampleData';


const Notifications = () => {

  const friendRequestHandler = ({_id, accept}) => {}
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

const NotoficationItem = memo(({ sender, _id, handler }) => {

  const { name, Avatar } = sender;

    return (
      <div>
        <ListItem>
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={"1rem"}
            width={"100%"}
          >
            <Avatar />
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {`${name} sent you a friend request. `}
            </Typography>
            <Stack direction={{
              xs: "column",
              sm: "row"
            }} >
              <Button onClick={() => handler({ _id, accept: true })}>
                Accept
              </Button>
              <Button color='error' onClick={() => handler({ _id, accept: false })}>
                Reject
              </Button>
            </Stack>
          </Stack>
        </ListItem>
      </div>
    );
});


export default Notifications
