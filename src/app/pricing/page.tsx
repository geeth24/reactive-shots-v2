'use client';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import React from 'react';

function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Pricing />
      </div>
      <CTA />
      <hr className="bg-primary h-0.5" />
      <Footer />
    </div>
  );
}

export default Page;
