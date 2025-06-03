// Page.tsx
'use client';
import React, { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Types from '@/components/Types';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

const Page: React.FC = () => {
  // Refs for scroll sections
  const heroRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scroll container styles
  const scrollContainerStyles = {
    scrollSnapType: 'y mandatory' as const,
    scrollBehavior: 'smooth' as const,
    WebkitOverflowScrolling: 'touch' as const,
  };

  // Section styles
  const sectionStyles = {
    scrollSnapAlign: 'start' as const,
  };

  return (
    <div className="bg-background relative min-h-screen">
      {/* Navigation */}
      <Navbar sectionOneRef={heroRef} sectionTwoRef={typesRef} scrollDivRef={ctaRef} />

      {/* Main Content */}
      <main
        ref={ctaRef}
        className="relative z-10 h-screen overflow-y-auto overscroll-none"
        style={scrollContainerStyles}
      >
        {/* Hero Section */}
        <section ref={heroRef} className="h-screen w-full" style={sectionStyles}>
          <Hero />
        </section>

        {/* Types Section */}
        <section ref={typesRef} className="h-screen w-full" style={sectionStyles}>
          <Types />
        </section>

        {/* CTA Section with Footer */}
        <section className="min-h-screen w-full" style={sectionStyles}>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              <CTA />
            </div>
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
