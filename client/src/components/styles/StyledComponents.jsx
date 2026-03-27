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

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  padding: 1rem;
  &:hover {
    background-color: #d3e6e4;
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3rem;
  border-radius: 1.5rem;
  background-color: #3b62bc;

`

export const SearchField = styled("input")`
padding: 1rem 2rem;
width: 20vmax;
border: none;
outline: none;
border-radius: 1.5rem;
background-color: #0b3151;
color: white;
font-size: 1.1rem;
`

export const curveButton = styled("button")`
  border-radius: 1.5rem;
`