export type NavItemProps = {
  name: string;
  icon?: React.ReactNode;
  link: string;
  isActive?: boolean;
};

export type NavListProps = {
  items: NavItemProps[];
};
