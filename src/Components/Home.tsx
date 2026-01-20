import { Box, Card, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";

import { AppContext } from "../AppContextProvider";
import useShowsAPI from "../Services/ShowsAPI";
import ShowCard from "./ShowCard";

const Home: React.FC = () => {
  const { getShowsAPI } = useShowsAPI();
  const { displayedShows, searchTerm, setDisplayedShows, setShows, shows } =
    useContext(AppContext);

  useEffect(() => {
    (async () => {
      try {
        const data = await getShowsAPI();
        setShows(data);
        setDisplayedShows(data.slice(0, 25));
      } catch (error) {
        console.error("Error fetching shows:", error);
      }
    })();
    // I only want to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("shows in home: outside useeffect");
  console.log("this is shows:", shows);
  return (
    <Grid container spacing={2} sx={{ marginTop: 12 }}>
      {!displayedShows.length ? (
        searchTerm ? (
          // Case 3: No shows found for search term
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            minHeight="20vh"
          >
            <Card
              sx={{
                p: 4,
                textAlign: "center",
                maxWidth: 400,
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="h6" gutterBottom>
                No shows found for "{searchTerm}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try another search term.
              </Typography>
            </Card>
          </Box>
        ) : (
          // Case 2: No data at all
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100vw"
            minHeight="20vh"
          >
            <Card
              sx={{
                p: 4,
                textAlign: "center",
                maxWidth: 400,
                backgroundColor: "background.paper",
              }}
            >
              <Typography variant="h6" gutterBottom>
                No data present
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try another link or refresh the page.
              </Typography>
            </Card>
          </Box>
        )
      ) : (
        // Case 1: Shows available
        displayedShows.map((show) => (
          <Grid key={show.id} sx={{ marginBottom: 2 }}>
            <ShowCard show={show} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Home;
