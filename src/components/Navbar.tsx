'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from 'lodash';
import Link from 'next/link';
import { Menu, MessageSquareText, X, Youtube } from 'lucide-react';
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
    const currentScrollDiv = scrollDivRef?.current; // Assign the current ref to a variable

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
  }, [scrollDivRef, sectionOneRef, sectionTwoRef]); // Dependencies

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
      opacity: 1,
      background: 'transparent',
      color: '#F7FCFF',
      transition: { duration: 0.5 },
    },
    secondSection: {
      opacity: 1,
      background: 'transparent',
      color: '#F7FCFF',
      borderBottom: 'none',
      transition: { duration: 0 },
    },
    default: {
      opacity: 1,
      background: '#F7FCFF',
      color: '#00A6FB',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      transition: { duration: 0.5 },
    },
  };
  return (
    <AnimatePresence>
      <motion.nav
        ref={navbarRef}
        className="font-blackmud fixed z-20 w-screen p-4"
        animate={navbarStyle}
        variants={variants}
        initial="firstSection"
        exit="exit"
        role="navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-center md:flex-row md:items-center md:justify-between">
            <div className="absolute left-4 md:hidden">
              <button
                className="text-tertiary z-50 rounded-lg px-4 py-2 md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <></> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            <div
              className={`${isMenuOpen ? 'hidden' : 'hidden'} items-start space-y-4 md:flex md:space-y-0 md:space-x-4`}
            >
              {links.map((link) => (
                <Link key={link.name} href={link.href} className="text-center">
                  {link.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 md:hidden">
                <Link href="/lets-talk" className="text-2xl md:text-xl">
                  Let&apos;s Talk
                </Link>
                <Link href="https://www.instagram.com/reactiveshots/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
              </div>
            </div>
            <Link
              href="/"
              className={`font-blackmud z-50 mt-2 mr-2 text-center text-3xl md:mr-[12.5rem] ${isMenuOpen ? 'text-primary' : ''}`}
            >
              {navbarStyle === 'firstSection' ? 'RS' : 'Reactive Shots'}
            </Link>
            <div className="hidden items-center space-x-4 pr-2 md:flex">
              <Link href="https://www.instagram.com/reactiveshots/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram h-6 w-6"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link href="https://www.youtube.com/@reactive_shots">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
              <Link href="sms:+1-972-829-5173" className="text-2xl md:text-xl">
                <MessageSquareText className="h-6 w-6" />
              </Link>
            </div>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -100 }}
                  className="bg-tertiary fixed top-0 left-0 z-40 flex h-[26rem] w-full items-center justify-center shadow-sm backdrop-blur-3xl md:hidden"
                >
                  <div className="absolute top-4 left-4">
                    <button
                      className="text-primary rounded-lg px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className={`text-primary h-6 w-6`} />
                    </button>
                  </div>
                  <div
                    className={`text-primary z-50 flex h-full w-full flex-col items-start justify-start space-y-10 px-4 py-16`}
                  >
                    <div className="ml-2 flex space-x-4">
                      <Link href="https://www.instagram.com/reactiveshots/">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-instagram"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                        </svg>
                      </Link>
                      <Link href="https://www.youtube.com/@reactive_shots">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-youtube"
                        >
                          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                          <path d="m10 15 5-3-5-3z" />
                        </svg>
                      </Link>
                      <Link href="sms:+1-972-829-5173" className="text-3xl">
                        <MessageSquareText className="h-6 w-6" />
                      </Link>
                    </div>
                    {links.map((link) => (
                      <Link key={link.name} href={link.href} className="text-3xl">
                        {link.name}
                      </Link>
                    ))}
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
