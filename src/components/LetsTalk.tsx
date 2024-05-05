'use client';
import { Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
function LetsTalk() {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const imageVariants = {
    offscreen: { opacity: 0, scale: 0.95 },
    onscreen: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
    },
  };

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

  const formVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.6 },
    },
  };

  let images = ['Smaran 139.jpg', 'LM-07.jpg', 'IMG_7076.JPG', 'Shema-044.jpg'];

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (
      formData.name === '' ||
      formData.email === '' ||
      formData.subject === '' ||
      formData.message === ''
    ) {
      return;
    } else {
      setIsSubmitting(true);

      await fetch('https://mailer.geethg.com/reactiveshots/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      setIsSubmitting(false);

      setFormData({
        name: '',
        subject: '',
        email: '',
        message: '',
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24">
      <div className="mt-4 grid w-full gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between space-y-4">
          <div className="flex flex-col justify-end">
            <motion.h2
              variants={h1Variants}
              initial="initial"
              animate="animate"
              whileInView="onscreen"
              viewport={{ once: true }}
              className="font-blackmud text-3xl text-primary"
            >
              Let&apos;s make your moments unforgettable
            </motion.h2>
            <motion.div
              variants={pVariants}
              initial="initial"
              animate="animate"
              whileInView="onscreen"
              viewport={{ once: true }}
              className="mt-8 flex flex-col space-y-4"
            >
              <div className="flex flex-row space-x-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                <Link href="sms:+1-972-829-5173" className="text-primary">
                  +1 (972) 829-5173
                </Link>
              </div>
              <div className="flex flex-row space-x-2">
                <Mail className="h-6 w-6 text-primary" />
                <Link href="mailto:info@reactiveshots.com" className="text-primary">
                  info@reactiveshots.com
                </Link>
              </div>

              <Link href="https://www.instagram.com/reactiveshots/">
                <div className="flex flex-row space-x-2 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram h-6 w-6"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <p className="text-primary">@reactiveshots</p>
                </div>
              </Link>
            </motion.div>
          </div>
          <motion.form
            variants={formVariants}
            initial="initial"
            animate="animate"
            whileInView="onscreen"
            viewport={{ once: true }}
            className="flex flex-col justify-end space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex w-full flex-row gap-2">
                <div className="flex w-full flex-col">
                  <label htmlFor="name" className="text-primary">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-primary/50 p-2 text-base md:text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label htmlFor="email" className="text-primary">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-primary/50 p-2 text-base md:text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
              <label htmlFor="subject" className="text-primary">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="rounded-lg border border-primary/50 p-2 text-base md:text-sm focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <label htmlFor="message" className="text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="h-32 rounded-lg border border-primary/50 p-2 text-base md:text-sm focus:border-primary focus:ring-1 focus:ring-primary lg:h-64"
              />
              <button
                type="submit"
                className="hover:bg-primary-dark focus:ring-primary-dark rounded-lg bg-primary p-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </div>
          </motion.form>
        </div>
        <div className="grid grid-cols-2 gap-0.5">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="pointer-events-none  overflow-hidden"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={imageVariants}
            >
              <Image
                key={index}
                src={`https://cdn.reactiveshots.com/geeth/website/compressed/${src}`}
                alt={src.split('-')[0]}
                width={500}
                height={500}
                className={`aspect-square h-full w-full object-cover ${
                  index === 0 ? 'rounded-tl-lg' : ''
                } ${index === 1 ? 'rounded-tr-lg' : ''} ${index === 2 ? 'rounded-bl-lg' : ''} ${
                  index === 3 ? 'rounded-br-lg' : ''
                }`}             
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LetsTalk;
