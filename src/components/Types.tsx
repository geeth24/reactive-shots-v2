import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PauseCircle, PlayCircle } from 'lucide-react';

// Enum to define categories with a specific order
export enum Category {
  Events = 'events',
  Portraits = 'portraits',
  Cars = 'cars',
  RealEstate = 'real estate',
}

// Define a type for the images object
type ImageMap = {
  [key in Category]: string[];
};

// Array of categories in the desired order
const categoryOrder: Category[] = [
  Category.Events,
  Category.Portraits,
  Category.Cars,
  Category.RealEstate,
];

export type Categories = {
  category_id: number;
  category_name: string;
  album: Albums;
};

type Albums = {
  album_photos: Album[];
};

export type Album = {
  image: string;
  compressed_image: string;
  file_metadata: FileMetadata;
};

export type FileMetadata = {
  blur_data_url: string;
};

// Helper function to format blur data URL properly
const formatBlurDataURL = (blurData: string): string => {
  if (!blurData) return '';
  // If it already starts with data:, return as is
  if (blurData.startsWith('data:')) return blurData;
  // Otherwise, add the proper data URL prefix
  return `data:image/jpeg;base64,${blurData}`;
};

const getDynamicClassNames = (activeCategory: Category, index: number, length: number): string => {
  switch (activeCategory) {
    case Category.Portraits:
      return `${index === 0 ? 'rounded-tl-lg lg:rounded-l-lg' : ''} ${index === length - 1 ? 'rounded-br-lg lg:rounded-r-lg' : ''}
              ${index === 1 ? 'rounded-tr-lg lg:rounded-none' : ''} ${index === 2 ? 'rounded-bl-lg lg:rounded-none' : ''}`;

    case Category.Events:
    case Category.Cars:
      return `${index === 0 ? 'rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg' : ''} ${index === 1 ? 'rounded-tr-none lg:rounded-tr-lg' : ''}
              ${index === 2 ? 'rounded-bl-none lg:rounded-bl-lg' : ''} ${index === 3 ? 'rounded-b-lg lg:rounded-b-none lg:rounded-br-lg' : ''}`;

    case Category.RealEstate:
      return `${index === 0 ? 'rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg' : ''} ${index === 1 ? 'rounded-tr-none lg:rounded-tr-lg' : ''}
              ${index === 2 ? 'rounded-bl-none lg:rounded-bl-lg' : ''} ${index === 3 ? 'rounded-b-lg lg:rounded-b-none lg:rounded-br-lg' : ''}`;

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

// Component
const Types: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Portraits);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [blurData, setBlurData] = useState<Map<string, string>>(new Map());

  const [images, setImages] = useState<ImageMap>({
    [Category.Events]: [
      'Aish-Grad-Party-022.jpg',
      'Shema-010.jpg',
      'Emani 001 (4).jpg',
      'Shema-044.jpg',
    ],
    [Category.Portraits]: [
      'Prom23-TAMS-001.jpg',
      'Hima-40.jpg',
      'Prom23-22.jpg',
      'JT-Edited-217.jpg',
    ],
    [Category.Cars]: ['Jaideep 075.jpg', 'Smaran 139.jpg', 'Jaideep-088.jpg', 'Smaran-158.jpg'],
    [Category.RealEstate]: [
      'Shema-044.jpg',
      'Shema-010.jpg',
      'Emani 001 (4).jpg',
      'Aish-Grad-Party-022.jpg',
    ],
  });

  const handleClick = (newCategory: Category) => {
    if (newCategory !== activeCategory) {
      setDirection(
        categoryOrder.indexOf(newCategory) > categoryOrder.indexOf(activeCategory) ? 1 : -1,
      );
      setActiveCategory(newCategory);
    }
  };

  const getPhotos = useCallback(async () => {
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
        case 'real estate':
          setImages((prev) => ({ ...prev, [Category.RealEstate]: randomImages }));
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
  }, []);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        getPhotos();
        setRefreshCounter((c) => c + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [refreshCounter, isPaused, getPhotos]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.75,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.75,
    }),
  };

  const imageVariants = {
    offscreen: { opacity: 0, scale: 0.95 },
    onscreen: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Grid */}
      <div className="absolute inset-0 p-1">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={`${activeCategory}-${refreshCounter}`}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className={`grid h-full gap-1 ${
              activeCategory === Category.Events ||
              activeCategory === Category.Cars ||
              activeCategory === Category.RealEstate
                ? 'grid-cols-2'
                : 'grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {images[activeCategory].map((src, index) => {
              const dynamicClasses = getDynamicClassNames(
                activeCategory,
                index,
                images[activeCategory].length,
              );

              return (
                <motion.div
                  key={index}
                  className="group relative h-full w-full overflow-hidden"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: true }}
                  variants={imageVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={loaded && src.startsWith('http') ? src : '/RS-White.png'}
                    {...(loaded && blurData.get(src)
                      ? {
                          blurDataURL: formatBlurDataURL(blurData.get(src)!),
                          placeholder: 'blur' as const,
                        }
                      : {})}
                    alt={src.split('-')[0]}
                    width={1920}
                    height={1080}
                    className={`h-full w-full object-cover brightness-90 transition-all duration-500 group-hover:brightness-75 ${dynamicClasses}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 flex min-h-screen flex-col">
        {/* Navigation */}
        <div className="flex flex-1 items-center justify-center">
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20"
            >
              {categoryOrder.map((category, index) => (
                <motion.button
                  key={category}
                  onClick={() => handleClick(category)}
                  className="group relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3
                    className={`font-blackmud text-3xl font-bold tracking-wide whitespace-nowrap transition-all duration-300 sm:text-4xl lg:text-5xl xl:text-6xl ${
                      activeCategory === category
                        ? 'text-white drop-shadow-lg'
                        : 'text-white/60 drop-shadow-md hover:text-white/80'
                    }`}
                    style={{
                      textShadow:
                        activeCategory === category
                          ? '0 4px 20px rgba(0,0,0,0.8)'
                          : '0 2px 10px rgba(0,0,0,0.6)',
                    }}
                  >
                    {category
                      .split(' ')
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </h3>

                  {/* Active indicator */}
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-white shadow-lg"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Controls */}
        <div className="container mx-auto px-6 pb-8 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-16 bg-white/30" />
              <span className="text-sm tracking-wide text-white/70">
                Auto-refresh {isPaused ? 'paused' : 'every 5s'}
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20 hover:text-white"
              onClick={() => setIsPaused(!isPaused)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? <PlayCircle className="h-5 w-5" /> : <PauseCircle className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Types;
