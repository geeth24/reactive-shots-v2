'use client';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import React from 'react';

function Page() {
  return (
    <div className="h-screen">
      <Navbar />
      <Pricing />
      <div className="h-[50vh] w-full">
        <CTA />
      </div>
      <hr className="h-0.5 bg-primary" />
      <Footer />
    </div>
  );
}

export default Page;
