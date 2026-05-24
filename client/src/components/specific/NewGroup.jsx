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

  useErrors([
    {
      isError,
      error,
    },
  ]);

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
          width: "28rem",
          maxWidth: "95vw",

          borderRadius: "24px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          color: "var(--text-primary)",

          boxShadow: "var(--shadow-md)",
        },
      }}
    >
      <Stack
        spacing={2.2}
        sx={{
          padding: {
            xs: "1.3rem",
            sm: "2rem",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",

            fontWeight: 700,

            fontSize: "1.5rem",

            color: "var(--text-primary)",

            padding: 0,
          }}
        >
          Create New Group
        </DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
          fullWidth
          InputLabelProps={{
            style: {
              color: "var(--text-secondary)",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "14px",

              background: "var(--bg-primary)",

              color: "var(--text-primary)",

              "& fieldset": {
                borderColor: "var(--border-color)",
              },

              "&:hover fieldset": {
                borderColor: "var(--emerald)",
              },

              "&.Mui-focused fieldset": {
                borderColor: "var(--emerald)",
              },
            },
          }}
        />

        <Typography
          sx={{
            fontWeight: 600,

            color: "var(--text-primary)",
          }}
        >
          Select Members
        </Typography>

        <Box
          sx={{
            maxHeight: "300px",

            overflowY: "auto",

            borderRadius: "16px",

            background: "var(--bg-primary)",

            border: "1px solid var(--border-color)",

            padding: "0.5rem",

            "&::-webkit-scrollbar": {
              width: "5px",
            },

            "&::-webkit-scrollbar-thumb": {
              background: "var(--border-color)",
              borderRadius: "20px",
            },
          }}
        >
          <Stack spacing={0.5}>
            {isLoading ? (
              <Skeleton
                variant="rounded"
                height={80}
                sx={{
                  background: "var(--bg-chat)",
                }}
              />
            ) : (
              data?.friends?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectMembers.includes(i._id)}
                />
              ))
            )}
          </Stack>
        </Box>

        <Stack direction={"row"} spacing={1.5} justifyContent={"space-between"}>
          <Button
            fullWidth
            variant="outlined"
            onClick={closeHandler}
            sx={{
              height: 48,

              borderRadius: "14px",

              borderColor: "var(--border-color)",

              color: "var(--text-primary)",

              textTransform: "none",

              fontWeight: 600,

              "&:hover": {
                borderColor: "var(--emerald)",

                background: "var(--hover-color)",
              },
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
              height: 48,

              borderRadius: "14px",

              textTransform: "none",

              fontWeight: 700,

              background: "linear-gradient(135deg,#10B981,#059669)",

              boxShadow: "none",

              "&:hover": {
                opacity: 0.95,

                boxShadow: "none",
              },
            }}
          >
            Create Group
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
