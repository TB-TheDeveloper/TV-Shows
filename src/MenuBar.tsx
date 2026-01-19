import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

const MenuBar: React.FC = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#161717" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My TV Shows
        </Typography>
        <Button color="inherit" className="opacity-05" component={Link} to="/">
          Home
        </Button>
        <Button
          color="inherit"
          className="opacity-05"
          component={Link}
          to="/genre"
        >
          Genre
        </Button>
        <Button
          color="inherit"
          className="opacity-05"
          component={Link}
          to="/favorites"
        >
          Favorites
        </Button>
        <IconButton color="inherit" className="opacity-05">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
