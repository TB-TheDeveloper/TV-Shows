import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const MenuBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My TV Shows
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Genre</Button>
        <Button color="inherit">Favorites</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
