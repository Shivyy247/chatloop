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
  color: inherit;

  transition: var(--transition);

  &:hover {
    background-color: transparent;
  }
`;

export const InputBox = styled("input")`
  width: 100%;
  height: 100%;

  border: 1px solid transparent;
  outline: none;

  padding: 0 1.2rem;

  border-radius: 16px;

  background-color: var(--bg-card);

  color: var(--text-primary);

  font-size: 0.95rem;

  transition: var(--transition);

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    border-color: rgba(0, 168, 132, 0.22);

    background-color: #24343d;
  }
`;

export const SearchField = styled("input")`
  padding: 0.95rem 1.2rem;

  width: 20vmax;

  border: 1px solid transparent;

  outline: none;

  border-radius: 16px;

  background: var(--bg-card);

  color: var(--text-primary);

  font-size: 0.95rem;

  transition: var(--transition);

  &::placeholder {
    color: var(--text-secondary);
  }

  &:focus {
    border-color: rgba(0, 168, 132, 0.22);

    background-color: #24343d;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CurveButton = styled("button")`
  border-radius: 16px;

  padding: 0.95rem 1.6rem;

  border: none;

  outline: none;

  cursor: pointer;

  background-color: var(--primary);

  color: white;

  font-size: 0.95rem;

  font-weight: 600;

  transition: var(--transition);

  &:hover {
    background-color: var(--primary-dark);

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
