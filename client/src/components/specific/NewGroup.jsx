import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import {
  useAvailableFriendsQuery,
  useNewgroupMutation,
} from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../constants/hooks/hooks";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import UserItem from "../shared/UserItem";

const NewGroup = () => {
  const { isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();
  const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewgroupMutation);

  const groupName = useInputValidation("");
  const [selectMembers, setSelectMembers] = useState([]);

  useErrors([{ isError, error }]);

  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id],
    );
  };

  const submitHandler = () => {
    if (!groupName.value.trim()) return toast.error("Group name is required!");
    if (selectMembers.length < 2)
      return toast.error("Please select at least 2 members!");

    newGroup("Creating New Group...", {
      name: groupName.value,
      members: selectMembers,
    });
    closeHandler();
  };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog
      open={isNewGroup}
      onClose={closeHandler}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "28rem",
          borderRadius: "16px",
          bgcolor: "#111b21", // WhatsApp Sidebar Dark
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundImage: "none",
        },
      }}
    >
      <Stack p={"1.5rem"} spacing={2.5}>
        <DialogTitle
          sx={{
            padding: 0,
            textAlign: "center",
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "#e9edef",
          }}
        >
          Create New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          fullWidth
          size="small"
          InputLabelProps={{
            style: { color: "#8696a0" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#202c33",
              color: "#e9edef",
              "& fieldset": { borderColor: "rgba(255,255,255,0.05)" },
              "&:hover fieldset": { borderColor: "#00a884" },
              "&.Mui-focused fieldset": { borderColor: "#00a884" },
            },
          }}
        />

        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: "#8696a0",
              fontSize: "0.85rem",
              mb: "0.5rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Select Members ({selectMembers.length})
          </Typography>

          <Box
            sx={{
              maxHeight: "15rem",
              overflowY: "auto",
              borderRadius: "12px",
              bgcolor: "#111b21",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              p: "0.5rem",
              "&::-webkit-scrollbar": { width: "4px" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "rgba(255,255,255,0.1)",
                borderRadius: "10px",
              },
            }}
          >
            <Stack spacing={0.5}>
              {isLoading ? (
                <Skeleton
                  variant="rounded"
                  height={50}
                  sx={{ bgcolor: "rgba(255,255,255,0.05)" }}
                />
              ) : (
                data?.friends?.map((i) => (
                  <UserItem
                    key={i._id}
                    user={i}
                    handler={selectMemberHandler}
                    isAdded={selectMembers.includes(i._id)}
                    styling={{
                      bgcolor: "#1f2c33",
                    }}
                  />
                ))
              )}
            </Stack>
          </Box>
        </Box>

        <Stack direction={"row"} spacing={2}>
          <Button
            fullWidth
            onClick={closeHandler}
            sx={{
              height: "44px",
              borderRadius: "10px",
              color: "#ef4444", // Red for cancel
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "rgba(239, 68, 68, 0.1)" },
            }}
          >
            Cancel
          </Button>

          <Button
            fullWidth
            variant="contained"
            disabled={isLoadingNewGroup}
            onClick={submitHandler}
            sx={{
              height: "44px",
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: 700,
              bgcolor: "#00a884", // Pure Emerald
              "&:hover": { bgcolor: "#008f6f" },
              "&:disabled": {
                bgcolor: "rgba(0, 168, 132, 0.3)",
                color: "white",
              },
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
