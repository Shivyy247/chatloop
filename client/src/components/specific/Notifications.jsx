import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import { memo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useAsyncMutation, useErrors } from "../../constants/hooks/hooks";

import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";

import { setIsNotification } from "../../redux/reducers/misc";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const { isLoading, data, error, isError } = useGetNotificationQuery();

  const [loadingId, setLoadingId] = useState(null);

  const [acceptRequest] = useAsyncMutation(useAcceptFriendRequestMutation);

  const friendRequestHandler = async ({ _id, accept }) => {
    setLoadingId(_id);

    await acceptRequest("Processing...", {
      requestId: _id,
      accept,
    });

    setLoadingId(null);
  };

  const closeHandler = () => dispatch(setIsNotification(false));

  useErrors([{ error, isError }]);

  return (
    <Dialog
      open={isNotification}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "30rem",

          borderRadius: "24px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          boxShadow: "var(--shadow-md)",

          color: "var(--text-primary)",
        },
      }}
    >
      <Stack
        p={{
          xs: "1.2rem",
          sm: "1.8rem",
        }}
        spacing={2}
      >
        <Stack spacing={0.5}>
          <DialogTitle
            sx={{
              padding: 0,

              textAlign: "center",

              fontWeight: 700,

              fontSize: "1.5rem",

              color: "var(--text-primary)",
            }}
          >
            Notifications
          </DialogTitle>

          <Typography
            textAlign={"center"}
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
            }}
          >
            Friend requests and updates
          </Typography>
        </Stack>

        {isLoading ? (
          <Skeleton
            variant="rounded"
            height={120}
            sx={{
              borderRadius: "18px",
              bgcolor: "var(--bg-primary)",
            }}
          />
        ) : (
          <Box
            sx={{
              maxHeight: "24rem",

              overflowY: "auto",
            }}
          >
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
              <Typography
                textAlign={"center"}
                sx={{
                  color: "var(--text-secondary)",
                  padding: "2rem 0",
                }}
              >
                No notifications yet
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler, loadingId }) => {
  const { name, avatar } = sender;

  return (
    <ListItem
      sx={{
        padding: 0,
        marginBottom: "0.8rem",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        alignItems={{
          xs: "flex-start",
          sm: "center",
        }}
        spacing={"1rem"}
        width={"100%"}
        sx={{
          padding: "1rem",

          borderRadius: "18px",

          background: "var(--bg-primary)",

          border: "1px solid var(--border-color)",

          transition: "0.25s ease",

          "&:hover": {
            background: "var(--hover-color)",
          },
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            width: 52,
            height: 52,
          }}
        />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,

            color: "var(--text-primary)",

            fontSize: "0.94rem",

            lineHeight: 1.5,

            display: "-webkit-box",

            WebkitLineClamp: 2,

            WebkitBoxOrient: "vertical",

            overflow: "hidden",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack direction={"row"} spacing={1}>
          <Button
            variant="contained"
            disabled={loadingId === _id}
            onClick={() =>
              handler({
                _id,
                accept: true,
              })
            }
            sx={{
              borderRadius: "12px",

              textTransform: "none",

              background: "var(--emerald)",

              fontWeight: 600,

              boxShadow: "none",

              "&:hover": {
                background: "#059669",
                boxShadow: "none",
              },
            }}
          >
            Accept
          </Button>

          <Button
            variant="outlined"
            disabled={loadingId === _id}
            onClick={() =>
              handler({
                _id,
                accept: false,
              })
            }
            sx={{
              borderRadius: "12px",

              textTransform: "none",

              borderColor: "var(--border-color)",

              color: "var(--text-secondary)",

              "&:hover": {
                borderColor: "#ef4444",
                color: "#ef4444",
              },
            }}
          >
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
