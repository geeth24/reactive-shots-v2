'use client';

import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Category, type ImageMap, type Categories, type Album } from '@/types/pricing';
import { pricingData } from '@/data/pricingData';
import { Button } from '@/components/button';
import { Check, Star, Award, DollarSign } from 'lucide-react';

const categoryDescriptions = {
  [Category.Portraits]:
    'Professional portraits for individuals, couples, families, and special occasions.',
  [Category.Cars]: 'Automotive photography showcasing vehicles in their best light.',
  [Category.Events]:
    'Comprehensive event coverage for celebrations, graduations, and special moments.',
  [Category.RealEstate]:
    'Property photography including interior, exterior, aerial, and twilight shots.',
};

// Helper function to format blur data URL properly
const formatBlurDataURL = (blurData: string): string => {
  if (!blurData) return '';
  // If it already starts with data:, return as is
  if (blurData.startsWith('data:')) return blurData;
  // Otherwise, add the proper data URL prefix
  return `data:image/jpeg;base64,${blurData}`;
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
    initial: { y: 30, opacity: 0 },
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
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
    },
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
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
            <DollarSign className="text-primary size-6" />
            <span className="text-primary font-medium">Transparent Pricing</span>
          </div>

          <h1 className="font-blackmud mb-6 text-4xl text-white md:text-5xl lg:text-6xl">
            Pricing Packages
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-white/70 md:text-xl">
            Choose the perfect package for your photography needs. All packages include professional
            editing, high-resolution images, and our commitment to capturing your special moments
            beautifully.
          </p>
        </motion.div>

        {/* Pricing Categories */}
        {Object.entries(pricingData).map(([category, packages], categoryIndex) => (
          <motion.div
            key={category}
            className="mb-20"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            {/* Category Header */}
            <motion.div variants={headingVariants} className="mb-12 text-center">
              <h2 className="font-blackmud mb-4 text-3xl text-white md:text-4xl">
                {category
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-white/70">
                {categoryDescriptions[category as Category]}
              </p>
              {category === Category.Events && (
                <p className="mt-2 text-sm text-white/60 italic">
                  *Pricing may vary based on event duration, location, and specific requirements.
                </p>
              )}
            </motion.div>

            {/* Package Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {packages.map((pkg, pkgIndex) => (
                <motion.div
                  key={pkgIndex}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative"
                  style={{ animationDelay: `${pkgIndex * 0.1}s` }}
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl">
                    {/* Best Value Badge */}
                    {pkg.bestValue && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-primary flex items-center gap-2 rounded-full px-3 py-1 text-white">
                          <Star className="size-4 fill-current" />
                          <span className="text-sm font-medium">Best Value</span>
                        </div>
                      </div>
                    )}

                    {/* Image Section */}
                    <div className="relative aspect-[4/3] overflow-hidden">
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
                                    blurDataURL: formatBlurDataURL(
                                      blurData.get(
                                        images[category as Category][
                                          (currentImageIndex[category as Category] + pkgIndex) % 4
                                        ],
                                      )!,
                                    ),
                                    placeholder: 'blur' as const,
                                  }
                                : {})}
                              alt={`${category} package ${pkg.title}`}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <div className="mb-6">
                        <h3 className="font-blackmud mb-2 text-2xl text-white">{pkg.title}</h3>
                        <div className="font-blackmud text-3xl text-white">{pkg.price}</div>
                      </div>

                      {/* Features List */}
                      <ul className="mb-8 space-y-3">
                        {pkg.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start gap-3 text-white/80">
                            <Check className="text-primary mt-0.5 size-5 flex-shrink-0" />
                            <span>{desc.title}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Button color="primary" className="w-full px-6 py-3 text-lg font-semibold">
                        <Link
                          href={`/lets-talk?category=${category}&package=${pkg.title}`}
                          className="block"
                        >
                          Book This Package
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA Section */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-sm">
            <Award className="text-primary mx-auto mb-6 size-16" />
            <h3 className="font-blackmud mb-4 text-2xl text-white md:text-3xl">
              Need Something Custom?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/70">
              Every project is unique, and we&apos;re happy to create a custom package that fits
              your specific needs and budget. Let&apos;s discuss your vision and create something
              perfect for you.
            </p>
            <Button
              href="/lets-talk"
              color="primary"
              className="px-8 py-4"
            >
              Get Custom Quote
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Pricing;
