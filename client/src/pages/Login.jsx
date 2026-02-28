import React, { useState } from "react";
import { Container, Padding } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    
    const toggleLogin = () => setIsLogin(false)

  return (
    <Container component={"main"} maxWidth="sx">
      <Paper
        elevation={3}
        sx={{
          Padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h5">Login</Typography>
            <form>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                varient="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                varient="outlined"
              />
              <Button
                varient="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Login
              </Button>
              <Typography>Or</Typography>
              <Button
                sx={{
                  marginTop: "1rem",
                }}
                varient="text"
                onClick={toggleLogin}
              >
                Sign
              </Button>
            </form>
          </>
        ) : (
          <span>register</span>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
