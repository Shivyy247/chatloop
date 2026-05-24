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
          maxWidth: "28rem",
          borderRadius: "16px",
          bgcolor: "#111b21", // WhatsApp Dark sidebar color
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundImage: "none",
        },
      }}
    >
      <Stack p={{ xs: "1rem", sm: "1.5rem" }} spacing={2.5}>
        <Stack spacing={0.2}>
          <DialogTitle
            sx={{
              padding: 0,
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1.4rem",
              color: "#e9edef", // Ivory text
            }}
          >
            Notifications
          </DialogTitle>
          <Typography
            textAlign={"center"}
            sx={{
              color: "#8696a0",
              fontSize: "0.85rem",
            }}
          >
            Stay updated with your requests
          </Typography>
        </Stack>

        {isLoading ? (
          <Skeleton
            variant="rounded"
            height={100}
            sx={{ bgcolor: "rgba(255, 255, 255, 0.05)", borderRadius: "12px" }}
          />
        ) : (
          <Box
            sx={{
              maxHeight: "22rem",
              overflowY: "auto",
              pr: "5px",
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "10px",
              },
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
                  color: "#8696a0",
                  padding: "3rem 0",
                  fontSize: "0.9rem",
                }}
              >
                No pending requests at the moment
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
        marginBottom: "1rem",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={"1rem"}
        width={"100%"}
        sx={{
          padding: "0.8rem",
          borderRadius: "12px",
          bgcolor: "#1f2c33", // Slightly lighter dark tone
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            width: 48,
            height: 48,
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        />

        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            color: "#e9edef",
            fontSize: "0.92rem",
            lineHeight: 1.3,
            fontWeight: 500,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: "#00a884" }}>
            {name}
          </Box>{" "}
          wants to be your friend.
        </Typography>

        <Stack direction={"row"} spacing={1}>
          <Button
            size="small"
            disabled={loadingId === _id}
            onClick={() => handler({ _id, accept: true })}
            sx={{
              minWidth: "60px",
              borderRadius: "8px",
              textTransform: "none",
              bgcolor: "#00a884",
              color: "#111b21",
              fontWeight: 700,
              fontSize: "0.75rem",
              "&:hover": { bgcolor: "#008f6f" },
            }}
          >
            Accept
          </Button>

          <Button
            size="small"
            variant="outlined"
            disabled={loadingId === _id}
            onClick={() => handler({ _id, accept: false })}
            sx={{
              minWidth: "60px",
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "rgba(255, 255, 255, 0.1)",
              color: "#ef4444",
              fontSize: "0.75rem",
              "&:hover": {
                borderColor: "#ef4444",
                bgcolor: "rgba(239, 68, 68, 0.05)",
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
