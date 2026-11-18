import { routes } from "../../constants/routes";
import type { NavigationItemProps } from "./menu.types";

export const menuOptions: NavigationItemProps[] = [
  { label: "Início", route: routes.home },
  { label: "Favoritos", route: routes.favorites },
];
