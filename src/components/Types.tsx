import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Enum to define categories with a specific order
enum Category {
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

// Component
const Types: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Portraits);
  const [direction, setDirection] = useState<number>(0);

  const images: ImageMap = {
    [Category.Events]: [
      'Aish-Grad-Party-025.jpg',
      'Shema-010.jpg',
      'Emani 001 (4).jpg',
      'Shema-044.jpg',
    ],
    [Category.Portraits]: ['Monish-15.jpg', 'LM-07.jpg', 'IMG_7076.JPG', 'JT-Edited-217.jpg'],
    [Category.Cars]: ['Jaideep 075.jpg', 'Smaran 139.jpg', 'Jaideep-088.jpg', 'Smaran-158.jpg'],
  };

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

  return (
    <div className="relative  h-screen items-center justify-center overflow-hidden bg-background p-1">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={activeCategory}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className={`grid h-full grid-cols-1 gap-0.5 ${activeCategory === Category.Events ? 'md:grid-cols-2' : `${activeCategory === Category.Cars ? 'md:grid-cols-2' : 'grid-cols-2 lg:grid-cols-4'}`} `}
        >
          {images[activeCategory].map((src, index) => (
            <motion.div
              key={index}
              className="pointer-events-none h-full w-full overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={imageVariants}
            >
              <Image
                src={`https://cdn.reactiveshots.com/geeth/website/compressed/${src}`}
                alt={src.split('-')[0]}
                width={500}
                height={500}
                className={`aspect-auto h-full w-full  object-cover ${activeCategory === Category.Portraits ? `${index === 0 ? 'rounded-l-lg' : ''} ${index === images[activeCategory].length - 1 ? 'rounded-r-lg' : ''}` : `${activeCategory === Category.Events ? `${index === 0 ? 'rounded-tl-lg' : ''} ${index === 1 ? 'rounded-tr-lg' : ''} ${index === 2 ? 'rounded-bl-lg' : ''} ${index === 3 ? 'rounded-br-lg' : ''}` : `${activeCategory === Category.Cars ? `${index === 0 ? 'rounded-tl-lg' : ''} ${index === 1 ? 'rounded-tr-lg' : ''} ${index === 2 ? 'rounded-bl-lg' : ''} ${index === 3 ? 'rounded-br-lg' : ''}` : ''}`}`}`}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={imageVariants}
        className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-25"
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
      </motion.div>
    </div>
  );
};

export default Types;