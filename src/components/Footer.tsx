'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: "Let's Talk", href: '/lets-talk' },
];
function Footer() {
  return (
    <footer className="bg-background-dark text-tertiary py-6 text-center">
      <h1 className="font-blackmud text-tertiary mb-2 text-3xl leading-loose">RS</h1>
      <div className="mb-2 flex justify-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-blackmud hover:text-tertiary/50 text-xl"
          >
            {link.name}
          </Link>
        ))}
      </div>
      <p className="flex items-center justify-center space-x-1 text-xs">
        <span className="sr-only">Geeth Gunnampalli</span>
        <span>Made with</span>
        <Heart className="" size={16} />
        <span>by</span>
        <Link href="https://geethg.com" className="underline">
          Geeth
        </Link>
      </p>
      <p className="text-sm">Reactive Shots © {new Date().getFullYear()} </p>
    </footer>
  );
}

export default Footer;
