import React from 'react';
import { Button } from './button';

function CTA() {
  return (
    <div className="bg-tertiary text-primary flex h-full w-full flex-col items-center justify-center px-4 py-6 text-center">
      <div className="max-w-3xl space-y-4">
        <h1 className="font-blackmud text-3xl leading-tight md:text-4xl">
          Capturing Unforgettable Memories
        </h1>
        <p className="mx-auto max-w-2xl text-lg md:text-xl">
          We capture the essence of every moment, ensuring they&apos;re cherished forever.
        </p>
      </div>
      <div className="mt-4">
        <Button href="/lets-talk" color="primary" className="px-6 py-2 text-base">
          Start Your Story
        </Button>
      </div>
    </div>
  );
}

export default CTA;
