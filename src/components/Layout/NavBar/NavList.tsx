import NavItem from "./NavItem";
import { NavListProps } from "./types";

const NavList = (list: NavListProps) => {
  const { items } = list;
  return (
    <ul className="flex flex-col gap-2 text-left">
      {items &&
        items.map((e, i) => {
          return <NavItem key={i} {...e} />;
        })}
    </ul>
  );
};

export default NavList;
