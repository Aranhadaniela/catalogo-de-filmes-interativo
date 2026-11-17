import { NavLink } from "react-router-dom";
import type { NavigationItemProps } from "./menu.types";

const MenuItem = ({ label, route }: NavigationItemProps) => (
  <NavLink to={route} end className="flex flex-col items-center px-2 transition-all duration-200 ease-in-out">
    {({ isActive }) => (
      <>
        <div
          className={`w-8 h-[1.5px] rounded-full transition-all duration-200 ease-in-out ${
            isActive ? "bg-white scale-x-100" : "bg-transparent scale-x-75"
          }`}
        />
        <span
          className={`text-lg mt-1 whitespace-nowrap transition-all duration-200 ease-in-out ${
            isActive ? "text-white font-medium" : "text-neutral-400 font-normal"
          }`}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default MenuItem;