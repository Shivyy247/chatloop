// import { keyframes, Skeleton, styled } from "@mui/material";
// import { Link as LinkComponent } from "react-router-dom";

// export const VisuallyHiddenInput = styled("input")({
//     border: 0,
//     clip: "rect(0 0 0 0 )",
//     Height: 1,
//     margin: -1,
//     overflow: "hidden",
//     padding: 0,
//     position: "absolute",
//     whiteSpace: "nowrap",
//     width: 1,
// });

// {/* <VisuallyHiddenInput  /> */ }

// export const Link = styled(LinkComponent)`
//   text-decoration: none;
//   color: black;
//   padding: 1rem;
//   &:hover {
//     background-color: #d3e6e4;
//   }
// `;

// export const InputBox = styled("input")`
//   width: 100%;
//   height: 100%;
//   border: none;
//   outline: none;
//   padding: 0 3rem;
//   border-radius: 1.5rem;
//   background-color: #3b62bc;

// `

// export const SearchField = styled("input")`
// padding: 1rem 2rem;
// width: 20vmax;
// border: none;
// outline: none;
// border-radius: 1.5rem;
// background-color: #242854;
// color: white;
// font-size: 1.1rem;
// `

// export const CurveButton = styled("button")`
//   border-radius: 1.5rem;
//   padding: 1rem 2rem;
//   border: none;
//   outline: none;
//   cursor: pointer;
//   background-color: black;
//   color: white;
//   font-size: 1.1rem;
//   &:hover{
//     background-color: rgba(0,0,0,0.8);
//   }
// `

// const bounceAnimation = keyframes`
//   0% {transform: scale(1);}
//   50%{transform: scale(1.5);}
//   100%{transform: scale(1);}
// `

// export const BouncingSkeleton = styled(Skeleton)(() => ({
//   animation: `${bounceAnimation} is infinite`,
// }));

/* import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: var(--text-primary);
  padding: 0.9rem 1.2rem;
  border-radius: var(--radius-md);

  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(12px);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 3.5rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #94a3b8;
  }
`;

export const SearchField = styled("input")`
  padding: 1rem 1.4rem;

  width: 20vmax;

  border: 1px solid rgba(255, 255, 255, 0.06);

  outline: none;

  border-radius: 1.2rem;

  background: rgba(255, 255, 255, 0.04);

  color: var(--text-primary);

  backdrop-filter: blur(14px);

  font-size: 0.95rem;

  transition: var(--transition);

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: rgba(91, 108, 255, 0.35);

    box-shadow: 0 0 0 4px rgba(91, 108, 255, 0.08);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CurveButton = styled("button")`
  border-radius: 1.2rem;

  padding: 0.95rem 1.8rem;

  border: none;

  outline: none;

  cursor: pointer;

  background: linear-gradient(135deg, var(--primary), var(--primary-hover));

  color: white;

  font-size: 1rem;

  font-weight: 500;

  transition: var(--transition);

  box-shadow: 0 10px 24px rgba(91, 108, 255, 0.25);

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 14px 30px rgba(91, 108, 255, 0.32);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const bounceAnimation = keyframes`
  0%{
    transform: scale(1);
    opacity: 0.7;
  }

  50%{
    transform: scale(1.08);
    opacity: 1;
  }

  100%{
    transform: scale(1);
    opacity: 0.7;
  }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1.5s infinite ease`,
  transformOrigin: "center",
})); */

import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

export const VisuallyHiddenInput = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const Link = styled(LinkComponent)`
  text-decoration: none;
  color: var(--text-primary);

  transition: 0.2s ease;

  &:hover {
    background-color: var(--hover-color);
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;

  border: 1px solid var(--border-color);
  outline: none;

  padding: 0 3.5rem;

  border-radius: 16px;

  background-color: #ffffff;

  color: var(--text-primary);

  font-size: 0.95rem;

  box-shadow: var(--shadow-sm);

  transition: 0.2s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    border-color: var(--emerald);

    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.12);
  }
`;

export const SearchField = styled("input")`
  padding: 0.95rem 1.2rem;

  width: 20vmax;

  border: 1px solid var(--border-color);

  outline: none;

  border-radius: 14px;

  background: #ffffff;

  color: var(--text-primary);

  font-size: 0.95rem;

  box-shadow: var(--shadow-sm);

  transition: 0.2s ease;

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    border-color: var(--emerald);

    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CurveButton = styled("button")`
  border-radius: 14px;

  padding: 0.95rem 1.6rem;

  border: none;

  outline: none;

  cursor: pointer;

  background-color: var(--emerald);

  color: white;

  font-size: 0.95rem;

  font-weight: 600;

  transition: 0.2s ease;

  box-shadow: var(--shadow-sm);

  &:hover {
    background-color: #059669;

    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const bounceAnimation = keyframes`
  0%{
    transform: scale(1);
    opacity: 0.7;
  }

  50%{
    transform: scale(1.04);
    opacity: 1;
  }

  100%{
    transform: scale(1);
    opacity: 0.7;
  }
`;

export const BouncingSkeleton = styled(Skeleton)(() => ({
  animation: `${bounceAnimation} 1.5s infinite ease`,
  transformOrigin: "center",
}));