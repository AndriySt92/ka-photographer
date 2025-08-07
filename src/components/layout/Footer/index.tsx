import { contactInfo, navigation, socialMediaPlatforms } from '../../../config';
import { ContactInfo, Typography } from '../../ui';

import FooterLink from './FooterLink';
import FooterSection from './FooterSection';

const PAGE_ITEMS = [
  { label: 'Головна', path: '/' },
  { label: 'Послуги', path: '/services' },
  { label: 'Галерея', path: '/gallery' },
  { label: 'Контакти', path: '/contacts' },
];

const Footer = () => {
  const servicesItem = navigation.find((item) => item.label === 'Послуги');
  const linkClasses =
    'p-1 opacity-80 transition-all duration-300 hover:bg-accent/40 hover:opacity-100';

  return (
    <footer className="font-title bg-primary text-secondary">
      <div className="container">
        {/* Top Navigation */}
        <div className="hidden justify-center border-t border-secondary/60 sm:flex sm:p-3">
          <div className="flex xl:gap-8 2xl:text-lg">
            {navigation.slice(0, 2).map((item) => (
              <FooterLink key={item.path} to={item.path}>
                {item.label}
              </FooterLink>
            ))}
            <a
              href={socialMediaPlatforms[2].link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialMediaPlatforms[2].name}
              className={linkClasses}
            >
              <Typography parentAs="span" size="lg">
                ФОТОГРАФ ІВАНО-ФРАНКІВСЬК, ЛЬВІВ
              </Typography>
            </a>
          </div>
        </div>

        {/* Main Footer Sections */}
        <div className="border-t border-secondary/60 py-3 sm:py-7 xl:py-10">
          <div className="grid grid-cols-2 grid-rows-2 place-items-start gap-5 sm:gap-3 md:grid-cols-3 md:grid-rows-1">
            {/* Services & Prices */}
            <FooterSection title="ПОСЛУГИ ТА ЦІНИ">
              {servicesItem?.children?.map((item) => (
                <FooterLink key={item.path} to={item.path}>
                  {item.label === 'Love Story' ? item.label : item.label.split(' ')[0]}
                </FooterLink>
              ))}
            </FooterSection>

            {/* Pages */}
            <FooterSection title="СТОРІНКИ">
              {PAGE_ITEMS.map((item) => (
                <FooterLink key={item.path} to={item.path}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterSection>

            <FooterSection title="КОНТАКТИ">
              <ContactInfo items={contactInfo} role="footer" />
            </FooterSection>
          </div>
        </div>

        {/* Copyright */}
        <div className="p-2 sm:pb-4">
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
