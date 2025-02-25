'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/button';
import { ArrowDown } from 'lucide-react';
function Hero() {
  // Background image variants for parallax-like effect
  const bgVariants = {
    initial: { scale: 1.1, opacity: 0.5 },
    animate: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  // h1 animation with parallax-like effect
  const h1Variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Paragraph animation that complements the h1
  const pVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

  const p2Variants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.5 },
    },
  };

  // Scroll down animation variants
  const scrollDownVariants = {
    initial: { y: -10, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: 0.7,
      },
    },
  };

  // Bouncing arrow animation
  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
      },
    },
  };

  const heading = 'Reactive Shots';

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
      <motion.div
        className="absolute top-0 left-0 z-[-1] h-full w-full"
        variants={bgVariants}
        initial="initial"
        animate="animate"
      >
        <p className="sr-only">Reactive Shots</p>
        <Image
          src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/Jul-24-3.jpg"
          alt=""
          className="object-cover object-center"
          fill
          priority
        />
      </motion.div>
      <motion.div className="via-primary to-secondary absolute top-0 left-0 z-[-1] h-full w-full bg-gradient-to-b from-black/25 opacity-50" />

      <div className="relative z-10 px-4 text-center">
        <motion.h1
          variants={h1Variants}
          initial="initial"
          animate="animate"
          className="font-blackmud text-tertiary mb-2 text-[12vw] md:text-[8vw] lg:text-[6vw]"
        >
          {heading.split('').map((letter, index) => (
            <motion.span
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={pVariants}
          initial="initial"
          animate="animate"
          className="font-blackmud text-tertiary mb-2 text-[3vw] font-light md:text-[2vw]"
        >
          Photography & Videography
        </motion.p>

        <motion.p
          variants={p2Variants}
          initial="initial"
          animate="animate"
          className="font-blackmud text-tertiary mb-6 text-[4vw] font-light md:text-[3vw]"
        >
          Let&apos;s make your moments unforgettable
        </motion.p>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        className="absolute right-0 bottom-8 left-0 flex flex-col items-center"
        variants={scrollDownVariants}
        initial="initial"
        animate="animate"
      >
        <motion.p className="font-blackmud text-tertiary mb-2 text-sm font-light">Scroll Down</motion.p>
        <motion.div variants={arrowVariants} animate="animate" className="text-tertiary">
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Hero;
