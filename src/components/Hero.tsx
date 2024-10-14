'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    const heading = 'Reactive Shots';

    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <motion.div
          className="absolute left-0 top-0 z-[-1] h-full w-full"
          variants={bgVariants}
          initial="initial"
          animate="animate"
        >
          <p className="sr-only">Reactive Shots</p>
          <Image
            src="https://cdn.reactiveshots.com/geeth/website/compressed/ReactiveShots Desk.jpg"
            layout="fill"
            alt=""
            className="object-cover object-center"
          />
        </motion.div>
        <motion.div className="absolute left-0 top-0 z-[-1] h-full w-full bg-gradient-to-b from-black/25 via-primary to-secondary opacity-50" />
        <div className="relative z-10 text-center">
          <motion.h1
            variants={h1Variants}
            initial="initial"
            animate="animate"
            className="font-blackmud text-[12vw] text-tertiary"
          >
            {heading.split('').map((letter, index) => (
              <motion.span
                key={index}
                initial={{ x: -300, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            variants={pVariants}
            initial="initial"
            animate="animate"
            className="font-blackmud text-[3vw] font-light text-tertiary md:text-[2vw]"
          >
            Photography & Videography
          </motion.p>
          <motion.p
            variants={p2Variants}
            initial="initial"
            animate="animate"
            className="font-blackmud text-[4vw] font-light text-tertiary md:text-[3vw]"
          >
            Let&apos;s make your moments unforgettable
          </motion.p>
        </div>
      </div>
    );
}

export default Hero;
