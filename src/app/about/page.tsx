import About from '@/components/About';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

function Page() {
  return (
    <div className="h-screen snap-y snap-mandatory overflow-hidden overflow-y-scroll">
      <Navbar />
      <div className="snap-start">
        <About />
      </div>
      <hr className="h-0.5 bg-primary" />
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
