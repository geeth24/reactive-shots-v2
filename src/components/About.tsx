'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Video, Award, Users, Clock, Star } from 'lucide-react';

function About() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
    },
  };

  const headingVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const imageVariants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
    },
  };

  const cardVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  const stats = [
    { icon: Camera, label: 'Photos Captured', value: '10,000+' },
    { icon: Users, label: 'Happy Clients', value: '200+' },
    { icon: Clock, label: 'Years Experience', value: '2+' },
    { icon: Star, label: 'Client Rating', value: '5.0' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <motion.div
        className="container mx-auto px-4 py-24"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Column */}
          <motion.div className="flex flex-col justify-center space-y-8">
            <motion.div variants={headingVariants} className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                <Camera className="text-primary size-5" />
                <Video className="text-primary size-5" />
                <span className="text-primary text-sm font-medium">Photography & Videography</span>
              </div>
            </motion.div>

            <motion.h1
              variants={headingVariants}
              className="font-blackmud text-4xl leading-tight text-white md:text-5xl lg:text-6xl"
            >
              Capturing Life&apos;s Most Beautiful Moments
            </motion.h1>

            <motion.p
              variants={textVariants}
              className="text-lg leading-relaxed text-white/80 md:text-xl"
            >
              We&apos;re passionate photographers dedicated to capturing life&apos;s most precious
              moments. With years of experience and an eye for detail, we transform ordinary moments
              into extraordinary memories that you&apos;ll treasure forever.
            </motion.p>

            <motion.p variants={textVariants} className="leading-relaxed text-white/70">
              At Reactive Shots, every click of the shutter and every second of video footage is an
              opportunity to capture the unique essence and vibrant spirit of my subjects. From the
              subtle intricacies of a professional headshot to the dynamic energy of a family
              celebration, my camera and video equipment are extensions of my vision to bring out
              the best in every moment.
            </motion.p>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 pt-8 md:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={cardVariants}
                  whileHover="hover"
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="text-primary mx-auto mb-2 size-6" />
                  <div className="font-blackmud text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div className="relative" variants={imageVariants}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/Jul-24-V2.jpg"
                fill
                alt="Geeth, the photographer and videographer"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -right-6 -bottom-6 rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="text-center">
                <Award className="text-primary mx-auto mb-2 size-8" />
                <div className="font-blackmud text-primary text-lg">Professional</div>
                <div className="text-primary/60 text-sm">Photographer</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="bg-white/5 py-24 backdrop-blur-sm"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div variants={headingVariants} className="mb-16 text-center">
            <h2 className="font-blackmud mb-4 text-3xl text-white md:text-4xl lg:text-5xl">
              Meet Our Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-white/70">
              Behind every great shot is a passionate team dedicated to capturing your perfect
              moments
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Kevin's Image */}
            <motion.div className="relative" variants={imageVariants}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="https://aura-cdn.reactiveshots.com/fit-in/1920x0/geeth/website/IMG_2597.jpeg"
                  fill
                  alt="Kevin, the intern"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl"
              >
                <div className="text-center">
                  <Users className="text-primary mx-auto mb-2 size-8" />
                  <div className="font-blackmud text-primary text-lg">Team</div>
                  <div className="text-primary/60 text-sm">Member</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Kevin's Content */}
            <motion.div
              className="flex flex-col justify-center space-y-6"
              variants={containerVariants}
            >
              <motion.h3
                variants={headingVariants}
                className="font-blackmud text-3xl text-white md:text-4xl"
              >
                Kevin - Intern Extraordinaire
              </motion.h3>

              <motion.p variants={textVariants} className="text-lg leading-relaxed text-white/80">
                Meet Kevin, our talented intern and my brother! Kevin is passionate about
                photography and is learning the ropes of the trade. With a keen eye for detail and a
                natural flair for creativity, Kevin is quickly becoming an integral part of our
                team.
              </motion.p>

              <motion.p variants={textVariants} className="leading-relaxed text-white/70">
                He assists in various aspects of our projects, from setting up equipment to
                post-processing, always eager to learn and contribute to capturing those perfect
                moments. Having Kevin as a second shooter means you&apos;ll receive even more
                amazing photos to cherish, as he captures unique angles and candid moments that
                might otherwise be missed.
              </motion.p>

              {/* Kevin's Skills */}
              <motion.div variants={containerVariants} className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { skill: 'Second Shooter', level: '95%' },
                  { skill: 'Post-Processing', level: '85%' },
                  { skill: 'Equipment Setup', level: '90%' },
                  { skill: 'Creative Vision', level: '88%' },
                ].map((item, index) => (
                  <motion.div
                    key={item.skill}
                    variants={cardVariants}
                    className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-sm font-medium text-white">{item.skill}</div>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <motion.div
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: item.level }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
