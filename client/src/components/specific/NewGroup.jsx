import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewgroupMutation } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../constants/hooks/hooks";
import { setIsNewGroup } from "../../redux/reducers/misc";
import toast from "react-hot-toast";

const NewGroup = () => {

  const {isNewGroup } = useSelector((state) => state.misc);
  const dispatch = useDispatch();

  const { isError, isLoading, error, data } = useAvailableFriendsQuery();

  const [newGroup, isLoaingNewgroup] = useAsyncMutation(useNewgroupMutation);

  const groupName = useInputValidation("")

  const [selectMembers, setSelectMembers] = useState([])

  const errors = [
    {
      isError,
      error,
    },
  ];

  useErrors(errors);


  const selectMemberHandler = (id) => {
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id],
    );
  };
  
  const submitHandler = () => {

    if (!groupName.value) return toast.error("Group name is required!");

    if (selectMembers.length < 2)
      return toast.error("please select atleast three members!!");

    newGroup("Creating New Group...",{ name: groupName.value, members: selectMembers });

    closeHandler();


   };

  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.friends?.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={selectMemberHandler}
                isAdded={selectMembers.includes(i._id)}
              />
            ))
          )}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button
            variant="contained"
            color="error"
            size="large"
            onClick={closeHandler}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={submitHandler}
            disabled={isLoaingNewgroup}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
