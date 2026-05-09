import React, { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar, IconButton, Stack } from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
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

  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useStrongPassword();

  const avatar = useFileHandler("single");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {

    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config,
      );
      dispatch(userExists(data.user));
      toast.success(data.message);
      
    } catch (error) {

      toast.error(error?.response?.data?.message || "something went wrong!");
      
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      // headers: {
      //   "Content-Type": "multipart/form-data"
      // },
    }      

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config,
      );

      dispatch(userExists(data.user));
      toast.success(data.message);

    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong!");
    }

  };

  return (
    <div
      style={{
        background:
          "radial-gradient(circle at center, #1a1a2e 0%, #0f0f1b 100%)",
        minHeight: "100vh",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.8)",
          }}
        >
          {isLogin ? (
            <>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, letterSpacing: "1px", mb: 1 }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.6)", mb: 2 }}
              >
                Please enter your details to sign in
              </Typography>

              <form
                style={{
                  width: "100%",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="filled"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="filled"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "2rem",
                    padding: "0.8rem",
                    borderRadius: "0.5rem",
                    bgcolor: "#4e54c8",
                    fontWeight: "bold",
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#3f449b" },
                  }}
                >
                  Login
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1.5rem"}
                  color="rgba(255,255,255,0.4)"
                >
                  OR
                </Typography>

                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  Don't have an account? Sign up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, letterSpacing: "1px", mb: 3 }}
              >
                Sign Up
              </Typography>
              <form
                style={{
                  width: "100%",
                }}
                onSubmit={handleSignUp}
              >
                <Stack
                  position={"relative"}
                  width={"8rem"}
                  margin={"auto"}
                  mb={2}
                >
                  <Avatar
                    sx={{
                      width: "8rem",
                      height: "8rem",
                      objectFit: "contain",
                      border: "2px solid #4e54c8",
                      bgcolor: "rgba(255,255,255,0.1)",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "#4e54c8",
                      ":hover": {
                        bgcolor: "#3f449b",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        type={"file"}
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m={"0.5rem auto"}
                    width={"fit-content"}
                    display={"block"}
                    color="error"
                    variant="caption"
                  >
                    {avatar.error?.message}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="dense"
                  variant="filled"
                  value={name.value}
                  onChange={name.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="dense"
                  variant="filled"
                  value={bio.value}
                  onChange={bio.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="dense"
                  variant="filled"
                  value={username.value}
                  onChange={username.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error?.message}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="dense"
                  variant="filled"
                  value={password.value}
                  onChange={password.changeHandler}
                  sx={{
                    input: { color: "white" },
                    label: { color: "rgba(255,255,255,0.7)" },
                    bgcolor: "rgba(255,255,255,0.08)",
                    borderRadius: "0.5rem",
                  }}
                />

                {password.error && (
                  <Typography color="error" variant="caption">
                    {password.error?.message}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{
                    marginTop: "1.5rem",
                    padding: "0.8rem",
                    borderRadius: "0.5rem",
                    bgcolor: "#4e54c8",
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": { bgcolor: "#3f449b" },
                  }}
                >
                  Sign Up
                </Button>

                <Typography
                  textAlign={"center"}
                  m={"1rem"}
                  color="rgba(255,255,255,0.4)"
                >
                  OR
                </Typography>
                <Button
                  fullWidth
                  variant="text"
                  onClick={toggleLogin}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  Back to Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;



