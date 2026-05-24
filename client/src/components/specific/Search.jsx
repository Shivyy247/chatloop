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
          borderRadius: "16px", // Professional look
          bgcolor: "#111b21", // WhatsApp Sidebar Dark
          border: "1px solid rgba(255, 255, 255, 0.1)",
          backgroundImage: "none", // Remove default MUI overlay
        },
      }}
    >
      <Stack p={"1.5rem"} spacing={2}>
        <Stack spacing={0.2}>
          <DialogTitle
            sx={{
              padding: 0,
              textAlign: "center",
              fontWeight: 700,
              fontSize: "1.4rem",
              color: "#e9edef", // Soft Ivory
            }}
          >
            Find People
          </DialogTitle>

          <Typography
            textAlign={"center"}
            sx={{
              color: "#8696a0", // Muted Slate
              fontSize: "0.85rem",
            }}
          >
            Connect with friends on ChatLoop
          </Typography>
        </Stack>

        <TextField
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          placeholder="Search by name..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={{
                    color: "#8696a0",
                    fontSize: "1.2rem",
                  }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              bgcolor: "#202c33", // Input field dark tone
              color: "#e9edef",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.05)",
              },
              "&:hover fieldset": {
                borderColor: "#00a884",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00a884", // Emerald focus
              },
            },
          }}
        />

        <List
          sx={{
            maxHeight: "20rem",
            overflowY: "auto",
            padding: "0.5rem 0",
            // Custom scrollbar for the list
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: "10px",
            },
          }}
        >
          {users.length > 0 ? (
            users.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
                // Custom styling to match dialog theme
                styling={{
                  bgcolor: "#1f2c33",
                  mb: "0.5rem",
                }}
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
              Start typing to find new friends
            </Typography>
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
