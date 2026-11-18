import { Outlet } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <section id="center" className="pb-24">
      <div className="items-center justify-items-center ">
        <Menu />
      </div>
      <Outlet />
      <Footer />
    </section>
  );
};

export default MainLayout;
