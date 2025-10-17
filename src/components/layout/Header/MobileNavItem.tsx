import { dropdownArrow } from '@/assets';
import { Button, Icon, NavLink } from '@/components';
import { cn } from '@/lib';
import type { NavItem } from '@/types';

interface MobileNavItemProps {
  item: NavItem;
  isActive: boolean;
  toggleSubmenu: () => void;
  closeMenu: () => void;
}

export const MobileNavItem = ({ item, isActive, toggleSubmenu, closeMenu }: MobileNavItemProps) => {
  const handleClick = () => {
    closeMenu();
  };

  return (
    <div className="section-border-b py-3">
      <div className="flex items-center">
        <NavLink to={item.path} onClick={handleClick}>
          {item.label}
        </NavLink>
        {item.children && (
          <Button
            onClick={toggleSubmenu}
            className="flex items-center px-4 py-0"
            aria-expanded={isActive}
            intent="minimal"
            aria-label={`${isActive ? 'Collapse' : 'Expand'} ${item.label} submenu`}
          >
            <Icon
              icon={dropdownArrow}
              name="dropdownArrow"
              size="w-4 h-4"
              className={cn('mt-0.5 transform text-secondary transition-transform', {
                'rotate-180': isActive,
              })}
            />{' '}
          </Button>
        )}
      </div>

      {item.children && (
        <div>
          <div
            className={cn('ml-1 overflow-hidden transition-all duration-500 ease-in-out', {
              'max-h-[300px] opacity-100': isActive,
              'max-h-0 opacity-0': !isActive,
            })}
          >
            {item.children.map((subItem) => (
              <NavLink
                key={subItem.label}
                to={subItem.path}
                className="block py-1 pl-4 tracking-wide"
                onClick={handleClick}
              >
                {subItem.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavItem;
