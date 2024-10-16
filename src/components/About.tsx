'use client';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

function About() {
  const bgVariants = {
    initial: { scale: 1.1, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  const h1Variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const pVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24">
      <div className="mt-4 grid  w-full gap-4 md:grid-cols-2">
        <motion.div className="flex flex-col justify-center space-y-4">
          <motion.h1
            variants={h1Variants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="font-blackmud text-5xl leading-loose text-primary"
          >
            Capturing your moments that last a lifetime
          </motion.h1>
          <div className="flex flex-col space-y-4">
            <motion.p
              variants={pVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-lg text-primary/75"
            >
              Hello! I&apos;m Geeth—your photographer, videographer, and memory maker behind
              Reactive Shots. Over the past two years, I&apos;ve dedicated myself to mastering the
              art of both photography and videography, specializing in portraits, Indian events, and
              cinematic storytelling.
            </motion.p>
            <motion.p
              variants={pVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-lg text-primary/75"
            >
              At Reactive Shots, every click of the shutter and every second of video footage is an
              opportunity to capture the unique essence and vibrant spirit of my subjects. From the
              subtle intricacies of a professional headshot to the dynamic energy of a family
              celebration, my camera and video equipment are extensions of my vision to bring out
              the best in every moment.
            </motion.p>
            <motion.p
              variants={pVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-lg text-primary/75"
            >
              Whether it&apos;s through still images or motion pictures, I strive to create lasting
              memories that you can relive for years to come.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="relative mt-8 w-full"
          variants={bgVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Image
            src="https://cdn.reactiveshots.com/geeth/website/compressed/Jul-24-1.jpg"
            width={500}
            height={500}
            alt=""
            className="aspect-square h-full w-full rounded-lg object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default About;
