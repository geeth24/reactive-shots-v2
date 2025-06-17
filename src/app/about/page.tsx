import About from '@/components/About';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
      <hr className="bg-primary h-0.5" />
      <Footer />
    </div>
  );
}

export default Page;
