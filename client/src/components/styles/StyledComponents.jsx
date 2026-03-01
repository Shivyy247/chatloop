import { Height, styled } from "@mui/icons-material";

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

{/* <VisuallyHiddenInput  /> */}