import { lazy } from 'react';

import { ContactsSection, CursorFollower, HoverCircles, LazySection } from '@/components';

import { Banner } from './components';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const HomeGallery = lazy(() => import('./components/HomeGallery'));
const Reviews = lazy(() => import('./components/Reviews'));
const Terms = lazy(() => import('./components/Terms'));

const Home = () => {
  return (
    <div>
      <section className="padding-b relative">
        <Banner />
      </section>

      <section className="relative">
        <CursorFollower />

        <div className="container">
          <div className="section-border-y padding-y">
            <LazySection>
              <About />
            </LazySection>
          </div>
        </div>
      </section>

      <section className="padding-y">
        <LazySection>
          <Services />
        </LazySection>
      </section>

      <section>
        <div className="container">
          <div className="section-border-y padding-y">
            <LazySection>
              <HomeGallery />
            </LazySection>
          </div>
        </div>
      </section>

      <section className="relative">
        <CursorFollower />

        <div className="container">
          <div className="section-border-b padding-y">
            <LazySection>
              <Reviews />
            </LazySection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <HoverCircles className="top-[7%] -translate-x-[35%] sm:top-0 sm:translate-x-0" />

        <div className="container">
          <div className="section-border-b padding-y">
            <LazySection>
              <Terms />
            </LazySection>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <HoverCircles withLogo className="top-[7%] translate-x-[45%] sm:top-0 sm:translate-x-0" />

        <div className="container">
          <div className="padding-y">
            <ContactsSection />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
