import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";

const Chat = () => {
  const containerRef = useRef(null);

  return (
    <>
      <Stack ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"aqua"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto"
        }}
      ></Stack>
      <form style={{
        height: "10%"
      }} >
        <Stack>
          <IconButton>
            <AttachFileIcon />
            <InputBox/>
          </IconButton>
        </Stack>
      </form>

    </>
  )
};

export default AppLayout(Chat);
