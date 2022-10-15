import { MenuItem } from "./createMenuItem";

type MenuProps = {
  menuItems: MenuItem[];
};

const Menu = ({ menuItems }: MenuProps) => {
  return (
    <ul>
      {menuItems.map((menuItem) => (
        <li>{menuItem.label}</li>
      ))}
    </ul>
  );
};

export { Menu };
