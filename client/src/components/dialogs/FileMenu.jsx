import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

import React, { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";

import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";

import toast from "react-hot-toast";

import { useSendAttachmentsMutation } from "../../redux/api/api";

const FileMenu = ({ anchorEl, chatId }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const imageRef = useRef(null);

  const audioRef = useRef(null);

  const videoRef = useRef(null);

  const fileRef = useRef(null);

  const [sendAttachments] = useSendAttachmentsMutation();

  const closeFileMenu = () => dispatch(setIsFileMenu(false));

  const selectImage = () => imageRef.current?.click();

  const selectAudio = () => audioRef.current?.click();

  const selectVideo = () => videoRef.current?.click();

  const selectFile = () => fileRef.current?.click();

  const fileChangeHandler = async (e, key) => {
    const files = Array.from(e.target.files);

    if (files.length <= 0) return;

    if (files.length > 5)
      return toast.error(`You can only send 5 ${key} at a time!`);

    dispatch(setUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);

    closeFileMenu();

    try {
      const myForm = new FormData();

      myForm.append("chatId", chatId);

      files.forEach((file) => myForm.append("files", file));

      const res = await sendAttachments(myForm);

      if (res.data) {
        toast.success(`${key} sent successfully!`, {
          id: toastId,
        });
      } else {
        toast.error(`Failed to send ${key}`, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        id: toastId,
      });
    } finally {
      dispatch(setUploadingLoader(false));
    }
  };

  const menuItems = [
    {
      label: "Images",
      icon: <ImageIcon />,
      action: selectImage,
      ref: imageRef,
      accept: "image/png, image/jpeg, image/gif, image/jpg",
      type: "Images",
    },
    {
      label: "Audio",
      icon: <AudioFileIcon />,
      action: selectAudio,
      ref: audioRef,
      accept: "audio/mpeg, audio/wav",
      type: "Audios",
    },
    {
      label: "Videos",
      icon: <VideoFileIcon />,
      action: selectVideo,
      ref: videoRef,
      accept: "video/mp4, video/webm, video/ogg",
      type: "Videos",
    },
    {
      label: "Files",
      icon: <UploadFileIcon />,
      action: selectFile,
      ref: fileRef,
      accept: "*",
      type: "Files",
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={isFileMenu}
      onClose={closeFileMenu}
      PaperProps={{
        sx: {
          width: "14rem",

          mt: 1,

          borderRadius: "20px",

          background: "var(--bg-secondary)",

          border: "1px solid var(--border-color)",

          boxShadow: "var(--shadow-md)",

          overflow: "hidden",
        },
      }}
    >
      <MenuList
        sx={{
          padding: "0.5rem",
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={item.action}
            sx={{
              borderRadius: "14px",

              padding: "0.8rem 0.9rem",

              marginBottom: "0.25rem",

              transition: "0.2s ease",

              "&:hover": {
                background: "var(--hover-color)",
              },
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,

                borderRadius: "12px",

                background: "rgba(16,185,129,0.12)",

                color: "var(--emerald)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",
              }}
            >
              <Tooltip title={item.label}>{item.icon}</Tooltip>
            </Box>

            <ListItemText
              sx={{
                marginLeft: "0.9rem",
              }}
              primary={
                <Typography
                  sx={{
                    color: "var(--text-primary)",

                    fontWeight: 500,

                    fontSize: "0.95rem",
                  }}
                >
                  {item.label}
                </Typography>
              }
            />

            <input
              type="file"
              multiple
              accept={item.accept}
              style={{
                display: "none",
              }}
              onChange={(e) => fileChangeHandler(e, item.type)}
              ref={item.ref}
            />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FileMenu;
