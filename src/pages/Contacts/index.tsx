import { ContactsSection, HoverCircles } from '@/components';

const Contacts = () => {
  return (
    <div className="margin-t relative overflow-hidden">
      {/* Concentric Circles */}
      <HoverCircles withLogo className="top-[7%] translate-x-[45%] sm:top-0 sm:translate-x-0" />
      <div className="container">
        <div className="padding-y">
          <ContactsSection isPage />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
