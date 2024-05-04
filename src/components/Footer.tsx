'use client';
import Link from 'next/link';
import React from 'react';
const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
];
function Footer() {
  return (
    <footer className="bg-tertiary py-4 text-center text-primary">
      <h1 className="mb-4 font-blackmud text-3xl leading-loose text-primary">RS</h1>
      <div className="mb-4 flex justify-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-blackmud text-xl hover:text-primary/50"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <p className="text-sm">Reactive Shots © {new Date().getFullYear()} </p>
    </footer>
  );
}

export default Footer;
