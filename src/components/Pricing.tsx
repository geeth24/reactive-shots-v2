'use client';

import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, type ImageMap, type Categories, type Album } from '@/types/pricing';
import { pricingData } from '@/data/pricingData';
import { Button } from '@/components/button';

const categoryDescriptions = {
  [Category.Portraits]: 'Single, couple, Prom, Graduation, Family, Newborn, Senior, and more.',
  [Category.Cars]: 'Car and driver',
  [Category.Events]: 'Indian events, Graduation, Birthday, and more.',
};

const Pricing: React.FC = () => {
  const [images, setImages] = useState<ImageMap>({
    [Category.Portraits]: [],
    [Category.Events]: [],
    [Category.Cars]: [],
  });
  const [blurData, setBlurData] = useState<Map<string, string>>(new Map());
  const [loaded, setLoaded] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<Category, number>>({
    [Category.Portraits]: 0,
    [Category.Events]: 0,
    [Category.Cars]: 0,
  });

  const getPhotos = useCallback(async () => {
    try {
      const res = await fetch('https://aura-api.reactiveshots.com/api/category-albums');
      const data = await res.json();

      const newImages: ImageMap = {
        [Category.Portraits]: [],
        [Category.Events]: [],
        [Category.Cars]: [],
      };
      const newBlurData = new Map<string, string>();

      data.forEach((category: Categories) => {
        const dataImages = category.album.album_photos;
        const randomImages = dataImages
          .sort(() => Math.random() - Math.random())
          .slice(0, 4)
          .map((image: Album) => image.image);

        const categoryName = category.category_name.toLowerCase() as Category;
        newImages[categoryName] = randomImages;

        randomImages.forEach((image) => {
          const fullImageData = dataImages.find((img) => img.image === image);
          if (fullImageData) {
            newBlurData.set(image, fullImageData.file_metadata.blur_data_url);
          }
        });
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
    }, 30000); // Fetch new images every 30 seconds
    return () => clearInterval(interval);
  }, [getPhotos]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        [Category.Portraits]: (prev[Category.Portraits] + 1) % 4,
        [Category.Events]: (prev[Category.Events] + 1) % 4,
        [Category.Cars]: (prev[Category.Cars] + 1) % 4,
      }));
    }, 5000); // Change displayed image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-blackmud text-primary mb-12 text-center text-4xl"
      >
        Pricing
      </motion.h1>

      {Object.entries(pricingData).map(([category, packages]) => (
        <div key={category} className="mb-16">
          <motion.h2
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="font-blackmud text-primary mb-4 text-3xl"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            className="text-primary mb-6 text-lg"
          >
            {categoryDescriptions[category as Category]}
            {category === Category.Events && (
              <span className="mt-2 block text-sm italic">
                *Price can vary based on the event time and location.
              </span>
            )}
          </motion.p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg, pkgIndex) => (
              <motion.div
                key={pkgIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 * pkgIndex }}
              >
                <div className="h-full rounded-lg shadow">
                  <div className="relative aspect-square">
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
                                currentImageIndex[category as Category]
                              ] || '/placeholder.svg'
                            }
                            blurDataURL={blurData.get(
                              images[category as Category][currentImageIndex[category as Category]],
                            )}
                            placeholder="blur"
                            alt={`${category} image ${currentImageIndex[category as Category] + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 hover:scale-105"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="h-full p-6">
                    <h3 className="font-blackmud text-primary mb-2 text-2xl">{pkg.title}</h3>
                    <ul className="mb-4 space-y-2">
                      {pkg.description.map((desc, descIndex) => (
                        <li key={descIndex} className="text-muted-foreground text-sm">
                          {desc.title}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col items-start justify-between pt-4">
                      <span className="font-blackmud text-primary text-3xl">{pkg.price}</span>
                      <Button color="primary" className="mt-4 w-full">
                        <Link
                          href={`/lets-talk?category=${category}&package=${pkg.title}`}
                          className="inline-block"
                        >
                          Book Now
                        </Link>
                      </Button>
                    </div>
                    {pkg.bestValue && (
                      <span className="mt-2 block text-center text-sm font-semibold text-green-600">
                        Best Value
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Pricing;
