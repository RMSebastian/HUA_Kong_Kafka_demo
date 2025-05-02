import { Outlet } from "react-router-dom";
import NavList from "./NavList";
import { navItems } from "../../../constant/navListItems";

const NavBar = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-[200px] flex-col bg-gray-800 text-white text-center p-4 gap-4">
        <h2>Testeos</h2>
        <NavList items={navItems} />
      </div>
      <div className="flex h-full w-full p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
