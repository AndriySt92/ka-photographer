import { ContactInfo, NavLink, Typography } from '@/components';
import { contactInfo, navigation, socialMediaPlatforms } from '@/config';
import { cn } from '@/lib';

import FooterSection from './components/FooterSection';

const PAGE_ITEMS = [
  { label: 'Головна', path: '/' },
  { label: 'Послуги', path: '/services' },
  { label: 'Галерея', path: '/gallery' },
  { label: 'Контакти', path: '/contacts' },
];

const servicesItem = navigation.find((item) => item.label === 'Послуги');
const servicesChildren = servicesItem?.children || [];

const Footer = () => {
  const navLinkClasses = 'w-fit p-1 opacity-80 pointer-fine:hover:opacity-100 active:opacity-100';

  return (
    <footer className="bg-primary">
      <div className="container">
        {/* Top Navigation */}
        <div className="section-border-t hidden justify-center sm:flex sm:p-3">
          <nav className="flex sm:gap-8 2xl:text-lg">
            {navigation.slice(0, 2).map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                {item.label}
              </NavLink>
            ))}
            <a
              href={socialMediaPlatforms[2].link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialMediaPlatforms[2].name}
              className={cn(
                'cursor-pointer transition-all duration-300 pointer-fine:hover:bg-accent/40',
                navLinkClasses,
              )}
            >
              <Typography parentAs="span" size="lg">
                ФОТОГРАФ ІВАНО-ФРАНКІВСЬК, ЛЬВІВ
              </Typography>
            </a>
          </nav>
        </div>

        {/* Main Footer Sections */}
        <nav className="section-border-t py-8 xl:py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-3">
            {/* Services & Prices */}
            <FooterSection title="ПОСЛУГИ ТА ЦІНИ">
              {servicesChildren.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                  {item.label === 'Love Story' ? item.label : item.label.split(' ')[0]}
                </NavLink>
              ))}
            </FooterSection>

            {/* Pages */}
            <FooterSection title="СТОРІНКИ">
              {PAGE_ITEMS.map((item) => (
                <NavLink key={item.path} to={item.path} className={navLinkClasses}>
                  {item.label}
                </NavLink>
              ))}
            </FooterSection>

            <FooterSection title="КОНТАКТИ">
              <ContactInfo items={contactInfo} role="footer" />
            </FooterSection>
          </div>
        </nav>

        {/* Copyright */}
        <div className="pb-6 pt-2">
          <Typography parentAs="p" size="lg" align="center" className="normal-case">
            Анастасія Кугіт - Фотограф в м. Івано-Франківськ, Львів. 2025 | Політика
            конфіденційності
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
