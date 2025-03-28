'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/button';
import { ArrowDown, Play, Pause } from 'lucide-react';

function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const bgVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 2, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  const headingVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  const subheadingVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.3 },
    },
  };

  const ctaVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.6 },
    },
  };

  const scrollVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.9 },
    },
  };

  const arrowVariants = {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
      },
    },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="bg-tertiary relative flex h-screen w-full overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        variants={bgVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_5007.jpg"
          alt="Reactive Shots Hero"
          className="object-cover object-center"
          fill
          priority
        />
        <motion.div
          className="from-tertiary/90 via-tertiary/50 absolute inset-0 bg-gradient-to-r to-transparent"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="relative z-20 flex w-full flex-col items-start justify-center px-8 md:w-1/2 md:px-16 lg:px-24"
        variants={contentVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={headingVariants} className="mb-6 space-y-2">
          <h1 className="font-blackmud text-primary text-7xl font-light tracking-tight">
            Reactive Shots
          </h1>
          <div className="bg-primary/80 h-1 w-24" />
        </motion.div>

        <motion.p
          variants={subheadingVariants}
          className="font-blackmud text-primary/90 mb-12 max-w-xl leading-14 text-2xl font-light tracking-wide md:text-3xl"
        >
          Capturing Life&apos;s  Beautiful Moments Through Photography & Videography
        </motion.p>

        <motion.div variants={ctaVariants} className="flex flex-col gap-4 sm:flex-row">
          <Button
            href="/lets-talk"
            color="primary"
            className="group relative overflow-hidden px-8 py-3 text-lg font-medium tracking-wide"
          >
            <span className="relative z-10">Start Your Journey</span>
            <motion.div
              className="bg-primary/20 absolute inset-0"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
          {/* <Button
            href="/portfolio"
            color="white"
            className="group relative overflow-hidden px-8 py-3 text-lg font-medium tracking-wide"
          >
            <span className="relative z-10">View Our Work</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button> */}
        </motion.div>

        {/* Play/Pause Button */}
        <motion.button
          variants={ctaVariants}
          className="text-primary/80 hover:text-primary mt-8 flex items-center gap-2 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
          <span className="font-blackmud text-sm font-light tracking-wide">
            {isPlaying ? 'Pause' : 'Play'} Background
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center md:left-8 md:translate-x-0"
        variants={scrollVariants}
        initial="initial"
        animate="animate"
      >
        <motion.p className="font-blackmud text-primary/80 mb-2 text-sm font-light tracking-wide">
          Scroll to Discover
        </motion.p>
        <motion.div variants={arrowVariants} animate="animate">
          <ArrowDown className="text-primary/80 size-5" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
