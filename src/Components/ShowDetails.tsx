import { TabList, TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import { Box, Card, CardMedia, Grid, Tab, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AppContext } from "../AppContextProvider";
import { stripTags } from "../Services/Library";
import useCastsAPI from "../Services/ShowsAPI";
import useGalleryAPI from "../Services/ShowsAPI";
import type { Show } from "../Types";

const ShowDetails: React.FC = () => {
  const { id } = useParams<{ id: string; name: string }>();
  const [value, setValue] = React.useState("1");
  const { shows } = useContext(AppContext);

  const showDetails = shows.find((show) => show.id === Number(id)) as Show;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 6 }}>
      <Grid size={{ xs: 12, md: 10, lg: 12 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {showDetails?.name}
          </Typography>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Summary" value="1" />
                <Tab label="Cast" value="2" />
                <Tab label="Gallery" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <CardMedia
                    component="img"
                    image={showDetails?.image?.medium || "/placeholder.png"}
                    alt={showDetails?.name}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <Typography variant="body1">
                    {stripTags(showDetails?.summary)}
                  </Typography>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Cast showID={Number(id)} />
            </TabPanel>
            <TabPanel value="3">
              <Gallery showID={Number(id)} />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShowDetails;

interface CastProps {
  showID: number;
}

const Cast: React.FC<CastProps> = ({ showID }) => {
  const { getCastsAPI } = useCastsAPI();
  const { casts, setCasts } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (casts.length) {
        return;
      }
      try {
        const data = await getCastsAPI(showID);
        setCasts(data);
      } catch (error) {
        console.error("Error fetching casts:", error);
      }
    })();
    // I only want to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {casts.map((cast) => (
        <Grid key={cast.person.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card sx={{ display: "flex", alignItems: "center", p: 1 }}>
            <CardMedia
              component="img"
              image={cast.character.image?.medium || "/placeholder.png"}
              alt={cast.character.name}
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                objectFit: "cover",
                mr: 2,
              }}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {cast.person.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                as {cast.character.name}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

interface GalleryProps {
  showID: number;
}

const Gallery: React.FC<GalleryProps> = ({ showID }) => {
  const { getGalleryAPI } = useGalleryAPI();
  const { gallery, setGallery } = useContext(AppContext);

  useEffect(() => {
    (async () => {
      if (gallery.length) {
        return;
      }
      try {
        const data = await getGalleryAPI(showID);
        setGallery(data);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    })();
    // I only want to run this once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      {gallery.map((image) => (
        <Grid key={image.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>
            <CardMedia
              component="img"
              image={
                image.resolutions?.medium?.url ||
                image.resolutions?.original?.url ||
                "/placeholder.png"
              }
              alt={
                image.resolutions?.medium?.url ||
                image.resolutions?.original?.url ||
                "/placeholder.png"
              }
              sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                objectFit: "cover",
                mr: 2,
              }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
