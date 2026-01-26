import { Box, Card, Grid, Skeleton } from "@mui/material";
import { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { AppContext } from "./AppContextProvider";

const Favorites = lazy(() => import("./Components/Favorites"));
const Home = lazy(() => import("./Components/Home"));
const LoginScreen = lazy(() => import("./Components/LoginScreen"));
const ShowDetails = lazy(() => import("./Components/ShowDetails"));

const ShowCardSkeleton = () => (
  <Card sx={{ width: 209, margin: 1 }}>
    <Skeleton variant="rectangular" height={300} width="100%" />
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

const App = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <Suspense
      fallback={
        <div style={{ marginTop: "90px" }}>
          <LoadingFallback />
        </div>
      }
    >
      <Routes>
        {!isLoggedIn && <Route path="/" element={<LoginScreen />} />}
        {isLoggedIn && <Route path="/home" element={<Home />} />}
        {isLoggedIn && <Route path="/favorites" element={<Favorites />} />}
        {isLoggedIn && (
          <Route path="/show/:id/:name" element={<ShowDetails />} />
        )}
      </Routes>
    </Suspense>
  );
};

export default App;
