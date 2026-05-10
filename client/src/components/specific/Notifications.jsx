import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useErrors } from "../../constants/hooks/hooks";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationQuery();
  const [acceptRequest] = useAcceptFriendRequestMutation();

  const [loadingId, setLoadingId] = useState(null);

  const closeHandler = () => dispatch(setIsNotification(false));

  const friendRequestHandler = async ({ _id, accept }) => {
    if (loadingId) return;

    setLoadingId(_id);

    try {
      const data = await acceptRequest({
        requestId: _id,
        accept,
      }).unwrap();

      toast.success(data.message);
      dispatch(setIsNotification(false));
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "something went wrong!");
    } finally {
      setLoadingId(null);
    }

    
  };

  useErrors([{ error, isError }]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data?.allRequests?.length > 0 ? (
              data.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  key={_id}
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  loadingId={loadingId}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler, loadingId }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avatar} />

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
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            disabled={loadingId === _id}
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>

          <Button
            color="error"
            disabled={loadingId === _id}
            onClick={() => handler({ _id, accept: false })}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
