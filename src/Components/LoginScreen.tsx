import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../AppContextProvider";

const LoginScreen: React.FC = () => {
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home", { replace: true });
  };

  return (
    <Box className="login-screen-box">
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "#1976d2", mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" gutterBottom>
          TV Show Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mt: 1 }}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginScreen;
