import React, { useContext } from "react";
import { AppContext } from "../AppContextProvider";
import ShowCard from "./ShowCard";
import { Box, Card, Grid, Typography } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

const Favorites: React.FC = () => {
  const { favorites, setFavorites, setShows, shows } = useContext(AppContext);

  return (
    <div>
      {!favorites.length ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Card
            sx={{
              p: 4,
              textAlign: "center",
              maxWidth: 400,
              backgroundColor: "background.paper",
            }}
          >
            <FavoriteBorder
              sx={{ fontSize: 48, color: "text.secondary", mb: 1 }}
            />

            <Typography variant="h6" gutterBottom>
              No favorites yet
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Start exploring shows and tap the heart to add your favorites
              here.
            </Typography>
          </Card>
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ marginTop: 12 }}>
          {shows
            .filter((show) => favorites.includes(show.id))
            .map((show) => (
              <Grid key={show.id} sx={{ marginBottom: 2 }}>
                <ShowCard show={show} />
              </Grid>
            ))}
        </Grid>
      )}
    </div>
  );
};

export default Favorites;
