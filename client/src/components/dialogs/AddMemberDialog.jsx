import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "../../constants/hooks/hooks";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId }) => {
  const dispatch = useDispatch();

  const { isAddMember } = useSelector((state) => state.misc);
  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);
  const [addmembers, isLoadingAddMembers] = useAsyncMutation(
    useAddGroupMembersMutation,
  );

  const [selectMembers, setSelectMembers] = useState([]);

  const addMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id],
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    addmembers("Adding Members...", { members: selectMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog
      open={isAddMember}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "25rem",
          borderRadius: "16px",
          bgcolor: "#111b21", // WhatsApp Dark Surface
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundImage: "none",
        },
      }}
    >
      <Stack p={"1.5rem"} spacing={"1.5rem"}>
        <DialogTitle
          sx={{
            textAlign: "center",
            padding: 0,
            fontWeight: 700,
            color: "#e9edef", // Ivory text
            fontSize: "1.3rem",
          }}
        >
          Add Member
        </DialogTitle>

        <Box
          sx={{
            maxHeight: "20rem",
            overflowY: "auto",
            pr: "5px",
            "&::-webkit-scrollbar": { width: "4px" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
            },
          }}
        >
          <Stack spacing={"0.5rem"}>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                height={50}
                sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
              />
            ) : data?.friends?.length > 0 ? (
              data?.friends?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={addMemberHandler}
                  isAdded={selectMembers.includes(i._id)}
                  styling={{
                    bgcolor: "#1f2c33", // Secondary dark tone
                  }}
                />
              ))
            ) : (
              <Typography
                textAlign={"center"}
                sx={{ color: "#8696a0", py: "2rem" }}
              >
                No Friends to Add
              </Typography>
            )}
          </Stack>
        </Box>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
        >
          <Button
            onClick={closeHandler}
            sx={{
              flex: 1,
              borderRadius: "10px",
              color: "#ef4444",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMembers}
            sx={{
              flex: 1.5,
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#00a884", // Emerald Green
              "&:hover": { bgcolor: "#008f6f" },
              "&.Mui-disabled": {
                bgcolor: "rgba(0, 168, 132, 0.3)",
                color: "white",
              },
            }}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
