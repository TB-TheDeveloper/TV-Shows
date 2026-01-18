import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import React, { use, useContext } from "react";

import type { Shows } from "../Types";
import { Favorite } from "@mui/icons-material";
import { AppContext } from "../AppContextProvider";

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
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
          color: "white",
          opacity: 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          {show.name}
        </Typography>

        <Typography variant="body2" sx={{ fontSize: 12 }}>
          ⭐ {show.rating.average ?? "N/A"}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontSize: 11,
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: show.summary ?? "" }}
        />
      </Box>
    </Card>
  );
};

export default ShowCard;
