import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import LetsTalk from '@/components/LetsTalk';
import React, { Suspense } from 'react';

function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Suspense>
          <LetsTalk />
        </Suspense>
      </div>
      <hr className="bg-primary h-0.5" />
      <Footer />
    </div>
  );
}

export default Page;
