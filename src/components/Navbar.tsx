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
  { name: 'Pricing', href: '/pricing' },
  { name: "Let's Talk", href: '/lets-talk' },
];

interface NavbarProps {
  sectionOneRef?: React.RefObject<HTMLDivElement | null>;
  sectionTwoRef?: React.RefObject<HTMLDivElement | null>;
  scrollDivRef?: React.RefObject<HTMLDivElement | null>;
}

const Navbar: React.FC<NavbarProps> = ({ sectionOneRef, sectionTwoRef, scrollDivRef }) => {
  const [navbarStyle, setNavbarStyle] = useState('firstSection');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, [scrollDivRef, sectionOneRef, sectionTwoRef]);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/') {
      setNavbarStyle('firstSection');
    } else {
      setNavbarStyle('default');
    }
  }, [pathname]);

  const variants = {
    firstSection: {
      backgroundColor: 'transparent',
      color: '#00A6FB',
      transition: { duration: 0.5 },
    },
    secondSection: {
      backgroundColor: 'transparent',
      color: '#F7FCFF',
      transition: { duration: 0.5 },
    },
    default: {
      backgroundColor: '#F7FCFF',
      color: '#00A6FB',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      transition: { duration: 0.5 },
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
    <AnimatePresence>
      <motion.nav
        ref={navbarRef}
        className="font-blackmud fixed z-20 w-full p-4"
        animate={navbarStyle}
        variants={variants}
        initial="firstSection"
        exit="exit"
        role="navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-center md:flex-row md:items-center md:justify-between">
            {/* Mobile Menu Button */}
            <motion.button
              className="absolute left-4 z-50 rounded-lg p-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X
                  className="h-6 w-6"
                  style={{ color: navbarStyle === 'firstSection' ? '#F7FCFF' : '#00A6FB' }}
                />
              ) : (
                <Menu
                  className="h-6 w-6"
                  style={{ color: navbarStyle === 'firstSection' ? '#F7FCFF' : '#00A6FB' }}
                />
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-8 md:flex">
              {links.map((link, index) => (
                <motion.div
                  key={link.name}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-lg font-light tracking-wide transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Logo */}
            <motion.div
              className="font-blackmud z-50 text-center text-3xl font-light tracking-tight md:mr-[12.5rem]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">{navbarStyle === 'firstSection' ? 'RS' : 'Reactive Shots'}</Link>
            </motion.div>

            {/* Social Links */}
            <div className="hidden items-center space-x-6 pr-2 md:flex">
              <motion.div variants={iconVariants} whileHover="hover">
                <Link href="https://www.instagram.com/reactiveshots/" className="transition-colors">
                  <Instagram className="h-6 w-6" />
                </Link>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <Link href="https://www.youtube.com/@reactive_shots" className="transition-colors">
                  <Youtube className="h-6 w-6" />
                </Link>
              </motion.div>
              <motion.div variants={iconVariants} whileHover="hover">
                <Link href="sms:+1-972-829-5173" className="transition-colors">
                  <MessageSquareText className="h-6 w-6" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 z-40 backdrop-blur-sm md:hidden"
                >
                  <div className="flex h-full flex-col items-center justify-center space-y-8">
                    {links.map((link, index) => (
                      <motion.div
                        key={link.name}
                        variants={linkVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="text-2xl font-light tracking-wide transition-colors"
                          style={{ color: '#F7FCFF' }}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="flex items-center space-x-6">
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link
                          href="https://www.instagram.com/reactiveshots/"
                          className="transition-colors"
                          style={{ color: '#F7FCFF' }}
                        >
                          <Instagram className="h-8 w-8" />
                        </Link>
                      </motion.div>
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link
                          href="https://www.youtube.com/@reactive_shots"
                          className="transition-colors"
                          style={{ color: '#F7FCFF' }}
                        >
                          <Youtube className="h-8 w-8" />
                        </Link>
                      </motion.div>
                      <motion.div variants={iconVariants} whileHover="hover">
                        <Link
                          href="sms:+1-972-829-5173"
                          className="transition-colors"
                          style={{ color: '#F7FCFF' }}
                        >
                          <MessageSquareText className="h-8 w-8" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
};

export default Navbar;
