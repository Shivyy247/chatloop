import React, { useState } from "react";
import {
  Avatar,
  Stack,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
  Info as InfoIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "../../redux/api/api";
import toast from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [updateProfile] = useUpdateProfileMutation();

  const [name, setName] = useState(user?.name || "");
  const [username, setUsername] = useState(user?.username || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleUpdate = async () => {
    try {
      const res = await updateProfile({
        name,
        bio,
        username,
      }).unwrap();

      dispatch(userExists(res.user));
      toast.success(res.message);
      setEditMode(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <Stack
      spacing={"1.6rem"}
      alignItems={"center"}
      sx={{
        height: "100%",
        p: "1.5rem",
        bgcolor: "#0f141a",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        overflowY: "auto",
      }}
    >
      <Stack spacing={"1rem"} alignItems={"center"} width={"100%"}>
        <Typography
          sx={{
            fontSize: "0.75rem",
            color: "#00c8aa",
            fontWeight: 600,
            letterSpacing: "1px",
          }}
        >
          PROFILE
        </Typography>

        <Avatar
          src={user?.avatar?.url}
          sx={{
            width: 110,
            height: 110,
            border: "2px solid rgba(255,255,255,0.1)",
          }}
        />

        <Box textAlign={"center"}>
          <Typography
            sx={{ color: "#fff", fontWeight: 600, fontSize: "1.2rem" }}
          >
            {user?.name}
          </Typography>
          <Typography sx={{ color: "#8aa1aa", fontSize: "0.9rem" }}>
            @{user?.username}
          </Typography>
        </Box>

        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={() => setEditMode(!editMode)}
          sx={{
            bgcolor: "#00c8aa",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": { bgcolor: "#00b196" },
          }}
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </Button>
      </Stack>

      <Stack spacing={"1rem"} width={"100%"}>
        {editMode ? (
          <>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "#8aa1aa" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: "#8aa1aa" } }}
              sx={{
                input: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <TextField
              label="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              multiline
              rows={3}
              InputLabelProps={{ style: { color: "#8aa1aa" } }}
              sx={{
                textarea: { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                bgcolor: "#00c8aa",
                textTransform: "none",
                "&:hover": { bgcolor: "#00b196" },
              }}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <ProfileCard
              heading="Bio"
              text={user?.bio || "Hey there! I am using ChatLoop."}
              icon={<InfoIcon />}
            />
            <ProfileCard
              heading="Username"
              text={user?.username}
              icon={<UserNameIcon />}
            />
            <ProfileCard heading="Name" text={user?.name} icon={<FaceIcon />} />
            <ProfileCard
              heading="Joined"
              text={moment(user?.createdAt).format("MMMM Do, YYYY")}
              icon={<CalendarIcon />}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};

const ProfileCard = ({ text, icon, heading }) => (
  <Stack
    direction="row"
    spacing={"1rem"}
    alignItems="center"
    sx={{
      p: "0.9rem",
      borderRadius: "12px",
      bgcolor: "#141b22",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: "10px",
        bgcolor: "rgba(0,200,170,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00c8aa",
      }}
    >
      {icon}
    </Box>

    <Stack>
      <Typography
        sx={{
          fontSize: "0.7rem",
          color: "#8aa1aa",
          textTransform: "uppercase",
        }}
      >
        {heading}
      </Typography>

      <Typography sx={{ color: "#fff", fontWeight: 500 }}>{text}</Typography>
    </Stack>
  </Stack>
);

export default Profile;
