import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

const MenuBar: React.FC = () => {
  return (
    <AppBar position="fixed" color="secondary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My TV Shows
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Genre</Button>
        <Button color="inherit">Favorites</Button>
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
