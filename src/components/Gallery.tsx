'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PauseCircle, PlayCircle, ArrowRight, Camera } from 'lucide-react';
import { Category } from './Types';
import { Button } from '@/components/button';

const categoryOrder: Category[] = [
  Category.Events,
  Category.Portraits,
  Category.Cars,
  Category.RealEstate,
];

type Album = {
  image: string;
  compressed_image: string;
  file_metadata: {
    blur_data_url: string;
  };
};

type ApiResponse = {
  album_name: string;
  slug: string;
  image_count: number;
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

const Gallery: React.FC = () => {
  const [categoryImages, setCategoryImages] = useState<Record<Category, Album[]>>({
    [Category.Events]: [],
    [Category.Portraits]: [],
    [Category.Cars]: [],
    [Category.RealEstate]: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);

  const formatCategoryName = (category: Category): string => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCategorySlug = (category: Category): string => {
    return category.toLowerCase().replace(/\s+/g, '-');
  };

  const getCategoryDescription = (category: Category): string => {
    switch (category) {
      case Category.Events:
        return 'Capturing the energy and emotion of your special celebrations and gatherings.';
      case Category.Portraits:
        return 'Professional portraits that showcase personality and create lasting memories.';
      case Category.Cars:
        return 'Automotive photography that highlights the beauty and power of your vehicle.';
      case Category.RealEstate:
        return 'Stunning property photography that showcases homes and spaces at their best.';
      default:
        return '';
    }
  };

  const getApiEndpoint = (category: Category): string => {
    switch (category) {
      case Category.Events:
        return 'https://aura-api.reactiveshots.com/api/album/geeth/events/?secret=4902d8e1-3623-46c0-9ff6-cf05f142de1d';
      case Category.Portraits:
        return 'https://aura-api.reactiveshots.com/api/album/geeth/portraits/?secret=7cfeafa2-8bf9-4434-a39b-6e17af0f4651';
      case Category.Cars:
        return 'https://aura-api.reactiveshots.com/api/album/geeth/cars/?secret=2087177f-91cf-4f6c-bfb0-e322665edcfd';
      case Category.RealEstate:
        return 'https://aura-api.reactiveshots.com/api/album/geeth/real-estate/?secret=a145f40b-5a72-4ba3-aa9c-174ff0953860';
      default:
        return '';
    }
  };

  const getRandomImages = useCallback(async () => {
    const categories = [Category.Events, Category.Portraits, Category.Cars, Category.RealEstate];
    const newCategoryImages: Record<Category, Album[]> = {
      [Category.Events]: [],
      [Category.Portraits]: [],
      [Category.Cars]: [],
      [Category.RealEstate]: [],
    };

    try {
      const promises = categories.map(async (category) => {
        const response = await fetch(getApiEndpoint(category));
        const data: ApiResponse = await response.json();
        const shuffled = [...data.album_photos].sort(() => Math.random() - 0.5);
        return { category, images: shuffled.slice(0, 4) };
      });

      const results = await Promise.all(promises);
      results.forEach(({ category, images }) => {
        newCategoryImages[category] = images;
      });

      setCategoryImages(newCategoryImages);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    getRandomImages();
  }, [getRandomImages]);

  useEffect(() => {
    if (loaded && !isPaused) {
      const interval = setInterval(() => {
        getRandomImages();
        setRefreshCounter((prev) => prev + 1);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [loaded, isPaused, getRandomImages]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
  };

  const headingVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-black">
      <motion.div
        className="container mx-auto px-4 py-24"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header Section */}
        <motion.div variants={headingVariants} className="mb-16 text-center">
          <div className="mx-auto mb-6 flex w-fit items-center gap-3 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm">
            <Camera className="text-primary size-6" />
            <span className="text-primary font-medium">Our Portfolio</span>
          </div>

          <h1 className="font-blackmud mb-6 text-4xl text-white md:text-5xl lg:text-6xl">
            Gallery
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl">
            Explore our diverse portfolio showcasing moments of joy, beauty, and celebration. Each
            category represents our passion for capturing life&apos;s most precious memories.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div variants={containerVariants} className="mb-12 flex justify-center">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {isPaused ? (
              <>
                <PlayCircle className="size-5" />
                Resume Slideshow
              </>
            ) : (
              <>
                <PauseCircle className="size-5" />
                Pause Slideshow
              </>
            )}
          </button>
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={refreshCounter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6 }}
            className="grid gap-8 md:grid-cols-2"
          >
            {categoryOrder.map((category, index) => {
              const images = categoryImages[category];
              const imageCount = images.length;

              return (
                <motion.div
                  key={category}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Link href={`/gallery/${formatCategorySlug(category)}`} className="block">
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl">
                      {/* Image Grid */}
                      <div className="relative h-80 overflow-hidden">
                        {loaded && images.length > 0 ? (
                          <div className="relative h-full w-full">
                            {/* Main large image */}
                            <div className="absolute top-0 left-0 h-full w-2/3">
                              <Image
                                src={images[0].compressed_image}
                                alt={`${formatCategoryName(category)} 1`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                blurDataURL={formatBlurDataURL(
                                  images[0].file_metadata.blur_data_url,
                                )}
                                placeholder="blur"
                              />
                            </div>

                            {/* Right column with smaller images */}
                            <div className="absolute top-0 right-0 h-full w-1/3">
                              {images.slice(1, 4).map((image, imgIndex) => (
                                <div
                                  key={imgIndex}
                                  className="absolute w-full"
                                  style={{
                                    height: '33.333%',
                                    top: `${imgIndex * 33.333}%`,
                                  }}
                                >
                                  <Image
                                    src={image.compressed_image}
                                    alt={`${formatCategoryName(category)} ${imgIndex + 2}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    blurDataURL={formatBlurDataURL(
                                      image.file_metadata.blur_data_url,
                                    )}
                                    placeholder="blur"
                                  />
                                </div>
                              ))}
                            </div>

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Category badge */}
                            <div className="absolute top-4 left-4">
                              <div className="rounded-full bg-white/90 px-4 py-2 backdrop-blur-sm">
                                <span className="text-sm font-medium text-black">
                                  {formatCategoryName(category)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="flex h-full items-center justify-center bg-white/10">
                            <div className="animate-pulse">
                              <Camera className="size-12 text-white/50" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-blackmud text-2xl text-white">
                            {formatCategoryName(category)}
                          </h3>
                          <ArrowRight className="size-6 text-white/60 transition-colors group-hover:translate-x-1 group-hover:text-white" />
                        </div>

                        <p className="mb-4 leading-relaxed text-white/70">
                          {getCategoryDescription(category)}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">
                            {imageCount > 0 ? `${imageCount}+ photos` : 'Loading...'}
                          </span>
                          <span className="text-primary rounded-full bg-white/10 px-3 py-1 text-sm font-medium">
                            View Gallery
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div variants={containerVariants} className="mt-16 text-center">
          <p className="mb-6 text-lg text-white/70">
            Can&apos;t find what you&apos;re looking for? We&apos;d love to create something custom
            for you.
          </p>
          <Button
            href="/lets-talk"
            color="primary"
            className="px-8 py-4"
          >
            Get In Touch
            <ArrowRight className="size-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gallery;
