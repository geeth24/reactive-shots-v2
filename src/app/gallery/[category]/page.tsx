'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, X } from 'lucide-react';
import { Category } from '../../../components/Types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Album = {
  image: string;
  compressed_image: string;
  file_metadata: {
    blur_data_url: string;
  };
};

type ImageData = {
  src: string;
  compressed_src: string;
  blur_data_url: string;
  width: number;
  height: number;
  aspectRatio: number;
  calculatedWidth?: number;
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

const CategoryGallery: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [photos, setPhotos] = useState<Album[]>([]);
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Album | null>(null);
  const [categoryName, setCategoryName] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  const categorySlug = params.category as string;

  const getCategoryFromSlug = (slug: string): Category | null => {
    switch (slug) {
      case 'events':
        return Category.Events;
      case 'portraits':
        return Category.Portraits;
      case 'cars':
        return Category.Cars;
      case 'real-estate':
        return Category.RealEstate;
      default:
        return null;
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

  const formatCategoryName = (category: Category): string => {
    return category
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getOptimalRowHeight = (containerWidth: number) => {
    return Math.max(300, containerWidth / 4);
  };

  // Update container width when component mounts or resizes
  const updateContainerWidth = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      return width;
    }
    return 0;
  };

  const loadImageData = async (albums: Album[]) => {
    if (albums.length === 0) return;

    try {
      const data = await Promise.all(
        albums.map(
          (album) =>
            new Promise<ImageData>((resolve) => {
              const img = new window.Image();

              const timeout = setTimeout(() => {
                // Fallback if image takes too long to load
                resolve({
                  src: album.image,
                  compressed_src: album.compressed_image,
                  blur_data_url: album.file_metadata.blur_data_url,
                  width: 300,
                  height: 200,
                  aspectRatio: 1.5,
                });
              }, 10000); // 10 second timeout

              img.onload = () => {
                clearTimeout(timeout);
                resolve({
                  src: album.image,
                  compressed_src: album.compressed_image,
                  blur_data_url: album.file_metadata.blur_data_url,
                  width: img.naturalWidth,
                  height: img.naturalHeight,
                  aspectRatio: img.naturalWidth / img.naturalHeight,
                });
              };

              img.onerror = () => {
                clearTimeout(timeout);
                resolve({
                  src: album.image,
                  compressed_src: album.compressed_image,
                  blur_data_url: album.file_metadata.blur_data_url,
                  width: 300,
                  height: 200,
                  aspectRatio: 1.5,
                });
              };

              img.src = album.compressed_image;
            }),
        ),
      );

      setImageData(data);
    } catch (error) {
      console.error('Error loading image data:', error);
    }
  };

  const renderMasonryRows = () => {
    if (containerWidth === 0 || imageData.length === 0) return null;

    const targetHeight = getOptimalRowHeight(containerWidth);
    const gap = 16;

    const rows = [];
    let currentIndex = 0;

    while (currentIndex < imageData.length) {
      const row = [];
      let rowWidth = 0;

      // Calculate how many images fit in this row
      while (currentIndex < imageData.length) {
        const image = imageData[currentIndex];
        const imageWidth = targetHeight * image.aspectRatio;

        if (rowWidth + imageWidth + row.length * gap <= containerWidth) {
          row.push({ ...image, calculatedWidth: imageWidth });
          rowWidth += imageWidth;
          currentIndex++;
        } else {
          break;
        }
      }

      // If no images fit, force at least one but limit its width
      if (row.length === 0 && currentIndex < imageData.length) {
        const image = imageData[currentIndex];
        const maxWidth = Math.min(
          containerWidth * 0.5, // Limit to 50% of container width
          targetHeight * image.aspectRatio,
          500, // Absolute maximum of 500px
        );
        row.push({ ...image, calculatedWidth: maxWidth });
        currentIndex++;
        rowWidth = maxWidth;
      }

      if (row.length > 0) {
        // Scale to fill the row width
        const totalGaps = (row.length - 1) * gap;
        const availableWidth = containerWidth - totalGaps;
        const scaleFactor = availableWidth / rowWidth;

        row.forEach((img) => {
          img.calculatedWidth! *= scaleFactor;
        });

        rows.push(row);
      }
    }

    return rows.map((row, rowIndex) => (
      <motion.div
        key={rowIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
        className="mb-4 flex gap-4"
      >
        {row.map((image, imageIndex) => {
          const originalPhoto = photos.find((p) => p.image === image.src);
          const calculatedHeight = image.calculatedWidth! / image.aspectRatio;

          return (
            <div
              key={imageIndex}
              className="group relative cursor-zoom-in"
              onClick={() => originalPhoto && openModal(originalPhoto)}
              style={{ width: `${image.calculatedWidth}px` }}
            >
              <Image
                src={image.src}
                alt={`Photo ${imageIndex + 1}`}
                width={Math.round(image.calculatedWidth!)}
                height={Math.round(calculatedHeight)}
                className="h-auto w-full transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                  height: `${calculatedHeight}px`,
                }}
                blurDataURL={formatBlurDataURL(image.blur_data_url)}
                placeholder="blur"
              />
            </div>
          );
        })}
      </motion.div>
    ));
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const category = getCategoryFromSlug(categorySlug);
      if (!category) {
        router.push('/gallery');
        return;
      }

      setCategoryName(formatCategoryName(category));

      try {
        const response = await fetch(getApiEndpoint(category));
        const data: ApiResponse = await response.json();
        setPhotos(data.album_photos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [categorySlug, router]);

  // Load image data after photos are fetched and container is ready
  useEffect(() => {
    if (photos.length > 0 && !loading) {
      const width = updateContainerWidth();
      if (width > 0) {
        loadImageData(photos);
      }
    }
  }, [photos, loading]);

  // Handle container width updates
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateContainerWidth();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
      // Initial width calculation
      updateContainerWidth();
    }

    return () => observer.disconnect();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateContainerWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openModal = (photo: Album) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen bg-black pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex items-center gap-4">
              <button
                onClick={() => router.push('/gallery')}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Gallery
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h1 className="font-blackmud text-4xl font-bold text-white md:text-6xl">
                {categoryName || 'Loading...'}
              </h1>
            </motion.div>

            <div ref={containerRef} className="w-full">
              {imageData.length > 0 && containerWidth > 0 && renderMasonryRows()}
            </div>
          </div>
        </div>
        <hr className="bg-primary h-0.5" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen bg-black pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center gap-4">
            <button
              onClick={() => router.push('/gallery')}
              className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Gallery
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="font-blackmud text-4xl font-bold text-white md:text-6xl">
              {categoryName}
            </h1>
            <p className="mt-4 text-lg text-white/80">{photos.length} photos in this collection</p>
          </motion.div>

          <div ref={containerRef} className="w-full">
            {imageData.length > 0 && containerWidth > 0 && renderMasonryRows()}
          </div>
        </div>

        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeModal}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedPhoto.image}
                  alt="Selected photo"
                  width={1920}
                  height={1080}
                  className="h-auto max-h-[90vh] w-auto max-w-full object-contain"
                  blurDataURL={formatBlurDataURL(selectedPhoto.file_metadata.blur_data_url)}
                  placeholder="blur"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <hr className="bg-primary h-0.5" />
      <Footer />
    </div>
  );
};

function Page() {
  return <CategoryGallery />;
}

export default Page;
