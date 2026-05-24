import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { LayoutLoader } from "../components/layout/Loaders";
import { Link } from "../components/styles/StyledComponents";
import { useAsyncMutation, useErrors } from "../constants/hooks/hooks";
import {
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(
  () => import("../components/dialogs/ConfirmDeleteDialog"),
);
const AddMemberDialog = lazy(
  () => import("../components/dialogs/AddMemberDialog"),
);

const Group = () => {
  const [searchParams] = useSearchParams();
  const chatId = searchParams.get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const myGroups = useMyGroupsQuery();
  const { isAddMember } = useSelector((state) => state.misc);

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId },
  );

  const [updateGroup, isLoadingGroupName] = useAsyncMutation(
    useRenameGroupMutation,
  );
  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(
    useRemoveGroupMemberMutation,
  );
  const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(
    useDeleteChatMutation,
  );

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [members, setMembers] = useState([]);

  useErrors([
    { isError: myGroups.isError, error: myGroups.error },
    { isError: groupDetails.isError, error: groupDetails.error },
  ]);

  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data]);

  const navigateBack = () => navigate("/");
  const handleMobile = () => setIsMobileMenuOpen((prev) => !prev);
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openConfirmDeleteHandler = () => setConfirmDeleteDialog(true);
  const closeConfirmDeleteHandler = () => setConfirmDeleteDialog(false);
  const openAddMemberHandler = () => dispatch(setIsAddMember(true));

  const deleteHandler = () => {
    deleteGroup("Deleting Group...", { chatId });
    closeConfirmDeleteHandler();
    navigate("/group");
  };

  const removeMemberHandler = (userId) => {
    removeMember("Removing Member...", { chatId, userId });
  };

  const IconBtns = (
    <>
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          position: "fixed",
          right: "1rem",
          top: "1.5rem",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={handleMobile}
          sx={{ color: "#e9edef", bgcolor: "#202c33" }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1.5rem",
            left: "1.5rem",
            bgcolor: "#202c33",
            color: "#e9edef",
            "&:hover": { bgcolor: "#2a3942" },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupNameHeader = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"2rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "#e9edef",
                "& fieldset": { borderColor: "#00a884" },
              },
            }}
          />
          <IconButton
            onClick={updateGroupName}
            disabled={isLoadingGroupName}
            sx={{ color: "#00a884" }}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4" sx={{ color: "#e9edef", fontWeight: 700 }}>
            {groupName}
          </Typography>
          <IconButton
            disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
            sx={{ color: "#8696a0" }}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <Stack
      direction={{ xs: "column-reverse", sm: "row" }}
      spacing={"1rem"}
      p={{ xs: "1rem", sm: "2rem", md: "1rem 4rem" }}
    >
      <Button
        fullWidth
        size="large"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
        sx={{ borderRadius: "10px", textTransform: "none" }}
      >
        Delete Group
      </Button>
      <Button
        fullWidth
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
        sx={{
          bgcolor: "#00a884",
          borderRadius: "10px",
          textTransform: "none",
          "&:hover": { bgcolor: "#008f6f" },
        }}
      >
        Add Member
      </Button>
    </Stack>
  );

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height="100vh" bgcolor="#0b141a">
      {/* LEFT SIDEBAR: Group List */}
      <Grid
        item
        sm={4}
        sx={{
          display: { xs: "none", sm: "block" },
          borderRight: "1px solid #222d34",
        }}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </Grid>

      {/* RIGHT SIDE: Group Details */}
      <Grid
        item
        xs={12}
        sm={8}
        sx={{ position: "relative", overflowY: "auto", overflowX: "hidden" }}
      >
        {IconBtns}
        {groupName ? (
          <Stack alignItems="center" sx={{ py: "2rem" }}>
            {GroupNameHeader}

            <Typography
              margin={"1rem 2rem"}
              alignSelf={"flex-start"}
              variant="body1"
              sx={{
                color: "#8696a0",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.8rem",
                letterSpacing: "1px",
              }}
            >
              Members ({members.length})
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              sx={{
                px: { xs: "1rem", sm: "2rem", md: "4rem" },
                py: "1rem",
                height: "50vh",
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: "4px" },
                "&::-webkit-scrollbar-thumb": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                },
              }}
              spacing={"1rem"}
            >
              {isLoadingRemoveMember ? (
                <CircularProgress sx={{ m: "auto", color: "#00a884" }} />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      bgcolor: "#1f2c33",
                      padding: "0.8rem 1.2rem",
                      borderRadius: "12px",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>

            {ButtonGroup}
          </Stack>
        ) : (
          <Stack height="100%" justifyContent="center" alignItems="center">
            <Typography color="#8696a0">Select a group to manage</Typography>
          </Stack>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}

      {confirmDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}

      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box sx={{ width: "70vw", height: "100%", bgcolor: "#111b21" }}>
          <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
        </Box>
      </Drawer>
    </Grid>
  );
};

const GroupList = ({ myGroups = [], chatId }) => (
  <Stack sx={{ bgcolor: "#111b21", height: "100%", overflowY: "auto" }}>
    <Box p="2rem 1.5rem">
      <Typography variant="h5" color="#e9edef" fontWeight={700}>
        My Groups
      </Typography>
    </Box>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} color="#8696a0" padding={"2rem"}>
        No groups created yet
      </Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  const isActive = chatId === _id;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => chatId === _id && e.preventDefault()}
      style={{ textDecoration: "none" }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        alignItems={"center"}
        sx={{
          p: "1rem 1.5rem",
          bgcolor: isActive ? "#2a3942" : "transparent",
          borderBottom: "1px solid #222d34",
          "&:hover": { bgcolor: isActive ? "#2a3942" : "#202c33" },
          transition: "0.2s",
        }}
      >
        <AvatarCard avatar={avatar} />
        <Typography
          sx={{
            color: isActive ? "#00a884" : "#e9edef",
            fontWeight: isActive ? 600 : 400,
          }}
        >
          {name}
        </Typography>
      </Stack>
    </Link>
  );
});

export default Group;
