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

// Helper function to format blur data URL properly
const formatBlurDataURL = (blurData: string): string => {
  if (!blurData) return '';
  // If it already starts with data:, return as is
  if (blurData.startsWith('data:')) return blurData;
  // Otherwise, add the proper data URL prefix
  return `data:image/jpeg;base64,${blurData}`;
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
      className="relative flex h-screen w-full overflow-hidden bg-black"
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
                className="object-cover object-center brightness-75"
                fill
                priority={currentImageIndex === 0}
                {...(currentImage.file_metadata?.blur_data_url && {
                  blurDataURL: formatBlurDataURL(currentImage.file_metadata.blur_data_url),
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
                className="object-cover object-center brightness-75"
                fill
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          variants={overlayVariants}
          initial="initial"
          animate="animate"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex min-h-screen w-full items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-20">
            {/* Left Column - Main Content */}
            <motion.div
              className="flex flex-col justify-center space-y-6 pt-16 sm:pt-0 sm:space-y-8"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              {/* Badge */}
              <motion.div
                variants={headingVariants}
                className="border-primary/30 bg-primary/10 inline-flex w-fit items-center rounded-full border px-3 py-2 backdrop-blur-sm sm:px-4"
              >
                <span className="text-primary text-xs font-medium tracking-wide sm:text-sm">
                  Professional Photography & Videography
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={headingVariants} className="space-y-3 sm:space-y-4">
                <h1 className="font-blackmud text-primary text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Reactive Shots
                </h1>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary h-1 w-12 rounded-full sm:w-16" />
                  <span className="text-primary/80 text-base sm:text-lg">Est. 2024</span>
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                variants={subheadingVariants}
                className="text-primary/90 max-w-xl text-lg leading-relaxed sm:text-xl md:text-2xl"
              >
                Capturing Life&apos;s Beautiful Moments Through Photography & Videography
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={ctaVariants}
                className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:gap-6"
              >
                <Button
                  href="/lets-talk"
                  color="primary"
                  className="group relative overflow-hidden px-6 py-3 text-base font-semibold tracking-wide sm:px-8 sm:py-4 sm:text-lg"
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <motion.div
                    className="bg-primary/20 absolute inset-0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>

                <Button
                  href="/gallery"
                  outline
                  className="border-primary/40 text-primary hover:bg-primary/10 px-6 py-3 text-base font-semibold tracking-wide backdrop-blur-sm sm:px-8 sm:py-4 sm:text-lg"
                >
                  View Gallery
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Column - Stats & Controls */}
            <motion.div
              className="flex flex-col justify-center space-y-6 sm:space-y-8 lg:items-end"
              variants={contentVariants}
              initial="initial"
              animate="animate"
            >
              {/* Stats */}
              <motion.div variants={ctaVariants} className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center lg:text-right">
                  <div className="text-primary text-2xl font-bold sm:text-3xl">500+</div>
                  <div className="text-primary/70 text-xs sm:text-sm">Projects</div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-primary text-2xl font-bold sm:text-3xl">50+</div>
                  <div className="text-primary/70 text-xs sm:text-sm">Happy Clients</div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="text-primary text-2xl font-bold sm:text-3xl">4+</div>
                  <div className="text-primary/70 text-xs sm:text-sm">Years Experience</div>
                </div>
              </motion.div>

              {/* Slideshow Controls */}
              <motion.div variants={ctaVariants} className="flex flex-col space-y-3 sm:space-y-4 lg:items-end">
                {/* Play/Pause Button */}
                <button
                  className="text-primary/80 hover:text-primary flex items-center gap-2 sm:gap-3 transition-colors lg:justify-end"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <div className="border-primary/40 hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors sm:h-10 sm:w-10">
                    {isPlaying ? <Pause className="h-3 w-3 sm:h-4 sm:w-4" /> : <Play className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </div>
                  <span className="text-xs font-medium tracking-wide sm:text-sm">
                    {isPlaying ? 'Pause' : 'Play'} Slideshow
                  </span>
                </button>

                {/* Image Counter & Progress */}
                {loaded && backgroundImages.length > 0 && (
                  <div className="flex flex-col space-y-2 sm:space-y-3 lg:items-end">
                    <span className="text-primary/70 text-xs tracking-wide sm:text-sm">
                      {currentImageIndex + 1} of {backgroundImages.length}
                    </span>
                    <div className="flex gap-1">
                      {backgroundImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-1 w-6 rounded-full transition-all duration-300 sm:w-8 ${
                            index === currentImageIndex
                              ? 'bg-primary w-8 sm:w-12'
                              : 'bg-primary/30 hover:bg-primary/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center sm:bottom-8"
        variants={scrollVariants}
        initial="initial"
        animate="animate"
      >
        <motion.p className="text-primary/80 mb-2 text-xs tracking-wide sm:mb-3 sm:text-sm">
          Scroll to Discover
        </motion.p>
        <motion.div
          variants={arrowVariants}
          animate="animate"
          className="border-primary/40 hover:bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-colors sm:h-10 sm:w-10"
        >
          <ArrowDown className="text-primary/80 h-3 w-3 sm:h-4 sm:w-4" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
