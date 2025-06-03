'use client';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/button';
import { ArrowDown, Play, Pause } from 'lucide-react';

// Import types from Types.tsx
type Album = {
  image: string;
  compressed_image: string;
  file_metadata: FileMetadata;
};

type FileMetadata = {
  blur_data_url: string;
};

type Categories = {
  category_id: number;
  category_name: string;
  album: Albums;
};

type Albums = {
  album_photos: Album[];
};

function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [backgroundImages, setBackgroundImages] = useState<Album[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Fetch images from API
  const getBackgroundImages = async () => {
    try {
      const res = await fetch('https://aura-api.reactiveshots.com/api/category-albums');
      const data = await res.json();

      // Collect all images from all categories
      const allImages: Album[] = [];
      data.forEach((category: Categories) => {
        allImages.push(...category.album.album_photos);
      });

      // Shuffle and take 9 random images for the carousel
      const shuffledImages = allImages.sort(() => Math.random() - Math.random()).slice(0, 9);

      // Create static image object for the first image
      const staticImage: Album = {
        image: 'https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_5007.jpg',
        compressed_image:
          'https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_5007.jpg',
        file_metadata: {
          blur_data_url: '',
        },
      };

      // Start with static image, then add API images
      setBackgroundImages([staticImage, ...shuffledImages]);
      setLoaded(true);
    } catch (error) {
      console.error('Failed to fetch background images:', error);
      // Fallback to original static image only
      const staticImage: Album = {
        image: 'https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_5007.jpg',
        compressed_image:
          'https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_5007.jpg',
        file_metadata: {
          blur_data_url: '',
        },
      };
      setBackgroundImages([staticImage]);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getBackgroundImages();
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (!isPlaying || backgroundImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isPlaying, backgroundImages.length]);

  const bgVariants = {
    initial: { scale: 1.2, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 2, ease: 'easeOut' },
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      transition: { duration: 1, ease: 'easeIn' },
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

  const currentImage =
    loaded && backgroundImages.length > 0 ? backgroundImages[currentImageIndex] : null;

  return (
    <motion.div
      className="bg-tertiary relative flex h-screen w-full overflow-hidden"
      style={{ opacity, scale }}
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {loaded && currentImage ? (
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={currentImage.image}
                alt="Reactive Shots Hero"
                className="object-cover object-center"
                fill
                priority={currentImageIndex === 0}
                {...(currentImage.file_metadata?.blur_data_url && {
                  blurDataURL: currentImage.file_metadata.blur_data_url,
                  placeholder: 'blur' as const,
                })}
              />
            </motion.div>
          ) : (
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="from-tertiary/90 via-tertiary/50 absolute inset-0 bg-gradient-to-r to-transparent"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
        />
      </div>

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
          className="font-blackmud text-primary/90 mb-12 max-w-xl text-2xl leading-14 font-light tracking-wide md:text-3xl"
        >
          Capturing Life&apos;s Beautiful Moments Through Photography & Videography
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
        </motion.div>

        {/* Play/Pause Button for Carousel */}
        <motion.button
          variants={ctaVariants}
          className="text-primary/80 hover:text-primary mt-8 flex items-center gap-2 transition-colors"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
          <span className="font-blackmud text-sm font-light tracking-wide">
            {isPlaying ? 'Pause' : 'Play'} Slideshow
          </span>
        </motion.button>

        {/* Image Counter */}
        {loaded && backgroundImages.length > 0 && (
          <motion.div
            variants={ctaVariants}
            className="text-primary/60 mt-2 flex items-center gap-2"
          >
            <span className="font-blackmud text-xs font-light tracking-wide">
              {currentImageIndex + 1} / {backgroundImages.length}
            </span>
            <div className="flex gap-1">
              {backgroundImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-3 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-primary/80' : 'bg-primary/20'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
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
