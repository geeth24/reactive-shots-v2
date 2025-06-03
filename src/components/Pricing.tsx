'use client';

import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, type ImageMap, type Categories, type Album } from '@/types/pricing';
import { pricingData } from '@/data/pricingData';
import { Button } from '@/components/button';
import { Check } from 'lucide-react';

const categoryDescriptions = {
  [Category.Portraits]: 'Single, couple, Prom, Graduation, Family, Newborn, Senior, and more.',
  [Category.Cars]: 'Car and driver',
  [Category.Events]: 'Indian events, Graduation, Birthday, and more.',
  [Category.RealEstate]: 'Interior, exterior, aerial, and twilight property photography.',
};

const Pricing: React.FC = () => {
  const [images, setImages] = useState<ImageMap>({
    [Category.Portraits]: [],
    [Category.Events]: [],
    [Category.Cars]: [],
    [Category.RealEstate]: [],
  });
  const [blurData, setBlurData] = useState<Map<string, string>>(new Map());
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<Category, number>>({
    [Category.Portraits]: 0,
    [Category.Events]: 0,
    [Category.Cars]: 0,
    [Category.RealEstate]: 0,
  });

  const getPhotos = useCallback(async () => {
    try {
      const res = await fetch('https://aura-api.reactiveshots.com/api/category-albums');
      const data = await res.json();

      const newImages: ImageMap = {
        [Category.Portraits]: [],
        [Category.Events]: [],
        [Category.Cars]: [],
        [Category.RealEstate]: [],
      };
      const newBlurData = new Map<string, string>();

      data.forEach((category: Categories) => {
        const dataImages = category.album.album_photos;
        const randomImages = dataImages
          .sort(() => Math.random() - Math.random())
          .slice(0, 4)
          .map((image: Album) => image.image);

        const categoryName = category.category_name.toLowerCase() as Category;
        if (categoryName in newImages) {
          newImages[categoryName] = randomImages;

          randomImages.forEach((image) => {
            const fullImageData = dataImages.find((img) => img.image === image);
            if (fullImageData) {
              newBlurData.set(image, fullImageData.file_metadata.blur_data_url);
            }
          });
        }
      });

      setImages(newImages);
      setBlurData(newBlurData);
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }, []);

  useEffect(() => {
    getPhotos();
    const interval = setInterval(() => {
      getPhotos();
    }, 30000);
    return () => clearInterval(interval);
  }, [getPhotos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        [Category.Portraits]: (prev[Category.Portraits] + 1) % 4,
        [Category.Events]: (prev[Category.Events] + 1) % 4,
        [Category.Cars]: (prev[Category.Cars] + 1) % 4,
        [Category.RealEstate]: (prev[Category.RealEstate] + 1) % 4,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-24"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.h1
        variants={headingVariants}
        className="font-blackmud text-primary mb-12 text-center text-4xl font-light tracking-tight md:text-5xl"
      >
        Pricing
      </motion.h1>

      {Object.entries(pricingData).map(([category, packages], categoryIndex) => (
        <motion.div
          key={category}
          className="mb-24"
          variants={containerVariants}
          transition={{ delay: categoryIndex * 0.2 }}
        >
          <motion.h2
            variants={headingVariants}
            className="font-blackmud text-primary mb-4 text-3xl font-light tracking-tight md:text-4xl"
          >
            {category
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="text-primary/80 mb-8 text-lg font-light tracking-wide"
          >
            {categoryDescriptions[category as Category]}
            {category === Category.Events && (
              <span className="text-primary/60 mt-2 block text-sm italic">
                *Price can vary based on the event time and location.
              </span>
            )}
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, pkgIndex) => (
              <motion.div
                key={pkgIndex}
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: pkgIndex * 0.1 }}
              >
                <div className="group h-full overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl">
                  <div className="relative aspect-square overflow-hidden">
                    <AnimatePresence mode="wait">
                      {loaded && (
                        <motion.div
                          key={currentImageIndex[category as Category]}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={
                              images[category as Category][
                                (currentImageIndex[category as Category] + pkgIndex) % 4
                              ] || '/RS-Logo.png'
                            }
                            {...(blurData.get(
                              images[category as Category][
                                (currentImageIndex[category as Category] + pkgIndex) % 4
                              ],
                            )
                              ? {
                                  blurDataURL: blurData.get(
                                    images[category as Category][
                                      (currentImageIndex[category as Category] + pkgIndex) % 4
                                    ],
                                  ),
                                  placeholder: 'blur' as const,
                                }
                              : {})}
                            alt={`${category} image ${((currentImageIndex[category as Category] + pkgIndex) % 4) + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="h-full p-8">
                    <h3 className="font-blackmud text-primary mb-4 text-2xl font-light tracking-tight">
                      {pkg.title}
                    </h3>
                    <ul className="mb-6 space-y-3">
                      {pkg.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="text-primary/80 flex items-center gap-2 text-sm font-light tracking-wide"
                        >
                          <Check className="text-primary size-4" />
                          {desc.title}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col items-start justify-between pt-4">
                      <span className="font-blackmud text-primary text-3xl font-light tracking-tight">
                        {pkg.price}
                      </span>
                      <Button
                        color="primary"
                        className="mt-6 w-full px-8 py-3 text-lg font-medium tracking-wide"
                      >
                        <Link
                          href={`/lets-talk?category=${category}&package=${pkg.title}`}
                          className="inline-block"
                        >
                          Book Now
                        </Link>
                      </Button>
                    </div>
                    {pkg.bestValue && (
                      <span className="mt-4 block text-center text-sm font-medium text-green-600">
                        Best Value
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Pricing;
