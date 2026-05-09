import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../shared/UserItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {useLazySearchUserQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import toast from "react-hot-toast";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest] = useSendFriendRequestMutation();

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  let isLoadingSendFriendRequest = false;

  const addFriendHandler = async (id) => {
    console.log(id);
    try {
      const res = sendFriendRequest({ userId: id });
      if (res.data) {
        toast.success("friend request sent!");
        console.log(res.data);
      } else {
        toast.error(res?.error?.data?.message || "something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (!search.value.trim()) {
        setUsers([]);
        return;
      }

      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data?.users || []);
        })
        .catch((e) => {
          console.log(e);
          setUsers([]);
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Search user..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              key={i._id}
              user={i}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
