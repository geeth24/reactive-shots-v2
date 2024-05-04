'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  Cars = 'cars',
  Events = 'events',
}

const pricingData: PricingData = {
  [Category.Portraits]: [
    {
      title: 'Package 1',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: '30 Edited Images' },
        { title: '1 Revision' },
      ],
      price: '$100',
    },
    {
      title: 'Package 3',
      description: [
        { title: '3 Hours Photoshoot' },
        { title: '2 Locations' },
        { title: '60 Edited Images' },
        { title: '2 Revisions' },
      ],
      price: '$350',
    },
  ],
  [Category.Cars]: [
    {
      title: 'Package 1',
      description: [
        { title: '1 Hour Photoshoot' },
        { title: '1 Location' },
        { title: '20 Edited Images' },
        { title: '1 Revision' },
      ],
      price: '$150',
    },
  ],
  [Category.Events]: [
    {
      title: 'Package 2',
      description: [
        { title: 'Min 3 Hours Event/Party' },
        { title: 'ONLY Event/Party' },
        { title: 'Unlimited Images' },
        { title: '2 Revisions' },
      ],
      price: '$80/hr',
      bestValue: true,
    },
  ],
};

const Pricing: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.Portraits);
  const [direction, setDirection] = useState(0);

  const categoryOrder: Category[] = [Category.Portraits, Category.Cars, Category.Events];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    }),
  };

  const handleClick = (newCategory: Category) => {
    const currentIndex = categoryOrder.indexOf(activeCategory);
    const newIndex = categoryOrder.indexOf(newCategory);
    if (newIndex > currentIndex) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setActiveCategory(newCategory);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8 pt-24">
      <h1 className="mb-4 font-blackmud text-3xl text-primary">Pricing</h1>
      <div className="mb-4 mt-4 flex">
        {categoryOrder.map((category) => (
          <button
            key={category}
            onClick={() => handleClick(category)}
            className={`font-blackmud text-xl ${activeCategory === category ? 'text-primary' : 'text-primary/50'} mr-4`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={activeCategory}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          custom={direction}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {pricingData[activeCategory].map((pkg, index) => (
            <motion.div
              key={index}
              className={`h-full rounded-lg border border-primary p-4 ${
                pkg.bestValue ? 'border-4 border-primary' : ''
              }`}
            >
              <h2 className="mb-2 text-xl font-semibold">{pkg.title}</h2>
              <ul>
                {pkg.description.map((desc, idx) => (
                  <li key={idx}>{desc.title}</li>
                ))}
              </ul>
              <p className="mt-2 text-lg">{pkg.price}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Pricing;
