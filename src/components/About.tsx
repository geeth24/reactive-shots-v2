'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Video } from 'lucide-react';

function About() {
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
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="container mx-auto flex flex-col items-center justify-center px-4 py-24"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="mt-4 grid w-full gap-12 md:grid-cols-2">
        <motion.div className="flex flex-col justify-center space-y-6">
          <motion.div variants={headingVariants} className="flex items-center gap-4">
            <motion.div variants={iconVariants}>
              <Camera className="text-primary size-8" />
            </motion.div>
            <motion.div variants={iconVariants}>
              <Video className="text-primary size-8" />
            </motion.div>
          </motion.div>
          <motion.h1
            variants={headingVariants}
            className="font-blackmud text-primary text-4xl leading-tight font-light tracking-tight md:text-5xl"
          >
            Capturing your moments that last a lifetime
          </motion.h1>
          <div className="flex flex-col space-y-6">
            <motion.p
              variants={textVariants}
              className="text-primary/80 text-lg leading-relaxed font-light tracking-wide"
            >
              Hello! I&apos;m Geeth—your photographer, videographer, and memory maker behind
              Reactive Shots. Over the past two years, I&apos;ve dedicated myself to mastering the
              art of both photography and videography, specializing in portraits, Indian events, and
              cinematic storytelling.
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-primary/80 text-lg leading-relaxed font-light tracking-wide"
            >
              At Reactive Shots, every click of the shutter and every second of video footage is an
              opportunity to capture the unique essence and vibrant spirit of my subjects. From the
              subtle intricacies of a professional headshot to the dynamic energy of a family
              celebration, my camera and video equipment are extensions of my vision to bring out
              the best in every moment.
            </motion.p>
            <motion.p
              variants={textVariants}
              className="text-primary/80 text-lg leading-relaxed font-light tracking-wide"
            >
              Whether it&apos;s through still images or motion pictures, I strive to create lasting
              memories that you can relive for years to come.
            </motion.p>
          </div>
        </motion.div>
        <motion.div className="relative mt-8 w-full" variants={imageVariants}>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/Jul-24-V2.jpg"
              fill
              alt="Geeth, the photographer and videographer"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div className="mt-24 w-full" variants={containerVariants}>
        <motion.h2
          variants={headingVariants}
          className="font-blackmud text-primary mb-12 text-3xl font-light tracking-tight md:text-4xl"
        >
          Meet Our Team
        </motion.h2>
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <motion.div
            className="relative aspect-square w-full overflow-hidden rounded-2xl md:w-1/3"
            variants={imageVariants}
          >
            <Image
              src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_2597.jpeg"
              fill
              alt="Kevin, the intern"
              className="object-cover"
            />
          </motion.div>
          <motion.div className="space-y-6 md:w-2/3" variants={containerVariants}>
            <motion.h3
              variants={headingVariants}
              className="font-blackmud text-primary text-2xl font-light tracking-tight md:text-3xl"
            >
              Kevin - Intern Extraordinaire
            </motion.h3>
            <motion.p
              variants={textVariants}
              className="text-primary/80 text-lg leading-relaxed font-light tracking-wide"
            >
              Meet Kevin, our talented intern and my brother! Kevin is passionate about photography
              and is learning the ropes of the trade. With a keen eye for detail and a natural flair
              for creativity, Kevin is quickly becoming an integral part of our team. He assists in
              various aspects of our projects, from setting up equipment to post-processing, always
              eager to learn and contribute to capturing those perfect moments. Having Kevin as a
              second shooter means you&apos;ll receive even more amazing photos to cherish, as he
              captures unique angles and candid moments that might otherwise be missed.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default About;
