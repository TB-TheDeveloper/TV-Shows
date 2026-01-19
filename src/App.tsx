import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Box, Card, Grid, Skeleton } from "@mui/material";

const App = () => {
  const Home = lazy(() => import("./Components/Home"));
  const Favorites = lazy(() => import("./Components/Favorites"));

  const ShowCardSkeleton = () => (
    <Card sx={{ maxWidth: 209, margin: 1 }}>
      <Skeleton variant="rectangular" height={300} />
      <Box sx={{ p: 1 }}>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="90%" height={40} />
      </Box>
    </Card>
  );

  const LoadingFallback = () => (
    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      {Array.from({ length: 8 }).map((_, idx) => (
        <ShowCardSkeleton key={idx} />
      ))}
    </Grid>
  );

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Suspense>
  );
};

export default App;
