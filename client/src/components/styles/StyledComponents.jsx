import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";


export const VisuallyHiddenInput = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0 )",
    Height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    width: 1,
});

{/* <VisuallyHiddenInput  /> */ }

export const Link = styled()