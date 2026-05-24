import {
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";
import React, { cloneElement, useRef } from "react";
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
        toast.success(`${key} sent successfully!`, { id: toastId });
      } else {
        toast.error(`Failed to send ${key}`, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
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
      bgColor: "#7f66ff", // WhatsApp Gallery Purple
    },
    {
      label: "Audio",
      icon: <AudioFileIcon />,
      action: selectAudio,
      ref: audioRef,
      accept: "audio/mpeg, audio/wav",
      type: "Audios",
      bgColor: "#ff7b6b", // Orange/Red for Audio
    },
    {
      label: "Videos",
      icon: <VideoFileIcon />,
      action: selectVideo,
      ref: videoRef,
      accept: "video/mp4, video/webm, video/ogg",
      type: "Videos",
      bgColor: "#00a884", // Emerald for Video
    },
    {
      label: "Files",
      icon: <UploadFileIcon />,
      action: selectFile,
      ref: fileRef,
      accept: "*",
      type: "Files",
      bgColor: "#5157e0", // Blue for Docs
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      open={isFileMenu}
      onClose={closeFileMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      PaperProps={{
        sx: {
          width: "12rem",
          borderRadius: "12px",
          bgcolor: "#233138", // WhatsApp Dark Menu Background
          border: "1px solid rgba(255,255,255,0.05)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          mb: 2, // Gap from the paperclip icon
        },
      }}
    >
      <MenuList sx={{ py: 1, px: 0.5 }}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={item.action}
            sx={{
              borderRadius: "8px",
              py: 1,
              "&:hover": {
                bgcolor: "#182229",
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%", // Circular icons like WhatsApp
                bgcolor: item.bgColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              {cloneElement(item.icon, { sx: { fontSize: "1.2rem" } })}
            </Box>

            <ListItemText
              primary={
                <Typography
                  sx={{ color: "#e9edef", fontSize: "0.9rem", fontWeight: 500 }}
                >
                  {item.label}
                </Typography>
              }
            />

            <input
              type="file"
              multiple
              accept={item.accept}
              style={{ display: "none" }}
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
