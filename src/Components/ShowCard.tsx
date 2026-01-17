import { Card, CardMedia } from "@mui/material";
import React from "react";
import type { Shows } from "../Types";

interface ShowCardProps {
  show: Shows;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={show.image?.medium || "/placeholder.png"}
        alt={show.name}
      />
    </Card>
  );
};

export default ShowCard;
