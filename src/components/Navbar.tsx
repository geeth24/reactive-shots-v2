'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { throttle } from 'lodash';
import Link from 'next/link';
import { Menu, MessageSquareText, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
  { name: "Let's Talk", href: '/lets-talk' },
];

interface NavbarProps {
  sectionOneRef?: React.RefObject<HTMLDivElement>;
  sectionTwoRef?: React.RefObject<HTMLDivElement>;
  scrollDivRef?: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = ({ sectionOneRef, sectionTwoRef, scrollDivRef }) => {
  const [navbarStyle, setNavbarStyle] = useState('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const calculateThresholds = useMemo(
    () =>
      throttle(() => {
        const navbarHeight = navbarRef.current?.offsetHeight ?? 0;
        const sectionOneTop = sectionOneRef?.current?.offsetTop ?? 0;
        const sectionOneBottom =
          (sectionOneRef?.current?.offsetTop ?? 0) +
          (sectionOneRef?.current?.offsetHeight ?? 0) -
          navbarHeight;
        const sectionTwoTop = (sectionTwoRef?.current?.offsetTop ?? 0) - navbarHeight;
        const sectionTwoBottom = sectionTwoTop + (sectionTwoRef?.current?.offsetHeight ?? 0);

        const handleScroll = () => {
          const divScrollTop = (scrollDivRef?.current?.scrollTop ?? 0) + navbarHeight;

          if (divScrollTop >= sectionOneTop && divScrollTop <= sectionOneBottom) {
            setNavbarStyle('firstSection');
          } else if (divScrollTop >= sectionTwoTop && divScrollTop <= sectionTwoBottom) {
            setNavbarStyle('secondSection');
          } else {
            setNavbarStyle('default');
          }
        };

        scrollDivRef?.current?.addEventListener('scroll', handleScroll);
        return () => scrollDivRef?.current?.removeEventListener('scroll', handleScroll);
      }, 100),
    [scrollDivRef, sectionOneRef, sectionTwoRef],
  );

  useEffect(() => {
    calculateThresholds();
    return () => {
      scrollDivRef?.current?.removeEventListener('scroll', calculateThresholds);
    };
  }, [calculateThresholds, scrollDivRef]);

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
        className="fixed z-20 w-screen p-4 font-blackmud"
        animate={navbarStyle}
        variants={variants}
        initial="firstSection"
        exit="exit"
        role="navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className=" flex flex-row items-center justify-center md:flex-row md:items-center md:justify-between">
            <div className="absolute left-4 md:hidden">
              <button className="z-50 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <></> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            <div
              className={`${isMenuOpen ? 'hidden' : 'hidden'} items-start space-y-4 md:flex md:space-x-4 md:space-y-0 `}
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
              className={`z-50 mr-2 mt-2 text-center  font-blackmud text-3xl md:mr-[12.5rem] ${isMenuOpen ? 'text-primary' : ''}`}
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
                  className="fixed left-0 top-0 z-40 flex h-[26rem] w-full items-center justify-center bg-tertiary shadow backdrop-blur-3xl md:hidden"
                >
                  <div className="absolute left-4 top-4">
                    <button onClick={() => setIsMenuOpen(false)}>
                      <X className={`h-6 w-6 text-primary`} />
                    </button>
                  </div>
                  <div
                    className={`z-50 flex h-full w-full flex-col items-start justify-start space-y-10 px-4 py-16 text-primary`}
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
