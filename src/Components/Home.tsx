import { Grid } from "@mui/material";
import useShowsAPI from "../Services/ShowsAPI";
import type { Shows } from "../Types";
import React, { useEffect, useState } from "react";
import ShowCard from "./ShowCard";

const Home: React.FC = () => {
  const [shows, setShows] = useState<Shows[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { getShowsAPI } = useShowsAPI();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getShowsAPI();
        setShows(data);
      } catch (error) {
        console.error("Error fetching shows:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Grid container spacing={2}>
      {shows.slice(0, 25).map((show) => (
        <Grid key={show.id}>
          <ShowCard show={show} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
