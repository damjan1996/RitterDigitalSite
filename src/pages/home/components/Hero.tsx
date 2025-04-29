"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, BarChart3, Brain, ChevronRight, Code2, Database } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

// Refined color palette mit Hauptfarben aus der Projektbeschreibung
const colors = {
  primary: "#23282D", // Primärfarbe: rgb(35, 40, 45)
  secondary: "#50697D", // Sekundärfarbe: rgb(80, 105, 125)
  accent: "#FF8A4C", // Akzentfarbe: rgb(255, 138, 76)
  background: "#F4F5F6", // Basisfarbe: rgb(244, 245, 246)
  secondaryAccent: "#3A4F66", // Tertiärfarbe: rgb(58, 79, 102)
}

// Verbesserte Service-Definitionen basierend auf der Projektbeschreibung
const services = [
  {
    id: 1,
    title: "Softwareentwicklung",
    description: "Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse.",
    icon: <Code2 className="h-6 w-6" />,
    color: colors.accent,
    href: "/leistungen/softwareentwicklung",
    image: "/images/service-software.png",
  },
  {
    id: 2,
    title: "Business Intelligence",
    description: "Datenbasierte Entscheidungsfindung für strategische Vorteile.",
    icon: <BarChart3 className="h-6 w-6" />,
    color: colors.secondary,
    href: "/leistungen/business-intelligence",
    image: "/images/service-bi.png",
  },
  {
    id: 3,
    title: "Data Warehouse",
    description: "Zentrale Datenverwaltung für effiziente Analysen.",
    icon: <Database className="h-6 w-6" />,
    color: colors.secondaryAccent,
    href: "/leistungen/data-warehouse",
    image: "/images/service-data.png",
  },
  {
    id: 4,
    title: "Künstliche Intelligenz",
    description: "Intelligente Automatisierung und Optimierung.",
    icon: <Brain className="h-6 w-6" />,
    color: colors.primary,
    href: "/leistungen/kuenstliche-intelligenz",
    image: "/images/service-ai.png",
  },
]

// 3D Model Component
function Model({ color = colors.accent }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} scale={1.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} wireframe={true} />
        </mesh>
      </Float>
  )
}

interface HeroProps {
  title?: string
  subtitle?: string
  ctaPrimary?: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  className?: string
}

