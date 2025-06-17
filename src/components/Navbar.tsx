'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from 'lodash';
import Link from 'next/link';
import { Menu, MessageSquareText, X, Youtube, Instagram } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Pricing', href: '/pricing' },
  { name: "Let's Talk", href: '/lets-talk' },
];

interface NavbarProps {
  sectionOneRef?: React.RefObject<HTMLDivElement | null>;
  sectionTwoRef?: React.RefObject<HTMLDivElement | null>;
  scrollDivRef?: React.RefObject<HTMLDivElement | null>;
}

const Navbar: React.FC<NavbarProps> = ({ sectionOneRef, sectionTwoRef, scrollDivRef }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // Initialize state immediately based on current page
  const getInitialStyle = () => (isHomePage ? 'firstSection' : 'darkPage');
  const [navbarStyle, setNavbarStyle] = useState(getInitialStyle);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isHomePage) {
      setNavbarStyle('darkPage');
      return;
    }

    const currentScrollDiv = scrollDivRef?.current;

    const calculateThresholds = throttle(() => {
      const navbarHeight = navbarRef.current?.offsetHeight ?? 0;
      const sectionOneTop = sectionOneRef?.current?.offsetTop ?? 0;
      const sectionOneBottom =
        (sectionOneRef?.current?.offsetTop ?? 0) +
        (sectionOneRef?.current?.offsetHeight ?? 0) -
        navbarHeight;
      const sectionTwoTop = (sectionTwoRef?.current?.offsetTop ?? 0) - navbarHeight;
      const sectionTwoBottom = sectionTwoTop + (sectionTwoRef?.current?.offsetHeight ?? 0);

      const handleScroll = () => {
        const divScrollTop = (currentScrollDiv?.scrollTop ?? 0) + navbarHeight;

        if (divScrollTop >= sectionOneTop && divScrollTop <= sectionOneBottom) {
          setNavbarStyle('firstSection');
        } else if (divScrollTop >= sectionTwoTop && divScrollTop <= sectionTwoBottom) {
          setNavbarStyle('secondSection');
        } else {
          setNavbarStyle('default');
        }
      };

      currentScrollDiv?.addEventListener('scroll', handleScroll);
      return () => currentScrollDiv?.removeEventListener('scroll', handleScroll);
    }, 100);

    calculateThresholds();

    return () => {
      currentScrollDiv?.removeEventListener('scroll', calculateThresholds);
    };
  }, [scrollDivRef, sectionOneRef, sectionTwoRef, isHomePage]);

  // Immediate update when pathname changes - no animation
  useEffect(() => {
    const newStyle = isHomePage ? 'firstSection' : 'darkPage';
    setNavbarStyle(newStyle);
  }, [isHomePage]);

  const variants = {
    firstSection: {
      backgroundColor: 'transparent',
      color: '#00A6FB',
      transition: { duration: isHomePage ? 0.3 : 0 },
    },
    secondSection: {
      backgroundColor: 'transparent',
      color: '#F7FCFF',
      transition: { duration: isHomePage ? 0.3 : 0 },
    },
    default: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      color: '#F7FCFF',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
      transition: { duration: isHomePage ? 0.3 : 0 },
    },
    darkPage: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      color: '#F7FCFF',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.2)',
      transition: { duration: 0 },
    },
  };

  const linkVariants = {
    initial: { y: -20, opacity: 0 },
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

  const iconVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.nav
      ref={navbarRef}
      className="font-blackmud fixed z-50 w-full p-2"
      animate={navbarStyle}
      variants={variants}
      initial={getInitialStyle()}
      role="navigation"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex h-12 items-center justify-between">
          {/* Mobile Menu Button */}
          <motion.button
            className="z-[60] flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor:
                navbarStyle === 'firstSection'
                  ? 'rgba(0, 166, 251, 0.1)'
                  : 'rgba(247, 252, 255, 0.1)',
            }}
          >
            {isMenuOpen ? (
              <X
                className="h-5 w-5"
                style={{
                  color: navbarStyle === 'firstSection' ? '#00A6FB' : '#F7FCFF',
                }}
              />
            ) : (
              <Menu
                className="h-5 w-5"
                style={{
                  color: navbarStyle === 'firstSection' ? '#00A6FB' : '#F7FCFF',
                }}
              />
            )}
          </motion.button>

          {/* Logo - Always centered */}
          <motion.div
            className="font-blackmud absolute top-1/2 left-1/2 z-[60] -translate-x-1/2 -translate-y-1/2 text-center text-lg font-medium tracking-tight md:text-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link href="/" className="block">
              {navbarStyle === 'firstSection' ? 'RS' : 'Reactive Shots'}
            </Link>
          </motion.div>

          {/* Desktop Navigation - Left */}
          <div className="hidden items-center space-x-1 md:flex">
            {links.slice(0, 2).map((link, index) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-base font-medium tracking-wide transition-all duration-200 hover:bg-white/10"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop Navigation - Right */}
          <div className="hidden items-center space-x-1 md:flex">
            {links.slice(2).map((link, index) => (
              <motion.div
                key={link.name}
                variants={linkVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                transition={{ delay: (index + 2) * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-base font-medium tracking-wide transition-all duration-200 hover:bg-white/10"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            {/* Divider */}
            <div
              className="mx-3 h-6 w-px"
              style={{
                backgroundColor:
                  navbarStyle === 'firstSection'
                    ? 'rgba(0, 166, 251, 0.3)'
                    : 'rgba(247, 252, 255, 0.3)',
              }}
            />

            {/* Social Links */}
            <div className="flex items-center space-x-2">
              <motion.div variants={iconVariants} whileHover="hover">
                <Link
                  href="https://www.instagram.com/reactiveshots/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/10"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <Link
                  href="https://www.youtube.com/@reactive_shots"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/10"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <Link
                  href="sms:+1-972-829-5173"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-white/10"
                >
                  <MessageSquareText className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm md:hidden"
                />

                {/* Dropdown Menu */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="fixed top-12 right-4 left-4 z-[56] rounded-2xl border border-white/10 bg-black/95 shadow-xl backdrop-blur-lg md:hidden"
                >
                  <div className="flex flex-col space-y-6 p-6">
                    {/* Navigation Links */}
                    <div className="space-y-4">
                      {links.map((link, index) => (
                        <motion.div
                          key={link.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.2 }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block rounded-lg px-4 py-3 text-lg font-light tracking-wide text-white transition-all hover:bg-white/10"
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="bg-primary/20 h-px w-full" />

                    {/* Social Links */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                      className="flex items-center justify-center space-x-8"
                    >
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link
                          href="https://www.instagram.com/reactiveshots/"
                          className="text-primary transition-colors"
                        >
                          <Instagram className="h-6 w-6" />
                        </Link>
                      </motion.div>
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link
                          href="https://www.youtube.com/@reactive_shots"
                          className="text-primary transition-colors"
                        >
                          <Youtube className="h-6 w-6" />
                        </Link>
                      </motion.div>
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link href="sms:+1-972-829-5173" className="text-primary transition-colors">
                          <MessageSquareText className="h-6 w-6" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
