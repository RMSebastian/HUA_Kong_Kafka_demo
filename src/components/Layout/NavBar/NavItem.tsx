import { NavItemProps } from "./types";
import { Link } from "react-router-dom";

const NavItem = (item: NavItemProps) => {
  const { name, icon, link } = item;
  return (
    <li>
      {icon && <span className="mr-2">{icon}</span>}
      <Link to={link}>{name}</Link>
    </li>
  );
};

export default NavItem;
