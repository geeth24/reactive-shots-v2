'use client';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
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
      className="relative overflow-hidden bg-gradient-to-t from-black via-gray-900 to-black"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="bg-primary/20 absolute top-1/4 left-1/4 h-32 w-32 rounded-full blur-3xl" />
        <div className="bg-primary/30 absolute right-1/4 bottom-1/4 h-24 w-24 rounded-full blur-2xl" />
      </div>

      <div className="relative container mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Brand Section */}
          <motion.div
            className="space-y-6"
            variants={linkVariants}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-4">
              <h2 className="font-blackmud text-4xl font-bold tracking-tight text-white lg:text-5xl">
                Reactive Shots
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-primary h-1 w-16 rounded-full" />
                <span className="text-lg text-white/80">Est. 2024</span>
              </div>
            </div>
            <p className="text-sm text-white/70 sm:text-base">
              Let&apos;s capture your story together. Every moment deserves to be remembered
              beautifully.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-white/60">
              <p>📧 hello@reactiveshots.com</p>
              <p>📱 +1 (972) 829-5173</p>
              <p>📍 Dallas, Texas</p>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            <h3 className="text-xl font-semibold text-white">Quick Links</h3>
            <nav className="grid grid-cols-2 gap-4 lg:grid-cols-1">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  whileHover="hover"
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center text-base tracking-wide text-white/70 transition-colors hover:text-white"
                  >
                    <span className="mr-2 opacity-0 transition-opacity group-hover:opacity-100">
                      →
                    </span>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            className="space-y-6"
            variants={linkVariants}
            initial="initial"
            animate="animate"
          >
            <h3 className="text-xl font-semibold text-white">Stay Connected</h3>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <p className="text-sm text-white/70">
                Subscribe for photography tips and portfolio updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="focus:border-primary focus:ring-primary flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 backdrop-blur-sm focus:ring-1 focus:outline-none"
                />
                <button className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-white/80">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  {
                    name: 'Instagram',
                    href: 'https://www.instagram.com/reactiveshots/',
                    emoji: '📷',
                  },
                  { name: 'YouTube', href: 'https://www.youtube.com/@reactive_shots', emoji: '🎥' },
                  { name: 'Portfolio', href: '/gallery', emoji: '🖼️' },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="hover:border-primary hover:bg-primary/20 flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all hover:text-white"
                  >
                    <span className="text-lg">{social.emoji}</span>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 lg:flex-row"
          variants={containerVariants}
        >
          <div className="flex items-center gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} Reactive Shots</p>
            <span>•</span>
            <Link href="/privacy" className="transition-colors hover:text-white/80">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="transition-colors hover:text-white/80">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>Crafted with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>by</span>
            <Link
              href="https://geethg.com"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Geeth
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
