'use client';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
function Page() {
  const router = useRouter();
  const [time, setTime] = useState(3);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    if (time === 0) {
      router.push('/');
    }

    return () => clearInterval(interval);
  }, [time]);
  return (
    <div className="h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navbar />
      <div className="flex h-screen snap-start flex-col items-center justify-center bg-tertiary pt-24 text-primary">
        <motion.h1
          variants={h1Variants}
          initial="initial"
          animate="animate"
          whileInView="animate"
          viewport={{ once: true }}
          className="font-blackmud text-4xl"
        >
          404
        </motion.h1>
        <motion.p
          variants={pVariants}
          initial="initial"
          animate="animate"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-lg"
        >
          Page Not Found - Redirecting in {time} seconds
        </motion.p>
      </div>
      <hr className="h-0.5 bg-primary" />
      <div className="snap-start">
        <Footer />
      </div>
    </div>
  );
}

export default Page;
