import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Avatar, Box, IconButton, InputAdornment, Stack } from "@mui/material";

import {
  CameraAlt as CameraAltIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { VisuallyHiddenInput } from "../components/styles/StyledComponents";

import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";

import { usernameValidator } from "../utils/validators";

import axios from "axios";

import { server } from "../constants/config";

import { useDispatch } from "react-redux";

import { userExists } from "../redux/reducers/auth";

import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");

      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      document.body.classList.remove("dark");

      localStorage.setItem("theme", "light");

      setDarkMode(false);
    } else {
      document.body.classList.add("dark");

      localStorage.setItem("theme", "dark");

      setDarkMode(true);
    }
  };

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");

  const bio = useInputValidation("");

  const username = useInputValidation("", usernameValidator);

  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging in...");

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      dispatch(userExists(data.user));

      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Creating account...");

    setIsLoading(true);

    const formData = new FormData();

    formData.append("avatar", avatar.file);

    formData.append("name", name.value);

    formData.append("bio", bio.value);

    formData.append("username", username.value);

    formData.append("password", password.value);

    try {
      const { data } = await axios.post(`${server}/api/v1/user/new`, formData, {
        withCredentials: true,
      });

      dispatch(userExists(data.user));

      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background: "linear-gradient(135deg,var(--bg-primary),var(--bg-chat))",

        position: "relative",

        overflow: "hidden",
      }}
    >
      {/* TOP BAR */}

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          padding: "1.2rem 1.5rem",

          zIndex: 10,
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Box
            component={"img"}
            src="/logof.png"
            alt="logo"
            sx={{
              width: 42,
              height: 42,
              objectFit: "contain",
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,

              fontSize: "1.2rem",

              color: "var(--text-primary)",
            }}
          >
            ChatLoop
          </Typography>
        </Stack>

        <IconButton
          onClick={toggleTheme}
          sx={{
            width: 46,
            height: 46,

            borderRadius: "14px",

            background: "var(--bg-secondary)",

            border: "1px solid var(--border-color)",

            color: "var(--text-primary)",

            "&:hover": {
              background: "var(--hover-color)",
            },
          }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Stack>

      <Container
        component={"main"}
        maxWidth="sm"
        sx={{
          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",

            maxWidth: 560,

            padding: {
              xs: "2rem",
              sm: "2.5rem",
            },

            borderRadius: "32px",

            background: "var(--bg-secondary)",

            border: "1px solid var(--border-color)",

            boxShadow: "var(--shadow-md)",
          }}
        >
          <Stack spacing={3}>
            <Stack spacing={1} alignItems={"center"}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,

                  color: "var(--text-primary)",

                  fontSize: {
                    xs: "2rem",
                    sm: "2.6rem",
                  },
                }}
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </Typography>

              <Typography
                sx={{
                  color: "var(--text-secondary)",
                }}
              >
                {isLogin ? "Login to continue chatting" : "Join ChatLoop today"}
              </Typography>
            </Stack>

            {!isLogin && (
              <Stack
                position={"relative"}
                width={"fit-content"}
                margin={"auto"}
              >
                <Avatar
                  src={avatar.preview}
                  sx={{
                    width: 120,
                    height: 120,

                    border: "3px solid var(--border-color)",
                  }}
                />

                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",

                    bottom: 0,

                    right: 0,

                    width: 38,
                    height: 38,

                    background: "linear-gradient(135deg,#5B6CFF,#7BE7D7)",

                    color: "white",

                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  <CameraAltIcon />

                  <VisuallyHiddenInput
                    type="file"
                    onChange={avatar.changeHandler}
                  />
                </IconButton>
              </Stack>
            )}

            <form onSubmit={isLogin ? handleLogin : handleSignUp}>
              <Stack spacing={2}>
                {!isLogin && (
                  <>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      value={name.value}
                      onChange={name.changeHandler}
                    />

                    <TextField
                      required
                      fullWidth
                      label="Bio"
                      value={bio.value}
                      onChange={bio.changeHandler}
                    />
                  </>
                )}

                <TextField
                  required
                  fullWidth
                  label="Username"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    height: 54,

                    borderRadius: "16px",

                    marginTop: "0.5rem",

                    background: "linear-gradient(135deg,#5B6CFF,#7BE7D7)",

                    fontSize: "1rem",

                    fontWeight: 700,

                    textTransform: "none",

                    boxShadow: "0 10px 30px rgba(91,108,255,0.25)",
                  }}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>

                <Typography
                  textAlign={"center"}
                  sx={{
                    color: "var(--text-secondary)",
                  }}
                >
                  OR
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{
                    color: "var(--text-primary)",

                    textTransform: "none",

                    fontWeight: 600,
                  }}
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Back to Login"}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
