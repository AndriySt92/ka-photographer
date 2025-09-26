import { ContactsSection, HoverCircles } from '@/components';

const Contacts = () => {
  return (
    <div className="relative mt-[57px] overflow-hidden">
      {/* Concentric Circles */}
      <HoverCircles withLogo className="top-[7%] translate-x-[45%] sm:top-0 sm:translate-x-0" />
      <div className="container">
        <div className="py-8 2xl:py-16">
          <ContactsSection isPage />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
