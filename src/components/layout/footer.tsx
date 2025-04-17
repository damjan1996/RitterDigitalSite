// src/components/layout/footer.tsx
import { motion } from 'framer-motion';
import { Dribbble, Github, Instagram, Linkedin, Twitter, X } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { Container } from '@/components/ui/container';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
        return <Dribbble className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <footer className="overflow-hidden border-t border-gray-100 bg-white pb-8 pt-16">
      <Container>
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Logo und Unternehmensinformationen */}
          <motion.div variants={itemVariants}>
            <div className="mb-6 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center bg-[#23282D] text-xs font-normal text-white">
                R²
              </div>
              <span className="text-base font-normal tracking-tight text-[#23282D]">
                Ritter Digital
              </span>
            </div>

            <h3 className="mb-4 text-lg font-medium text-[#23282D]">
              FUTURISTIC TECH & <br />
              DIGITAL SOLUTIONS
            </h3>

            <p className="mb-6 max-w-xs text-sm text-[#50697D]">
              Dive into a world where technology and digital solutions converge to create
              mind-blowing experiences for your business.
            </p>

            <div className="flex space-x-3">
              {['Github', 'Dribbble', 'Instagram', 'Twitter'].map(item => (
                <motion.a
                  key={item}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-[#50697D] transition-colors duration-300 hover:bg-[#F4F5F8] hover:text-[#23282D]"
                  aria-label={item}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                >
                  {getSocialIcon(item)}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Kontakt */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-base font-medium text-[#23282D]">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="mb-1 text-sm font-medium text-[#50697D]">Email</span>
                <a
                  href="mailto:kontakt@ritterdigital.de"
                  className="text-sm text-[#50697D] transition-colors hover:text-[#FF8A4C]"
                >
                  kontakt@ritterdigital.de
                </a>
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-sm font-medium text-[#50697D]">Telefon</span>
                <a
                  href="tel:+491234567890"
                  className="text-sm text-[#50697D] transition-colors hover:text-[#FF8A4C]"
                >
                  +49 (0) 123 456 7890
                </a>
              </div>

              <div className="flex flex-col">
                <span className="mb-1 text-sm font-medium text-[#50697D]">Adresse</span>
                <address className="text-sm not-italic text-[#50697D]">
                  Ritter Digital GmbH
                  <br />
                  Musterstraße 123
                  <br />
                  12345 Musterstadt
                </address>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-base font-medium text-[#23282D]">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Blog'].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-[#50697D] transition-colors duration-300 hover:text-[#FF8A4C]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Explore */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-base font-medium text-[#23282D]">Explore</h3>
            <ul className="space-y-3">
              {[
                'Leistungen',
                'Case Studies',
                'Testimonials',
                'Media & Press',
                'Events & Webinars',
              ].map(item => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-sm text-[#50697D] transition-colors duration-300 hover:text-[#FF8A4C]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between border-t border-gray-100 pt-6 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="mb-4 text-xs text-[#50697D] md:mb-0">
            © {currentYear} Ritter Digital GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6">
            {['Datenschutz', 'Impressum', 'AGB'].map(item => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs text-[#50697D] transition-colors hover:text-[#FF8A4C]"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
