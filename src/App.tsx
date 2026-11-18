import { Route, Routes } from "react-router-dom";
import { routes } from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Favorites from "./pages/Favorites/Favorites";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.favorites} element={<Favorites />} />
        <Route path={routes.movieDetails} element={<MovieDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
