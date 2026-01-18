import { Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import useShowsAPI from "../Services/ShowsAPI";
import type { Shows } from "../Types";
import ShowCard from "./ShowCard";
import { AppContext } from "../AppContextProvider";

const Home: React.FC = () => {
  const [shows, setShows] = useState<Shows[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getShowsAPI } = useShowsAPI();
  const { setFavorites } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getShowsAPI();
        setShows(data);
        const favs = localStorage.getItem("favorites");
        if (favs) {
          setFavorites(JSON.parse(favs!));
        }
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Grid container spacing={2} sx={{ marginTop: 12 }}>
      {shows.slice(0, 25).map((show) => (
        <Grid key={show.id} sx={{ marginBottom: 2 }}>
          <ShowCard show={show} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
