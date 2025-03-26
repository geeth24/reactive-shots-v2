'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: "Let's Talk", href: '/lets-talk' },
];

function Footer() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.footer
      className="bg-background-dark text-tertiary py-12 text-center"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.h1
          className="font-blackmud text-tertiary mb-6 text-4xl font-light tracking-tight"
          variants={linkVariants}
        >
          RS
        </motion.h1>

        <motion.nav
          className="mb-8 flex flex-wrap justify-center gap-6"
          variants={containerVariants}
        >
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              variants={linkVariants}
              whileHover="hover"
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="font-blackmud text-tertiary/80 hover:text-tertiary text-lg font-light tracking-wide transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        <motion.div
          className="text-tertiary/60 space-y-4 text-sm font-light tracking-wide"
          variants={containerVariants}
        >
          <p className="flex items-center justify-center gap-2">
            <span className="sr-only">Geeth Gunnampalli</span>
            <span>Made with</span>
            <Heart className="text-tertiary/80" size={16} />
            <span>by</span>
            <Link
              href="https://geethg.com"
              className="text-tertiary/80 hover:text-tertiary transition-colors"
            >
              Geeth
            </Link>
          </p>
          <p>Reactive Shots © {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
