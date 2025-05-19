'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, Linkedin, Twitter, X, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';

import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

// Color values directly used in the component markup

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Helper-Funktion zum Rendern der Icons
  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case 'Linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'Xing':
        return <X className="h-5 w-5" />;
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Github':
        return <Github className="h-5 w-5" />;
      case 'Dribbble':
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-white pb-12 pt-20">
      {/* Background elements similar to Hero */}
      <div className="absolute inset-0 h-full w-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white to-[#F8F9FC]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className="absolute left-0 top-0 h-full w-1/2 bg-[#F8F9FC]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 70% 100%, 0 100%)' }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 0.7 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />

        {/* Decorative elements */}
        <motion.div
          className="absolute left-[10%] top-[15%] h-24 w-24 rounded-full bg-[#FF7A35]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        />

        <motion.div
          className="absolute bottom-[20%] right-[5%] h-20 w-20 rounded-full bg-[#3D5A73]/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Logo und Unternehmensinformationen */}
          <motion.div className="lg:col-span-4" variants={itemVariants}>
            <motion.div
              className="mb-6 flex items-center"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="flex h-14 w-44 items-center justify-center overflow-hidden rounded-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/logos/logo_ritterdigital.png"
                  alt="RITTER Gesellschaft für digitale Geschäftsprozesse mbH Logo"
                  width={176}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </motion.div>
            </motion.div>

            <motion.div className="relative mb-4" variants={itemVariants}>
              <motion.div
                className="absolute -left-3 top-1/2 h-10 w-1 -translate-y-1/2 bg-gradient-to-b from-[#FF7A35] to-[#FF7A35]/30"
                initial={{ height: 0 }}
                animate={{ height: '2.5rem' }}
                transition={{ duration: 0.6, delay: 0.8 }}
              />
              <h3 className="text-lg font-medium text-[#1A2027]">
                DIGITALE LÖSUNGEN
                <span className="text-[#FF7A35]">.</span>
              </h3>
            </motion.div>

            <motion.p className="mb-8 max-w-xs text-[#3D5A73]" variants={itemVariants}>
              Dive into a world where technology and digital solutions converge to create
              mind-blowing experiences for your business.
            </motion.p>

            <motion.div className="flex space-x-4" variants={containerVariants}>
              {['Github', 'Linkedin', 'Instagram', 'Twitter'].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300',
                    hoveredSocial === item
                      ? 'bg-[#FF7A35] text-white shadow-lg shadow-[#FF7A35]/20'
                      : 'bg-[#F8F9FC] text-[#3D5A73] hover:bg-[#FF7A35]/10 hover:text-[#FF7A35]'
                  )}
                  aria-label={item}
                  onMouseEnter={() => setHoveredSocial(item)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  custom={index}
                  variants={linkVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getSocialIcon(item)}
                  <AnimatePresence>
                    {hoveredSocial === item && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 mx-auto h-1 w-1 rounded-full bg-[#FF7A35]"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Kontakt */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <motion.h3
              className="mb-6 text-base font-medium text-[#1A2027]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Kontakt
              <motion.div
                className="mt-2 h-0.5 w-0 bg-[#FF7A35]"
                initial={{ width: 0 }}
                whileInView={{ width: '2rem' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h3>

            <div className="space-y-6">
              <motion.div
                className="group flex flex-col"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="mb-1 text-sm font-medium text-[#3D5A73]">Email</span>
                <a
                  href="mailto:team@ritterdigital.de"
                  className="inline-flex items-center text-sm text-[#3D5A73] transition-colors hover:text-[#FF7A35]"
                >
                  team@ritterdigital.de
                  <motion.div
                    className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </a>
              </motion.div>

              <motion.div
                className="group flex flex-col"
                variants={itemVariants}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="mb-1 text-sm font-medium text-[#3D5A73]">Telefon</span>
                <a
                  href="tel:+4902083067485"
                  className="inline-flex items-center text-sm text-[#3D5A73] transition-colors hover:text-[#FF7A35]"
                >
                  (+49) 0208 306 74 850
                  <motion.div
                    className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                </a>
              </motion.div>

              <motion.div className="flex flex-col" variants={itemVariants}>
                <span className="mb-1 text-sm font-medium text-[#3D5A73]">Adresse</span>
                <motion.address
                  className="text-sm not-italic text-[#3D5A73]"
                  whileHover={{ x: 5, color: '#FF7A35' }}
                  transition={{ duration: 0.2 }}
                >
                  RITTER Gesellschaft für digitale Geschäftsprozesse mbH
                  <br />
                  Essener Straße 2-24
                  <br />
                  46047 Oberhausen
                </motion.address>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.h3
              className="mb-6 text-base font-medium text-[#1A2027]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Quick Links
              <motion.div
                className="mt-2 h-0.5 w-0 bg-[#FF7A35]"
                initial={{ width: 0 }}
                whileInView={{ width: '2rem' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h3>

            <ul className="space-y-3">
              {['Home', 'About Us', 'Services'].map((item, index) => (
                <motion.li
                  key={item}
                  custom={index}
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="group relative inline-flex items-center text-sm text-[#3D5A73] transition-colors duration-300 hover:text-[#FF7A35]"
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <AnimatePresence>
                      {hoveredLink === item && (
                        <motion.span
                          className="absolute -left-4 text-[#FF7A35]"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          •
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item}
                    <motion.div
                      className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Explore */}
          <motion.div className="lg:col-span-3" variants={itemVariants}>
            <motion.h3
              className="mb-6 text-base font-medium text-[#1A2027]"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              Explore
              <motion.div
                className="mt-2 h-0.5 w-0 bg-[#FF7A35]"
                initial={{ width: 0 }}
                whileInView={{ width: '2rem' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h3>

            <ul className="space-y-3">
              {[
                'Leistungen',
                'Case Studies',
                'Testimonials',
                'Media & Press',
                'Events & Webinars',
              ].map((item, index) => (
                <motion.li
                  key={item}
                  custom={index}
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="group relative inline-flex items-center text-sm text-[#3D5A73] transition-colors duration-300 hover:text-[#FF7A35]"
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <AnimatePresence>
                      {hoveredLink === item && (
                        <motion.span
                          className="absolute -left-4 text-[#FF7A35]"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          •
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item}
                    <motion.div
                      className="ml-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Enhanced divider with animation */}
        <motion.div
          className="mt-16 h-px w-full bg-gradient-to-r from-[#F8F9FC] via-[#FF7A35]/30 to-[#F8F9FC]"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Copyright */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between pt-4 md:flex-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.p
            className="mb-4 text-xs text-[#3D5A73] md:mb-0"
            whileHover={{ x: 5, color: '#1A2027' }}
            transition={{ duration: 0.2 }}
          >
            © {currentYear} RITTER Gesellschaft für digitale Geschäftsprozesse mbH. Alle Rechte
            vorbehalten.
          </motion.p>
          <div className="flex space-x-8">
            {['Datenschutz', 'Impressum', 'AGB'].map((item, index) => (
              <motion.div
                key={item}
                whileHover={{ y: -2 }}
                custom={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8 + index * 0.1,
                  duration: 0.5,
                }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="group relative text-xs text-[#3D5A73] transition-colors hover:text-[#FF7A35]"
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-px w-0 bg-[#FF7A35]"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
