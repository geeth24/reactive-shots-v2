import Link from 'next/link';
import React from 'react';

function CTA() {
  return (
    <div className="flex flex-col space-y-8 bg-tertiary py-16 text-center text-primary">
      <div className="space-y-4">
        <h1 className="font-blackmud text-3xl leading-loose">Capturing Unforgettable Memories</h1>
        <p className="text-lg">
          We capture the essence of every moment, ensuring they&apos;re cherished forever.
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <Link
          className="bg-primary hover:bg-primary-dark text-tertiary rounded-lg transform px-6 py-3 text-sm font-semibold shadow-lg transition duration-300 ease-in-out hover:scale-105"
          href="/lets-talk"
        >
          Start Your Story
        </Link>
      </div>
    </div>
  );
}

export default CTA;
