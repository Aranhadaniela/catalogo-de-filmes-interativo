import MenuItem from "./MenuItem";
import { menuOptions } from "./menuOptions";
import type { MenuProps } from "./menu.types";

const Menu = ({ items = menuOptions }: MenuProps) => {
  return (
    <nav className="fixed bottom-15 left-1/2 -translate-x-1/2 z-50">
      <ul className="flex items-center justify-between gap-2 px-4 py-1 bg-linear-to-b from-white/25 to-white/10 backdrop-blur-xl backdrop-saturate-150 border border-white/40 rounded-3xl shadow-[0_0_20px_rgba(255,255,255,0.3),0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-1px_1px_rgba(255,255,255,0.2)]">
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
