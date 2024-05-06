import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LetsTalk from '@/components/LetsTalk';
import React, { Suspense } from 'react';

function Page() {
  return (
    <div className="h-screen">
      <Navbar />
      <Suspense>
        <LetsTalk />
      </Suspense>
      <hr className="h-0.5 bg-primary" />
      <Footer />
    </div>
  );
}

export default Page;
