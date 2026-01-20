import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "./AppContextProvider";

const MenuBar: React.FC = () => {
  const { searchTerm, setDisplayedShows, setSearchTerm, shows } =
    useContext(AppContext);

  const onSearch = (term: string) => {
    if (!term) {
      // if search term is empty, reset displayed shows to first 25
      setDisplayedShows(shows.slice(0, 25));
      return;
    } else {
      const filtered = shows.filter((show) =>
        show.name.toLowerCase().includes(term.toLowerCase()),
      );
      setDisplayedShows(filtered);
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#161717" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My TV Shows
        </Typography>
        <Box sx={{ flexGrow: 6, display: "flex", justifyContent: "center" }}>
          <TextField
            className="menu-bar-search-input"
            size="small"
            placeholder="Search shows..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!e.target.value) {
                onSearch("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch(searchTerm); // only search when Enter pressed
              }
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
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
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
