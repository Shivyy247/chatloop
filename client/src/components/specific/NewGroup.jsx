import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {

  const groupName = useInputValidation("")

  const [members, setMembers] = useState(sampleUsers)
  const [selectMembers, setSelectMembers] = useState([])


  const addMemberHandler = (id) => {

    setMembers(prev=> prev.map(user=>user._id===id? {...user,isAdded:!user.isAdded} : user))
    setSelectMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id],
    );
  };
  console.log(selectMembers)
  
  const submitHandler = () => { };

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
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
          {members.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addMemberHandler}
              isAdded={selectMembers.includes(i._id)} />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant="contained" color="error" size="large">
            Cancel
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
