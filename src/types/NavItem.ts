interface NavItem {
  label: string;
  path: string;
  children?: NavItem[];
  adminOnly?: boolean;
}

export default NavItem;
