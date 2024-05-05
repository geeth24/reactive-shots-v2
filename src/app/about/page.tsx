import About from '@/components/About';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

function Page() {
  return (
    <div className="h-screen">
      <Navbar />
      <About />
      <hr className="h-0.5 bg-primary" />
      <Footer />
    </div>
  );
}

export default Page;
