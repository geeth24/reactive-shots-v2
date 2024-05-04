'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import React from 'react';
import { motion } from 'framer-motion';

function Page() {
  const h1Variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navbar />
      {/* <Pricing /> */}
      <div className="flex h-screen snap-start items-center justify-center pt-24">
        <motion.h1
          variants={h1Variants}
          initial="initial"
          animate="animate"
          whileInView="animate"
          viewport={{ once: true }}
          className="font-blackmud text-4xl text-primary"
        >
          Pricing Coming Soon
        </motion.h1>
      </div>
      <hr className="h-0.5 bg-primary" />
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
