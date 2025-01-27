import Link from 'next/link';
import React from 'react';
import { Button } from './button';

function CTA() {
  return (
    <div className="bg-tertiary text-primary flex flex-col space-y-8 py-16 text-center">
      <div className="space-y-4">
        <h1 className="font-blackmud text-3xl leading-loose">Capturing Unforgettable Memories</h1>
        <p className="text-lg">
          We capture the essence of every moment, ensuring they&apos;re cherished forever.
        </p>
      </div>
      <div className="mt-6 flex justify-center">
        <Button href="/lets-talk" color="primary">
          Start Your Story
        </Button>
      </div>
    </div>
  );
}

export default CTA;
