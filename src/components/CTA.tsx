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
      <div className="mt-4 flex justify-center">
        <Link
          className="rounded-lg bg-primary px-4 py-2 font-blackmud text-sm  text-tertiary"
          href="/lets-talk"
        >
          Start Your Story
        </Link>
      </div>
    </div>
  );
}

export default CTA;
