interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
}

export default NavItem;
