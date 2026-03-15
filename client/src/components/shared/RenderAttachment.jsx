import React from 'react'
import { transfromImage } from '../../lib/features';
import { FileOpen as FileOpenIcon } from "@mui/icons-material";

const RenderAttachment = () => {

    switch (file) {
      case "video":
        <video src={url} preload="none" width={"200px"} controls />;
        break;

      case "image":
        <img
          src={transfromImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{
            objectFit: "contain",
          }}
        />;
        break;

      case "audio":
        <audio src={url} preload="none" controls />;
        break;

      default:
        <FileOpenIcon/>;
    }
}

export default RenderAttachment
