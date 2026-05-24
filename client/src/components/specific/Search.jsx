import React, { useEffect, useState } from "react";

import { useInputValidation } from "6pp";

import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import UserItem from "../shared/UserItem";

import { useDispatch, useSelector } from "react-redux";

import { setIsSearch } from "../../redux/reducers/misc";

import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";

import { useAsyncMutation } from "../../constants/hooks/hooks";

const Search = () => {
  const { isSearch } = useSelector((state) => state.misc);

  const [searchUser] = useLazySearchUserQuery();

  const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(
    useSendFriendRequestMutation,
  );

  const dispatch = useDispatch();

  const search = useInputValidation("");

  const [users, setUsers] = useState([]);

  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request....", {
      userId: id,
    });
  };

  const searchCloseHandler = () => {
    dispatch(setIsSearch(false));
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data?.users || []);
        })
        .catch(() => {
          setUsers([]);
        });
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

  return (
    <Dialog
      open={isSearch}
      onClose={searchCloseHandler}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "28rem",

          borderRadius: "24px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          boxShadow: "var(--shadow-md)",

          color: "var(--text-primary)",
        },
      }}
    >
      <Stack p={"2rem"} spacing={2}>
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
            Find People
          </DialogTitle>

          <Typography
            textAlign={"center"}
            sx={{
              color: "var(--text-secondary)",
              fontSize: "0.92rem",
            }}
          >
            Search users and send friend requests
          </Typography>
        </Stack>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Search user..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "var(--text-secondary)",
                  }}
                />
              </InputAdornment>
            ),
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

            "& input": {
              color: "var(--text-primary)",
            },

            "& input::placeholder": {
              color: "var(--text-secondary)",
              opacity: 1,
            },
          }}
        />

        <List
          sx={{
            maxHeight: "22rem",

            overflowY: "auto",

            padding: 0,
          }}
        >
          {users.length > 0 ? (
            users.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
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
              No users found
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
