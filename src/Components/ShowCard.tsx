import { Favorite } from "@mui/icons-material";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import React, { useContext } from "react";

import { AppContext } from "../AppContextProvider";
import type { Shows } from "../Types";

interface ShowCardProps {
  show: Shows;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  const { toggleFavorite, isFavorite } = useContext(AppContext);

  return (
    <Card className="show-card">
      <CardMedia
        component="img"
        height="300"
        image={show.image?.medium || "/placeholder.png"}
        alt={show.name}
      />
      <IconButton
        className="favorites-btn"
        onClick={() => toggleFavorite(show.id)}
      >
        <Favorite color={isFavorite(show.id) ? "error" : "inherit"} />
      </IconButton>
      <Box className="show-card-box">
        <Typography variant="subtitle1" fontWeight="bold">
          {show.name}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: 12 }}>
          ⭐ {show.rating.average ?? "N/A"}
        </Typography>

        <Typography
          variant="body2"
          className="show-card-box-summary"
          dangerouslySetInnerHTML={{ __html: show.summary ?? "" }}
        />
      </Box>
    </Card>
  );
};

export default ShowCard;
