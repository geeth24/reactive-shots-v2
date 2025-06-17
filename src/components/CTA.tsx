import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

function CTA() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const contentVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <motion.div
      className="bg-black py-24"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <motion.div className="mx-auto max-w-4xl text-center" variants={contentVariants}>
          {/* Main Content */}
          <h2 className="font-blackmud mb-6 text-4xl text-white md:text-5xl lg:text-6xl">
            Ready to Capture Your Story?
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-white/70 md:text-xl">
            Let&apos;s create something beautiful together. From intimate moments to grand
            celebrations, we&apos;re here to tell your story through stunning photography.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/lets-talk"
              className="bg-primary hover:bg-primary/90 group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white transition-colors"
            >
              Get Started
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/gallery"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              View Our Work
            </Link>
          </div>

          {/* Simple Stats */}
          <div className="mt-16 flex justify-center gap-8 text-center sm:gap-12">
            <div>
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/60">Photos Captured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-sm text-white/60">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4+</div>
              <div className="text-sm text-white/60">Years Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CTA;
