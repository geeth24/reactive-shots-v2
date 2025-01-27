import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PauseCircle, PlayCircle } from 'lucide-react';

// Enum to define categories with a specific order
export enum Category {
  Events = 'events',
  Portraits = 'portraits',
  Cars = 'cars',
}

// Define a type for the images object
type ImageMap = {
  [key in Category]: string[];
};

// Array of categories in the desired order
const categoryOrder: Category[] = [Category.Events, Category.Portraits, Category.Cars];

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

const getDynamicClassNames = (activeCategory: Category, index: number, length: number): string => {
  switch (activeCategory) {
    case Category.Portraits:
      return `${index === 0 ? 'rounded-tl-lg lg:rounded-l-lg' : ''} ${index === length - 1 ? 'rounded-br-lg lg:rounded-r-lg' : ''}
              ${index === 1 ? 'rounded-tr-lg lg:rounded-none' : ''} ${index === 2 ? 'rounded-bl-lg lg:rounded-none' : ''}`;

    case Category.Events:
    case Category.Cars:
      return `${index === 0 ? 'rounded-t-lg lg:rounded-t-none lg:rounded-tl-lg' : ''} ${index === 1 ? 'rounded-tr-none lg:rounded-tr-lg' : ''}
              ${index === 2 ? 'rounded-bl-none lg:rounded-bl-lg' : ''} ${index === 3 ? 'rounded-b-lg lg:rounded-b-none lg:rounded-br-lg' : ''}`;

    default:
      return '';
  }
};

// Component
const Types: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Portraits);
  const [direction, setDirection] = useState<number>(0);

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
  });

  // Animation variants to slide images based on direction
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
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.75,
      transition: { duration: 0.5, ease: 'easeInOut' },
    }),
  };

  // Calculate slide direction based on the current and new category
  const handleClick = (newCategory: Category) => {
    if (newCategory !== activeCategory) {
      const currentIndex = categoryOrder.indexOf(activeCategory);
      const newIndex = categoryOrder.indexOf(newCategory);
      const newDirection = newIndex > currentIndex ? 1 : -1;
      setDirection(newDirection); // Update the direction
      setActiveCategory(newCategory); // Update the active category
    }
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
  const [isPaused, setIsPaused] = useState<boolean>(false);
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
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        getPhotos();
        setRefreshCounter((c) => c + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [refreshCounter, isPaused]);
  return (
    <div className="relative  h-screen items-center justify-center overflow-hidden bg-background p-1">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={`${activeCategory}-${refreshCounter}`}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className={`grid h-full grid-cols-1 gap-0.5 ${activeCategory === Category.Events ? 'md:grid-cols-2' : `${activeCategory === Category.Cars ? 'md:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`} `}
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
                className="pointer-events-none h-full w-full overflow-hidden"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={imageVariants}
              >
                <Image
                  src={`${loaded ? `${src}` : '/RS-White.png'}`}
                  blurDataURL={`${loaded ? blurData.get(src) : '/RS-White.png'}`}
                  placeholder="blur"
                  alt={src.split('-')[0]}
                  width={500}
                  height={500}
                  className={`aspect-auto h-full w-full  object-cover ${
                    dynamicClasses ? dynamicClasses : ''
                  }`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={imageVariants}
        className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/25"
      />
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={imageVariants}
        className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center"
      >
        <div className="flex space-x-4">
          {categoryOrder.map((category) => (
            <button key={category} className={``} onClick={() => handleClick(category)}>
              <h1
                className={`font-blackmud text-3xl sm:text-4xl md:text-6xl ${activeCategory === category ? 'text-tertiary' : 'text-tertiary/50'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h1>
            </button>
          ))}
        </div>
        <div className="absolute bottom-0  right-0 flex items-center justify-center space-x-4 p-4">
          <button
            className="rounded-lg bg-tertiary p-2 text-primary"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <PlayCircle className="h-6 w-6" /> : <PauseCircle className="h-6 w-6" />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Types;
