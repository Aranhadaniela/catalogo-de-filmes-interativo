import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import RandomMovie from "../components/RandomMovie/RandomMovie";

const MainLayout = () => {
  return (
    <section id="center" className="pb-24">
        <Menu />
      <Outlet />
      <Footer />
      <RandomMovie />
    </section>
  );
};

export default MainLayout;
