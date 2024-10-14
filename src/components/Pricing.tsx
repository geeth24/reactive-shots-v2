'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Categories, Album } from './Types';
// Types for the package descriptions
type PackageDescription = {
  title: string;
};

// Types for the pricing packages
type PricingPackage = {
  title: string;
  description: PackageDescription[];
  price: string;
  bestValue?: boolean;
};

// Types for the data structure holding all packages
type PricingData = {
  [key: string]: PricingPackage[];
};

// Define the categories
enum Category {
  Portraits = 'portraits',
  Events = 'events',
  Cars = 'cars',
}

export type ImageMap = {
  [key: string]: string[]; // This allows any string as a key
};

const pricingData: PricingData = {
  [Category.Portraits]: [
    {
      title: 'Package 1',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: '1 Revision' },
      ],
      price: '$90',
    },
    {
      title: 'Package 2',
      description: [
        { title: '2 Hours Photoshoot' },
        { title: '1 Locations' },
        { title: '2 Revisions' },
      ],
      price: '$180',
    },
    {
      title: 'Custom Package',
      description: [{ title: 'Custom Photoshoot' }],
      price: 'Contact for Pricing',
    },
  ],
  [Category.Events]: [
    {
      title: 'Photos Or Video',
      description: [{ title: 'Only Photos or Video' }, { title: '2 Revisions' }],
      price: '$90/hr',
    },
    {
      title: 'Photo + Video',
      description: [{ title: 'Photos and Video' }, { title: '2 Revisions' }],
      price: '$110/hr',
      bestValue: true,
    },
    {
      title: 'Custom Package',
      description: [{ title: 'Custom Event' }, { title: 'Custom Hours' }],
      price: 'Contact for Pricing',
    },
  ],
  [Category.Cars]: [
    {
      title: 'Photos Only',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: 'Car Only' },
        { title: '1 Revision' },
      ],
      price: '$80',
    },
    {
      title: 'Photo & Video',
      description: [
        { title: '1 Hours Photoshoot' },
        { title: '1 Locations' },
        { title: 'Car + Driver.' },
        { title: '1 Revisions' },
      ],
      price: '$120',
    },
    {
      title: 'Custom Package',
      description: [{ title: 'Custom Photoshoot' }],
      price: 'Contact for Pricing',
    },
  ],
};

