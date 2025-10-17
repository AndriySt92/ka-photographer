import { ContactsSection, CursorFollower, HoverCircles } from '@/components';

import { About, Banner, HomeGallery, Reviews, Services, Terms } from './components';

const Home = () => {
  return (
    <div>
      <div>
        {/* Banner Section */}
        <section className="padding-b relative">
          <Banner />
        </section>

        {/* About Section */}
        <section className="relative">
          <CursorFollower />
          <div className="container">
            <div className="section-border-y padding-y">
              <About />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="padding-y">
          <Services />
        </section>

        {/* Gallery Section */}
        <section>
          <div className="container">
            <div className="section-border-y padding-y">
              <HomeGallery />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="relative">
          <CursorFollower />
          <div className="container ">
            <div className="section-border-b padding-y">
              <Reviews />
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="relative overflow-hidden">
          {/* Concentric Circles */}
          <HoverCircles className="top-[7%] -translate-x-[35%] sm:top-0 sm:translate-x-0" />
          <div className="container">
            <div className="section-border-b padding-y">
              <Terms />
            </div>
          </div>
        </section>

        {/* Contacts Section */}
        <section className="relative overflow-hidden">
          {/* Concentric Circles */}
          <HoverCircles withLogo className="top-[7%] translate-x-[45%] sm:top-0 sm:translate-x-0" />
          <div className="container">
            <div className="padding-y">
              <ContactsSection />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
