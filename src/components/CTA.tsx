import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './button';

function CTA() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const headingVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
    },
  };

  const statsVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.6 },
    },
  };

  return (
    <motion.div
      className="from-primary/5 relative flex min-h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-b to-transparent px-4 py-16"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <motion.div className="mb-8 max-w-4xl space-y-6" variants={headingVariants}>
          <h1 className="font-blackmud text-primary text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
            Let's Create Something
            <span className="text-primary/90 mt-2 block">Extraordinary Together</span>
          </h1>
          <motion.p
            variants={textVariants}
            className="text-primary/80 mx-auto max-w-2xl text-lg font-light tracking-wide md:text-xl"
          >
            From intimate portraits to grand celebrations, we transform moments into timeless
            memories. Your story deserves to be told beautifully.
          </motion.p>
        </motion.div>

        <motion.div
          variants={buttonVariants}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            href="/lets-talk"
            color="primary"
            className="px-8 py-3 text-lg font-medium tracking-wide"
          >
            Start Your Journey
          </Button>
          <Button
            href="/pricing"
            color="white"
            className="px-8 py-3 text-lg font-medium tracking-wide"
          >
            View Packages
          </Button>
        </motion.div>

        <motion.div
          variants={statsVariants}
          className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          <div className="flex flex-col items-center">
            <span className="text-primary text-4xl font-light tracking-tight">25+</span>
            <span className="text-primary/70 mt-1 text-sm font-light tracking-wide">
              Happy Clients
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary text-4xl font-light tracking-tight">50+</span>
            <span className="text-primary/70 mt-1 text-sm font-light tracking-wide">
              Events Captured
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary text-4xl font-light tracking-tight">3+</span>
            <span className="text-primary/70 mt-1 text-sm font-light tracking-wide">
              Years Experience
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-primary text-4xl font-light tracking-tight">24/7</span>
            <span className="text-primary/70 mt-1 text-sm font-light tracking-wide">Support</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CTA;
