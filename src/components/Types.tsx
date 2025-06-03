import React, { useEffect, useState } from 'react';
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

  // Add initial load effect
  useEffect(() => {
    getPhotos();
  }, []);

  const handleClick = (newCategory: Category) => {
    if (newCategory !== activeCategory) {
      const currentIndex = categoryOrder.indexOf(activeCategory);
      const newIndex = categoryOrder.indexOf(newCategory);
      const newDirection = newIndex > currentIndex ? 1 : -1;
      setDirection(newDirection);
      setActiveCategory(newCategory);
    }
  };

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
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        getPhotos();
        setRefreshCounter((c) => c + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [refreshCounter, isPaused]);

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
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.75,
      transition: { duration: 0.6, ease: 'easeOut' },
    }),
  };

  const imageVariants = {
    offscreen: { opacity: 0, scale: 0.95 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 },
    },
  };

  return (
    <div className="bg-background relative h-screen items-center justify-center overflow-hidden p-1">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={`${activeCategory}-${refreshCounter}`}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className={`grid h-full grid-cols-1 gap-0.5 ${activeCategory === Category.Events || activeCategory === Category.Cars || activeCategory === Category.RealEstate ? 'md:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`}
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
                className="relative h-full w-full overflow-hidden"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true }}
                variants={imageVariants}
              >
                <Image
                  src={`${loaded ? `${src}` : '/RS-White.png'}`}
                  {...(loaded && blurData.get(src)
                    ? {
                        blurDataURL: blurData.get(src),
                        placeholder: 'blur' as const,
                      }
                    : {})}
                  alt={src.split('-')[0]}
                  width={500}
                  height={500}
                  className={`h-full w-full object-cover ${dynamicClasses}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay for Text Visibility */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Category Navigation */}
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div className="flex space-x-8">
          {categoryOrder.map((category) => (
            <button key={category} onClick={() => handleClick(category)} className="relative">
              <h1
                className={`font-blackmud text-3xl transition-colors duration-300 sm:text-4xl md:text-6xl ${
                  activeCategory === category ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {category
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </h1>
              {activeCategory === category && (
                <div className="absolute right-0 -bottom-1 left-0 h-0.5 bg-white" />
              )}
            </button>
          ))}
        </div>

        {/* Play/Pause Button */}
        <button
          className="absolute right-4 bottom-4 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <PlayCircle className="h-6 w-6" /> : <PauseCircle className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
};

export default Types;
