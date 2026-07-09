import { Outlet } from "react-router";
import Navbar from "../NavBar/Navbar";
import Footer from "../Footer/Footer";

const MainLayout = () => {
  return (
    <div >
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
