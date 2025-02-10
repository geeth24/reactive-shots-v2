'use client';
import Image from 'next/image';
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
      <div className="mt-4 grid w-full gap-8 md:grid-cols-2">
        <motion.div className="flex flex-col justify-center space-y-4">
          <motion.h1
            variants={h1Variants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="font-blackmud text-primary text-5xl leading-loose"
          >
            Capturing your moments that last a lifetime
          </motion.h1>
          <div className="flex flex-col space-y-4">
            <motion.p
              variants={pVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-primary/75 text-lg"
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
              className="text-primary/75 text-lg"
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
              className="text-primary/75 text-lg"
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
            src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/Jul-24-1.jpg"
            width={500}
            height={500}
            alt="Geeth, the photographer and videographer"
            className="aspect-square h-full w-full rounded-lg object-cover"
          />
        </motion.div>
      </div>

      {/* New section for Kevin */}
      <motion.div
        className="mt-16 w-full"
        variants={bgVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <h2 className="font-blackmud text-primary mb-8 text-3xl">Meet Our Team</h2>
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <Image
            src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_2597.jpeg"
            width={300}
            height={300}
            alt="Kevin, the intern"
            className="aspect-square w-full rounded-lg object-cover md:w-1/3"
          />
          <div className="md:w-2/3">
            <h3 className="font-blackmud text-primary mb-4 text-2xl">
              Kevin - Intern Extraordinaire
            </h3>
            <motion.p
              variants={pVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-primary/75 text-lg"
            >
              Meet Kevin, our talented intern and my brother! Kevin is passionate about photography
              and is learning the ropes of the trade. With a keen eye for detail and a natural flair
              for creativity, Kevin is quickly becoming an integral part of our team. He assists in
              various aspects of our projects, from setting up equipment to post-processing, always
              eager to learn and contribute to capturing those perfect moments. Having Kevin as a
              second shooter means you&apos;ll receive even more amazing photos to cherish, as he
              captures unique angles and candid moments that might otherwise be missed.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