export function Hero({
                       title = "Experten für digitale Prozesse",
                       subtitle = "Ihr Partner für digitale Optimierung von Prozessen und E-Commerce Lösungen",
                       ctaPrimary = {
                         text: "Mehr erfahren",
                         href: "/leistungen",
                       },
                       ctaSecondary = {
                         text: "Kontakt",
                         href: "/kontakt",
                       },
                       className,
                     }: HeroProps) {
  const [activeService, setActiveService] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef(null)
  const isMobile = useMobile()

  // Get header height for proper spacing
  useEffect(() => {
    const updateHeaderHeight = () => {
      const header = document.querySelector("header")
      if (header) {
        setHeaderHeight(header.offsetHeight)
      }
    }

    updateHeaderHeight()
    window.addEventListener("resize", updateHeaderHeight)
    return () => window.removeEventListener("resize", updateHeaderHeight)
  }, [])

  // Intersection Observer to trigger animations when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting)
        },
        { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Automatic service rotation with pause on hover
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isHovering])

  // Staggered animation variants for better visual flow
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
      <section
          ref={sectionRef}
          className={cn("relative flex min-h-screen flex-col justify-center overflow-hidden bg-white", className)}
          style={{ paddingTop: `${headerHeight}px` }}
      >
        {/* Enhanced background with layered elements for depth */}
        <div className="absolute inset-0 h-full w-full">
          <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white to-[#F4F5F6]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
          />

          <motion.div
              className="absolute right-0 top-0 h-full w-3/4 bg-[#F4F5F6]"
              style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />

          {/* 3D Background Elements */}
          <div className="absolute right-[5%] top-[10%] h-64 w-64 opacity-30">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Model color={colors.accent} />
            </Canvas>
          </div>

          {/* Accent lines for visual interest */}
          <motion.div
              className="absolute bottom-0 left-0 h-1 w-full"
              style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ duration: 1.5, delay: 1.2 }}
          />

          <motion.div
              className="absolute right-[10%] top-[15%] h-32 w-32 rounded-full"
              style={{ backgroundColor: `${colors.accent}10` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
          />

          <motion.div
              className="absolute bottom-[20%] left-[5%] h-24 w-24 rounded-full"
              style={{ backgroundColor: `${colors.secondary}10` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
          />
        </div>

        <Container className="relative z-10 flex flex-1 flex-col justify-center px-4 py-8 md:px-6 md:py-16 lg:py-24">
          <motion.div
              className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              {/* Enhanced title with gradient accent */}
              <div className="relative mb-2">
                <motion.div
                    className="absolute -left-3 top-1/2 h-12 w-1.5 -translate-y-1/2"
                    style={{ background: `linear-gradient(to bottom, ${colors.accent}, ${colors.accent}30)` }}
                    initial={{ height: 0 }}
                    animate={{ height: "3rem" }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                />
                <h1
                    className="text-4xl font-medium leading-tight tracking-tight md:text-5xl lg:text-6xl"
                    style={{ color: colors.primary }}
                >
                  {title}
                  <span style={{ color: colors.accent }}>.</span>
                </h1>
              </div>

              {/* Enhanced subtitle with better typography */}
              {subtitle && (
                  <motion.p
                      variants={itemVariants}
                      className="mb-10 max-w-xl text-lg md:text-xl"
                      style={{ color: colors.secondary }}
                  >
                    {subtitle}
                  </motion.p>
              )}

              {/* Hero image for mobile */}
              {isMobile && (
                  <motion.div variants={itemVariants} className="mb-8 mt-4 overflow-hidden rounded-lg">
                    <Image
                        src="/images/hero-digital.png"
                        alt="Digitale Prozessoptimierung"
                        width={600}
                        height={400}
                        className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </motion.div>
              )}

              {/* Enhanced CTA section with modern button designs */}
              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                <Link href={ctaPrimary.href} className="group">
                  <Button
                      className="relative overflow-hidden rounded-md px-8 py-6 font-medium text-white transition-all duration-300"
                      size="lg"
                      style={{ backgroundColor: colors.primary }}
                  >
                  <span className="relative z-10 flex items-center gap-2">
                    {ctaPrimary.text}
                    <motion.div
                        initial={{ x: -5, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </span>
                    <motion.div
                        className="absolute bottom-0 left-0 h-1 w-full"
                        style={{ backgroundColor: colors.accent }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>

                <Link href={ctaSecondary.href} className="group">
                  <Button
                      variant="outline"
                      className="relative rounded-md px-8 py-6 font-medium transition-all duration-300"
                      size="lg"
                      style={{ borderColor: `${colors.secondary}30`, color: colors.secondary }}
                  >
                    <span className="relative z-10">{ctaSecondary.text}</span>
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                        style={{ backgroundColor: colors.accent }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Enhanced Services Showcase with improved visual design */}
            <motion.div
                variants={itemVariants}
                className="hidden lg:block"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative h-full w-full">
                <motion.div
                    className="relative h-full w-full overflow-hidden rounded-lg bg-white p-8 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{
                      boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                      y: -5,
                      transition: { duration: 0.3 },
                    }}
                >
                  {/* Decorative elements */}
                  <div
                      className="absolute right-0 top-0 h-20 w-20"
                      style={{ background: `linear-gradient(to bottom left, ${colors.accent}10, transparent)` }}
                  />
                  <div
                      className="absolute bottom-0 left-0 h-16 w-16"
                      style={{ background: `linear-gradient(to top right, ${colors.secondary}10, transparent)` }}
                  />

                  {/* Service navigation with improved indicators */}
                  <div className="mb-8 flex gap-3">
                    {services.map((service, index) => (
                        <motion.button
                            key={index}
                            className="group relative h-2 w-16 overflow-hidden rounded-full"
                            style={{ backgroundColor: colors.background }}
                            onClick={() => setActiveService(index)}
                            whileHover={{ scale: 1.05 }}
                            aria-label={`Wechseln zu ${service.title}`}
                        >
                          <motion.div
                              className="absolute inset-0 rounded-full"
                              style={{ backgroundColor: service.color }}
                              initial={{ scaleX: index === activeService ? 1 : 0 }}
                              animate={{ scaleX: index === activeService ? 1 : 0 }}
                              transition={{ duration: 0.5 }}
                          />
                          <motion.div
                              className="absolute inset-0 origin-left rounded-full"
                              style={{ backgroundColor: `${colors.secondary}20` }}
                              initial={{ scaleX: 0 }}
                              whileHover={{ scaleX: 1 }}
                              transition={{ duration: 0.3 }}
                          />
                        </motion.button>
                    ))}
                  </div>

                  {/* Enhanced service content with better animations and images */}
                  <div className="h-72">
                    <AnimatePresence mode="wait">
                      <motion.div
                          key={activeService}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="flex h-full flex-col justify-between"
                      >
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <motion.div
                                className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg"
                                style={{
                                  backgroundColor: `${services[activeService].color}10`,
                                  color: services[activeService].color,
                                }}
                                whileHover={{ scale: 1.05 }}
                            >
                              {services[activeService].icon}
                            </motion.div>

                            <motion.h3
                                className="mb-4 text-2xl font-medium"
                                style={{ color: colors.primary }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                              {services[activeService].title}
                              <span style={{ color: colors.accent }}>.</span>
                            </motion.h3>

                            <motion.p
                                style={{ color: colors.secondary }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                              {services[activeService].description}
                            </motion.p>
                          </div>

                          {/* Service image */}
                          <motion.div
                              className="relative h-40 w-40 overflow-hidden rounded-lg"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 }}
                          >
                            <Image
                                src={services[activeService].image || "/placeholder.svg?height=160&width=160&query=service"}
                                alt={services[activeService].title}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </motion.div>
                        </div>

                        {/* Enhanced "learn more" button */}
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                          <Link
                              href={services[activeService].href}
                              className="group inline-flex items-center gap-2 font-medium transition-colors"
                              style={{ color: colors.primary }}
                          >
                            <span>Mehr erfahren</span>
                            <motion.div
                                className="flex items-center justify-center rounded-full p-1"
                                style={{ backgroundColor: colors.background }}
                                whileHover={{
                                  x: 5,
                                  backgroundColor: colors.accent,
                                  color: "white",
                                }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </Link>
                        </motion.div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile services showcase */}
          <motion.div
              variants={itemVariants}
              className="mt-8 block lg:hidden"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
          >
            <div className="relative w-full overflow-hidden rounded-lg bg-white p-6 shadow-md">
              <AnimatePresence mode="wait">
                <motion.div
                    key={activeService}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col"
                >
                  <div className="flex items-center gap-4">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: `${services[activeService].color}10`,
                          color: services[activeService].color,
                        }}
                    >
                      {services[activeService].icon}
                    </div>
                    <h3 className="text-xl font-medium" style={{ color: colors.primary }}>
                      {services[activeService].title}
                      <span style={{ color: colors.accent }}>.</span>
                    </h3>
                  </div>

                  {/* Service image for mobile */}
                  <div className="mt-4 overflow-hidden rounded-lg">
                    <Image
                        src={services[activeService].image || "/placeholder.svg?height=200&width=400&query=service"}
                        alt={services[activeService].title}
                        width={400}
                        height={200}
                        className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="mt-4" style={{ color: colors.secondary }}>
                    {services[activeService].description}
                  </p>

                  {/* Mobile learn more link */}
                  <Link
                      href={services[activeService].href}
                      className="mt-4 inline-flex items-center gap-2 font-medium transition-colors"
                      style={{ color: colors.primary }}
                  >
                    <span>Mehr erfahren</span>
                    <div
                        className="flex items-center justify-center rounded-full p-1"
                        style={{ backgroundColor: colors.background }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex gap-3">
                {services.map((service, index) => (
                    <button
                        key={index}
                        className="group relative h-2 flex-1 overflow-hidden rounded-full"
                        style={{ backgroundColor: colors.background }}
                        onClick={() => setActiveService(index)}
                        aria-label={`Wechseln zu ${service.title}`}
                    >
                      <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: service.color }}
                          initial={{ scaleX: index === activeService ? 1 : 0 }}
                          animate={{ scaleX: index === activeService ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                      />
                    </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced trust section with modern design */}
          <motion.div
              className="relative mt-12 md:mt-20 lg:mt-24"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 1 }}
          >
            <motion.div variants={itemVariants} className="flex flex-col items-start gap-6">
              <div className="flex items-center gap-3">
                <div className="h-px w-12" style={{ backgroundColor: colors.accent }}></div>
                <span className="text-sm font-medium uppercase tracking-wider" style={{ color: colors.secondary }}>
                Unsere Expertise
              </span>
              </div>

              {/* Enhanced statistics with better visual hierarchy */}
              <div className="flex flex-wrap items-center gap-4 md:gap-8">
                <motion.div
                    className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                    style={{ borderColor: `${colors.accent}20` }}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(255,138,76,0.1)",
                    }}
                >
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  20<span style={{ color: colors.accent }}>+</span>
                </span>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                  Jahre Erfahrung
                </span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                    style={{ borderColor: `${colors.secondary}20` }}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(80,105,125,0.1)",
                    }}
                >
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  90<span style={{ color: colors.accent }}>+</span>
                </span>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                  Zufriedene Kunden
                </span>
                </motion.div>

                <motion.div
                    className="flex items-center gap-3 rounded-lg border bg-white px-4 py-2 shadow-sm"
                    style={{ borderColor: `${colors.secondaryAccent}20` }}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(58,79,102,0.1)",
                    }}
                >
                <span className="text-3xl font-medium" style={{ color: colors.primary }}>
                  250<span style={{ color: colors.accent }}>+</span>
                </span>
                  <span className="text-sm" style={{ color: colors.secondary }}>
                  Erfolgreiche Projekte
                </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>
  )
}