const Pricing: React.FC = () => {
  const [images, setImages] = useState<ImageMap>({
    [Category.Portraits]: [],
    [Category.Events]: [],
    [Category.Cars]: [],
  });

  const portaitsDescription =
    'Single, couple, Prom, Graduation, Family, Newborn, Senior, and more.';
  const carsDescription = 'Car and driver';
  const eventsDescription = 'Indian events, Graduation, Birthday, and more.';

  // h1 animation with parallax-like effect
  const h1Variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Paragraph animation that complements the h1
  const pVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

  const imageVariants = {
    offscreen: { opacity: 0, scale: 0.95 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

  const [blurData, setBlurData] = useState<Map<string, string>>(new Map());
  const [loaded, setLoaded] = useState<boolean>(false);
  const getPhotos = async () => {
    const res = await fetch('https://aura-api.reactiveshots.com/api/category-albums');
    const data = await res.json();

    //update images object take 4 random images from each category
    data.forEach((category: Categories) => {
      const data_images = category.album.album_photos;
      const randomImages = data_images
        .sort(() => Math.random() - Math.random())
        .slice(0, 4)
        .map((image: Album) => image.image);
      switch (category.category_name.toLowerCase()) {
        case 'events':
          // images[Category.Events] = randomImages;
          setImages((prev) => ({ ...prev, [Category.Events]: randomImages }));
          setBlurData((prev) => {
            const newMap = new Map(prev);
            randomImages.forEach((image) => {
              const fullImageData = data_images.find((img) => img.image === image);

              if (fullImageData) {
                newMap.set(image, fullImageData.file_metadata.blur_data_url);
              }
            });
            return newMap;
          });

          break;
        case 'portraits':
          // images[Category.Portraits] = randomImages;
          setImages((prev) => ({ ...prev, [Category.Portraits]: randomImages }));
          setBlurData((prev) => {
            const newMap = new Map(prev);
            randomImages.forEach((image) => {
              const fullImageData = data_images.find((img) => img.image === image);

              if (fullImageData) {
                newMap.set(image, fullImageData.file_metadata.blur_data_url);
              }
            });
            return newMap;
          });
          break;
        case 'cars':
          // images[Category.Cars] = randomImages;
          setImages((prev) => ({ ...prev, [Category.Cars]: randomImages }));
          setBlurData((prev) => {
            const newMap = new Map(prev);
            randomImages.forEach((image) => {
              const fullImageData = data_images.find((img) => img.image === image);

              if (fullImageData) {
                newMap.set(image, fullImageData.file_metadata.blur_data_url);
              }
            });
            return newMap;
          });
          break;
      }
    });
    setLoaded(true);
    console.log(images);
  };

  useEffect(() => {
    // get photos on load and refresh every 2 seconds
    getPhotos();
    const interval = setInterval(() => {
      getPhotos();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto flex flex-col items-center justify-start px-4 py-24">
      <motion.h1
        variants={h1Variants}
        initial="initial"
        animate="animate"
        whileInView="onscreen"
        viewport={{ once: true }}
        className="mb-4 font-blackmud text-3xl leading-loose text-primary"
      >
        Pricing
      </motion.h1>
      {Object.keys(pricingData).map((category, index) => {
        //randome the order of images for each category
        images[category] = images[category].sort(() => Math.random() - 0.5);
        return (
          <div key={index} className="flex w-full flex-col space-y-4">
            <motion.h2
              variants={h1Variants}
              initial="initial"
              animate="animate"
              whileInView="onscreen"
              viewport={{ once: true }}
              className="mt-4 font-blackmud text-2xl leading-loose text-primary"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.h2>
            <motion.p
              variants={pVariants}
              initial="initial"
              animate="animate"
              whileInView="onscreen"
              viewport={{ once: true }}
              className="text-primary"
            >
              {category === Category.Portraits && portaitsDescription}
              {category === Category.Cars && carsDescription}
              {category === Category.Events && eventsDescription}
            </motion.p>
            {category === Category.Events && (
              <motion.p
                variants={pVariants}
                initial="initial"
                animate="animate"
                whileInView="onscreen"
                viewport={{ once: true }}
                className="text-primary"
              >
                *Price can vary based on the event time and location.
              </motion.p>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {pricingData[category].map((packageData, pkgIndex) => (
                <Link
                  href={`/lets-talk?category=${
                    category.charAt(0).toUpperCase() + category.slice(1)
                  }&package=${packageData.title}`}
                  key={pkgIndex}
                  className="relative rounded-lg p-0.5"
                >
                  <motion.div
                    initial="offscreen"
                    whileInView="onscreen"
                    viewport={{ once: true }}
                    variants={imageVariants}
                  >
                    <div className="grid grid-cols-2 gap-0.5">
                      {images[category].map((src, index) => (
                        <div
                          key={index}
                          className="pointer-events-none h-full w-full overflow-hidden"
                        >
                          <Image
                            key={index}
                            src={`${loaded ? `${src}` : '/RS-White.png'}`}
                            blurDataURL={`${loaded ? blurData.get(src) : '/RS-White.png'}`}
                            placeholder="blur"
                            alt={src.split('-')[0]}
                            width={500}
                            height={500}
                            className={`aspect-square h-full w-full object-cover ${
                              index === 0 ? 'rounded-tl-lg' : ''
                            } ${index === 1 ? 'rounded-tr-lg' : ''} ${index === 2 ? 'rounded-bl-lg' : ''} ${
                              index === 3 ? 'rounded-br-lg' : ''
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 top-0  rounded-lg bg-black bg-opacity-50" />
                    <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
                      <h3 className="font-blackmud text-xl leading-loose text-tertiary">
                        {packageData.title}
                      </h3>
                      {packageData.description.map((desc, descIndex) => (
                        <p key={descIndex} className="text-tertiary">
                          {desc.title}
                        </p>
                      ))}
                      <h4 className="font-blackmud text-3xl leading-loose text-tertiary">
                        {packageData.price}
                      </h4>
                      {packageData.bestValue && (
                        <p className="text-center text-tertiary">Best Value</p>
                      )}
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pricing;
