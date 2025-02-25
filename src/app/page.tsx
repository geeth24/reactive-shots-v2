// Page.tsx
'use client';
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Types from '@/components/Types';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

const Page: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar sectionOneRef={heroRef} sectionTwoRef={typesRef} scrollDivRef={divRef} />

      <div
        ref={divRef}
        className="h-screen overflow-y-auto overscroll-none"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div ref={heroRef} className="h-screen w-full" style={{ scrollSnapAlign: 'start' }}>
          <Hero />
        </div>

        <div ref={typesRef} className="h-screen w-full" style={{ scrollSnapAlign: 'start' }}>
          <Types />
        </div>

        <div
          className="h-[50vh] w-full"
          style={{ scrollSnapAlign: 'end', scrollSnapStop: 'always' }}
        >
          <div className="flex h-full flex-col justify-between">
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
