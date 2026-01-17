import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const MenuBar: React.FC = () => {
  return (
    <AppBar position="static" color="secondary">
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
