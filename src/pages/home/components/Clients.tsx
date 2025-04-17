// src/pages/home/components/Clients.tsx
import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { SectionTitle } from '@/components/common/section-title'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

// Farbdefinitionen aus dem Farbschema - konsistent mit anderen Komponenten
const colors = {
    primary: '#23282D', // Primarna boja za strukturiranje
    secondary: '#50697D', // Glavna boja za pozadinske
    accent: '#FF8A4C', // Akcentna boja za isticanje
    background: '#F4F5F8', // Osnovna boja za pozadinu
    secondaryAccent: '#3A4F66' // Sekundarna akcentna boja
};

interface Client {
    name: string
    logo: string
}

interface ClientsProps {
    title?: string
    subtitle?: string
    clients?: Client[]
    className?: string
}

export const Clients: React.FC<ClientsProps> = ({
                                                    title = "Trusted by Clients",
                                                    subtitle = "Wir arbeiten mit führenden Unternehmen zusammen, um innovative digitale Lösungen zu schaffen",
                                                    clients = [],
                                                    className,
                                                }) => {
    // Default-Clients verwenden, wenn keine angegeben wurden
    const displayClients = clients.length > 0 ? clients : [
        { name: "Client 1", logo: "/images/logos/client-placeholder-1.svg" },
        { name: "Client 2", logo: "/images/logos/client-placeholder-2.svg" },
        { name: "Client 3", logo: "/images/logos/client-placeholder-3.svg" },
        { name: "Client 4", logo: "/images/logos/client-placeholder-4.svg" },
        { name: "Client 5", logo: "/images/logos/client-placeholder-5.svg" },
        { name: "Client 6", logo: "/images/logos/client-placeholder-6.svg" },
    ]

    // Wir verwenden direkt den Namen als stabile Darstellung anstatt zu versuchen, Bilder zu laden
    const clientsToDisplay = displayClients.map(client => ({
        ...client,
        name: client.name || `Client ${Math.random().toString(36).substring(2, 7)}`
    }))

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const statsVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                staggerChildren: 0.2,
                delayChildren: 0.5
            }
        }
    };

    const statItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
      <section className={cn("py-16 bg-[#23282D] relative overflow-hidden", className)}>
          {/* Subtle accent corner decoration */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF8A4C]/5 rounded-bl-full" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3A4F66]/5 rounded-tr-full" />

          {/* Subtle accent line at the top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#FF8A4C]" />

          <Container className="relative z-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={titleVariants}
              >
                  <SectionTitle
                    title={title}
                    subtitle={subtitle}
                    align="center"
                    color="white"
                    className="mb-16"
                  />
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                  {clientsToDisplay.map((client, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex justify-center items-center p-4 bg-white/5 border border-white/10 rounded-none hover:bg-white/10 transition-all duration-300"
                      whileHover={{
                          y: -5,
                          boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
                          transition: { duration: 0.3 }
                      }}
                    >
                        <div className="relative h-12 w-full flex items-center justify-center">
                            {/* Statt Bilder zu laden, verwenden wir direkt eine stabile Textdarstellung */}
                            <span className="text-white/70 text-sm font-medium">{client.name}</span>
                        </div>
                    </motion.div>
                  ))}
              </motion.div>

              <motion.div
                className="mt-16 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={statsVariants}
              >
                  <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 lg:gap-20">
                      {[
                          { value: "20", suffix: "+", label: "Jahre Erfahrung" },
                          { value: "90", suffix: "+", label: "Zufriedene Kunden" },
                          { value: "250", suffix: "+", label: "Erfolgreiche Projekte" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          className="text-center"
                          variants={statItemVariants}
                          whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.2 }
                          }}
                        >
                            <div className="text-4xl font-bold mb-2 text-white">
                                {stat.value}<span className="text-[#FF8A4C]">{stat.suffix}</span>
                            </div>
                            <div className="text-sm text-white/70">
                                {stat.label}
                            </div>
                        </motion.div>
                      ))}
                  </div>
              </motion.div>
          </Container>
      </section>
    )
}

export default Clients