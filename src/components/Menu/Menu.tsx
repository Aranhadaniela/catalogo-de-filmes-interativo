import MenuItem from "./MenuItem";
import { menuOptions } from "./menuOptions";
import type { MenuProps } from "./menu.types";

const Menu = ({ items = menuOptions }: MenuProps) => {
  return (
    <nav>
      <ul className="flex items-center justify between w-full px-4">
        {items.map((i) => (
          <li key={i.route}>
            <MenuItem {...i} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
