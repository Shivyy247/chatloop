import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadindMember, chatId }) => {

    const [members, setMembers] = useState(sampleUsers)
    const [selectMembers, setSelectMembers] = useState([])
    
    
      const addMemberHandler = (id) => {
        setSelectMembers((prev) =>
          prev.includes(id)
            ? prev.filter((currElement) => currElement !== id)
            : [...prev, id],
        );
      };



  const closeHandler = () => {
    setSelectMembers([]);
    setMembers([]);
    }
  const addMemberSubmitHandler = () => {
      closeHandler()
    }
    

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={addMemberHandler}
                isAdded={selectMembers.includes(i._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Button color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadindMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
