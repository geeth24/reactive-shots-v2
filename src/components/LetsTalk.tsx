'use client';
import { Mail, MessageSquareMore, Phone, MapPin, Clock, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useSearchParams } from 'next/navigation';
import { Categories, Category, Album } from './Types';
import { Button } from './button';

function LetsTalk() {
  const urlSearchParams = useSearchParams();
  const pricingCategory = urlSearchParams.get('category');
  const pricingPackage = urlSearchParams.get('package');

  const [formData, setFormData] = useState({
    name: '',
    subject: `${pricingCategory ? `Inquiry: ${pricingCategory} - ${pricingPackage}` : ''}`,
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

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

  const formVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut', delay: 0.4 },
    },
  };

  const cardVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const [loaded, setLoaded] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);

  const getPhotos = async () => {
    try {
      const res = await fetch('https://aura-api.reactiveshots.com/api/category-albums');
      const data = await res.json();

      const allImages: string[] = [];
      data.forEach((category: Categories) => {
        const dataImages = category.album.album_photos;
        const randomImages = dataImages
          .sort(() => Math.random() - Math.random())
          .slice(0, 2)
          .map((image: Album) => image.image);
        allImages.push(...randomImages);
      });

      setImages(allImages.slice(0, 6));
      setLoaded(true);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (972) 829-5173',
      href: 'tel:+1-972-829-5173',
      description: 'Call or text anytime',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@reactiveshots.com',
      href: 'mailto:info@reactiveshots.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dallas, TX',
      href: '#',
      description: 'Serving DFW area',
    },
    {
      icon: Clock,
      label: 'Availability',
      value: 'Mon - Sun',
      href: '#',
      description: '9 AM - 8 PM',
    },
  ];

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
          <h1 className="font-blackmud mb-4 text-4xl text-white md:text-5xl lg:text-6xl">
            Let&apos;s Create Something Beautiful
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-white/70 md:text-xl">
            Ready to bring your vision to life? Let&apos;s discuss your photography needs and create
            something beautiful together. We&apos;re here to make your special moments
            unforgettable.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Information */}
          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={textVariants}>
              <h2 className="font-blackmud mb-6 text-2xl text-white md:text-3xl">Get In Touch</h2>
              <p className="mb-8 leading-relaxed text-white/70">
                Whether you&apos;re planning a wedding, need professional portraits, or want to
                capture a special event, we&apos;re here to help. Reach out through any of the
                methods below, and we&apos;ll get back to you promptly.
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={contact.label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white/10 p-3">
                      <contact.icon className="text-primary size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 font-medium text-white">{contact.label}</h3>
                      {contact.href !== '#' ? (
                        <Link
                          href={contact.href}
                          className="mb-1 block font-medium text-white/80 transition-colors hover:text-white"
                        >
                          {contact.value}
                        </Link>
                      ) : (
                        <div className="mb-1 font-medium text-white/80">{contact.value}</div>
                      )}
                      <p className="text-sm text-white/60">{contact.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Photo Gallery Preview */}
            {loaded && images.length > 0 && (
              <motion.div variants={containerVariants} className="mt-12">
                <h3 className="font-blackmud mb-6 text-xl text-white">Recent Work</h3>
                <div className="grid grid-cols-3 gap-2 overflow-hidden rounded-xl">
                  {images.slice(0, 6).map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      className="relative aspect-square overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`Recent work ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={formVariants}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h2 className="font-blackmud mb-6 text-2xl text-white md:text-3xl">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:ring-2"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:ring-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-white">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What can we help you with?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:ring-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project, event date, location, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="focus:border-primary focus:ring-primary/20 w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-colors focus:ring-2"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  color="primary"
                  className="group w-full px-8 py-4 text-lg font-semibold"
                  disabled={isSubmitting}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="size-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="size-5 transition-transform group-hover:translate-x-1" />
                        Send Message
                      </>
                    )}
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-white/60">
                  Available Monday - Sunday, 9 AM - 8 PM. We&apos;re always ready to capture your
                  story, whether it&apos;s a last-minute session or a planned celebration.
                  Don&apos;t hesitate to reach out!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default LetsTalk;
