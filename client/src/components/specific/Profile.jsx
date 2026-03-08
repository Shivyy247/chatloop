import { Avatar, Stack } from '@mui/material';
import React from 'react'

const Profile = () => {
  return (
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
          <Avatar
              sx={{
                  width: 200,
                  height: 200,
                  objectFit: "contain",
                  marginBottom: "1rem",
                  border: "5px solid white"
              }}
          />
      <ProfileCard heading={"Bio"} text={"kab banega bhai tuu jaldi banega"} />
    </Stack>
  )
}

const ProfileCard = ({text, icon, heading}) => <div>ProfileCard</div>;

export default Profile
