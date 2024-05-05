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
    <div className="h-screen snap-y snap-mandatory overflow-hidden overflow-y-scroll" ref={divRef}>
      <Navbar sectionOneRef={heroRef} sectionTwoRef={typesRef} scrollDivRef={divRef} />
      <div ref={heroRef} className="snap-start">
        <Hero />
      </div>
      <div ref={typesRef} className=" snap-start">
        <Types />
      </div>
      <div className="snap-start">
        <CTA />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
