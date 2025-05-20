'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Check,
  Code,
  Server,
  BarChart3,
  Brain,
  Database,
  Code2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useRef, useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Definiere die Services mit erweiterten Informationen
const services = [
  {
    id: 'digitalisierung',
    title: 'Digitalisierung',
    description:
      'Digitale Transformation für zukunftsfähige Unternehmen. Wir begleiten Sie auf dem Weg der digitalen Veränderung und helfen Ihnen, neue Prozesse und Technologien effizient einzuführen.',
    imageUrl: '/images/services/digitalisierung.jpg',
    videoUrl: '/videos/digitalisierung.mp4',
    link: '/leistungen/digitalisierung',
    icon: <Code2 className="h-6 w-6" />,
    benefitPoints: [
      'Optimierung und Automatisierung von Geschäftsprozessen',
      'Reduzierung manueller Arbeitsabläufe',
      'Steigerung der Effizienz und Produktivität',
      'Verbesserte Datennutzung und -analyse',
    ],
    technologies: ['Cloud Computing', 'Automation Tools', 'Workflow Management', 'CRM-Systeme'],
    useCases: [
      {
        title: 'Prozessoptimierung',
        description: 'Digitalisierung und Automatisierung von manuellen Arbeitsprozessen',
      },
      {
        title: 'Wissensmanagement',
        description: 'Implementierung digitaler Systeme für effizientes Wissensmanagement',
      },
      {
        title: 'Digitale Transformation',
        description: 'Umfassende Strategie zur digitalen Transformation des Unternehmens',
      },
    ],
    caseStudy: {
      title: 'Mittelständisches Unternehmen',
      result: '40% Effizienzsteigerung durch digitale Prozessautomatisierung',
      description:
        'Durch die Digitalisierung interner Prozesse konnte unser Kunde manuelle Arbeitsschritte signifikant reduzieren und die Produktivität steigern.',
    },
  },
  {
    id: 'business-intelligence',
    title: 'Business Intelligence',
    description:
      'Datenbasierte Entscheidungen für strategische Vorteile. Business Intelligence ist die Grundlage für das Sammeln von Daten in Ihrem Unternehmen. Über übersichtliche Dashboards erhalten Sie Echtzeit-Zugriff auf entscheidende Kennzahlen.',
    imageUrl: '/images/services/business-intelligence.jpg',
    videoUrl: '/videos/businessintelligence.mp4',
    link: '/leistungen/business-intelligence',
    icon: <BarChart3 className="h-6 w-6" />,
    benefitPoints: [
      'Visualisierung komplexer Daten durch interaktive Dashboards',
      'Integration verschiedener Datenquellen für ganzheitliche Analysen',
      'Automatisierte Berichterstattung und Alarmsysteme',
      'Selbstbedienungsanalysen für Fachabteilungen',
    ],
    technologies: ['Power BI', 'Tableau', 'QlikView', 'SQL Server', 'PostgreSQL'],
    useCases: [
      {
        title: 'Vertriebscontrolling',
        description: 'Echtzeit-Überwachung von Verkaufskennzahlen und Kundenverhalten',
      },
      {
        title: 'Logistikoptimierung',
        description: 'Analyse von Lieferzeiten und Identifikation von Prozessengpässen',
      },
      {
        title: 'Finanzreporting',
        description: 'Automatisierte Erstellung von monatlichen Finanzberichten',
      },
    ],
    caseStudy: {
      title: 'Einzelhandelsunternehmen',
      result: '25% Umsatzsteigerung durch gezielte Datenanalyse',
      description:
        'Durch die Implementierung eines umfassenden BI-Systems konnte unser Kunde Verkaufstrends erkennen und sein Sortiment optimieren.',
    },
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse',
    description:
      'Zentrale Datenverwaltung für effiziente Analysen. Ein Data Warehouse bildet die zentrale Datenplattform Ihres Unternehmens. Hier werden Daten aus verschiedenen Quellen zusammengeführt, bereinigt und für Analysen optimiert.',
    imageUrl: '/images/services/data-warehouse.jpg',
    videoUrl: '/videos/datawarehouse.mp4',
    link: '/leistungen/data-warehouse',
    icon: <Database className="h-6 w-6" />,
    benefitPoints: [
      'Zentrale Datenhaltung für konsistente Analysen',
      'Data Governance und Datenqualitätsmanagement',
      'Historische Datenanalyse und Trenderfassung',
      'Skalierbare Architektur für wachsende Datenvolumen',
    ],
    technologies: ['Snowflake', 'Azure Synapse', 'AWS Redshift', 'Google BigQuery', 'ETL Tools'],
    useCases: [
      {
        title: 'Unternehmensweites Reporting',
        description: 'Einheitliche Datenbasis für alle Unternehmensbereiche',
      },
      {
        title: 'Customer 360',
        description: 'Ganzheitliche Kundensicht durch Integration aller Datenquellen',
      },
      {
        title: 'Predictive Analytics',
        description: 'Vorhersagemodelle auf Basis historischer Daten',
      },
    ],
    caseStudy: {
      title: 'Finanzdienstleister',
      result: '70% schnellere Berichterstellung durch integrierte Datenhaltung',
      description:
        'Die Implementierung eines modernen Data Warehouse ermöglichte die Automatisierung des monatlichen Reportings und reduzierte die Fehlerquote signifikant.',
    },
  },
  {
    id: 'softwareentwicklung',
    title: 'Software Entwicklung',
    description:
      'Maßgeschneiderte Lösungen für Ihre Geschäftsprozesse. Wir entwickeln individuelle Softwarelösungen, die genau auf Ihre Anforderungen zugeschnitten sind. Von Webapplikationen bis hin zu komplexen Backend-Systemen.',
    imageUrl: '/images/services/software-development.jpg',
    videoUrl: '/videos/softwaredevelopment.mp4',
    link: '/leistungen/software-development',
    icon: <Code className="h-6 w-6" />,
    benefitPoints: [
      'Individuell angepasste Lösungen statt Standard-Software',
      'Nahtlose Integration in bestehende IT-Landschaft',
      'Agile Entwicklungsmethoden für flexible Anpassungen',
      'Zukunftssichere Technologien und Wartbarkeit',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', '.NET', 'Docker'],
    useCases: [
      {
        title: 'Workflow-Automatisierung',
        description: 'Digitalisierung und Optimierung manueller Geschäftsprozesse',
      },
      {
        title: 'E-Commerce-Plattformen',
        description: 'Entwicklung skalierbarer Onlineshop-Lösungen mit ERP-Anbindung',
      },
      {
        title: 'Interne Tools',
        description: 'Entwicklung spezifischer Werkzeuge für interne Prozesse',
      },
    ],
    caseStudy: {
      title: 'Produktionsunternehmen',
      result: 'Reduzierung der Auftragsbearbeitungszeit um 60% durch automatisierte Prozesse',
      description:
        'Durch die Entwicklung einer maßgeschneiderten Software für die Auftragsabwicklung konnten manuelle Prozesse automatisiert und Fehlerquellen minimiert werden.',
    },
  },
  {
    id: 'kuenstliche-intelligenz',
    title: 'Künstliche Intelligenz',
    description:
      'Intelligente Automatisierung und Optimierung. KI-gestützte Lösungen optimieren Ihre Prozesse und erschließen neue Geschäftspotenziale. Wir integrieren moderne KI-Technologien in Ihre bestehenden Systeme.',
    imageUrl: '/images/services/artificial-intelligence.jpg',
    videoUrl: '/videos/artificialintelligence.mp4',
    link: '/leistungen/kuenstliche-intelligenz',
    icon: <Brain className="h-6 w-6" />,
    benefitPoints: [
      'Automatisierung komplexer Entscheidungsprozesse',
      'Vorhersagemodelle für Geschäftsentwicklungen',
      'Verarbeitung und Analyse unstrukturierter Daten',
      'Optimierung durch maschinelles Lernen',
    ],
    technologies: ['TensorFlow', 'PyTorch', 'ChatGPT/LLMs', 'Computer Vision', 'NLP'],
    useCases: [
      {
        title: 'Kundensegmentierung',
        description: 'KI-basierte Analyse von Kundenverhalten für gezielte Marketingmaßnahmen',
      },
      {
        title: 'Dokumentenanalyse',
        description: 'Automatische Extraktion relevanter Informationen aus Dokumenten',
      },
      {
        title: 'Absatzprognosen',
        description: 'Präzise Vorhersagen von Absatzzahlen für optimierte Bestandsplanung',
      },
    ],
    caseStudy: {
      title: 'Online-Händler',
      result: '30% höhere Conversion-Rate durch KI-basierte Produktempfehlungen',
      description:
        'Die Integration eines KI-Systems zur personalisierten Produktempfehlung führte zu einer signifikanten Steigerung der Conversion-Rate und des durchschnittlichen Bestellwerts.',
    },
  },
  {
    id: 'jtl-wawi',
    title: 'JTL WaWi',
    description:
      'Professionelle JTL-Lösungen und Integrationen. Wir bieten spezialisierte Dienstleistungen für die JTL Warenwirtschaftssoftware, von der Implementierung bis hin zu individualisierten Erweiterungen und Integrationen.',
    imageUrl: '/images/services/jtl-wawi.jpg',
    videoUrl: '/videos/jtl.mp4',
    link: '/leistungen/jtl',
    icon: <Server className="h-6 w-6" />,
    benefitPoints: [
      'Nahtlose Integration mit bestehenden E-Commerce-Systemen',
      'Optimierung des Warenwirtschaftsprozesses',
      'Individuelle Anpassungen und Erweiterungen',
      'Automatisierte Bestellabwicklung und Bestandsführung',
    ],
    technologies: ['JTL-Wawi', 'JTL-Shop', 'JTL-Workflow', 'ERP-Integration', 'E-Commerce APIs'],
    useCases: [
      {
        title: 'E-Commerce Integration',
        description: 'Anbindung von Online-Shops an das zentrale Warenwirtschaftssystem',
      },
      {
        title: 'Prozessautomatisierung',
        description: 'Automatisierung von Bestell- und Versandprozessen',
      },
      {
        title: 'Multi-Channel-Management',
        description: 'Zentrale Verwaltung verschiedener Verkaufskanäle',
      },
    ],
    caseStudy: {
      title: 'Online-Händler',
      result: '50% Zeitersparnis bei der Auftragsbearbeitung durch optimierte JTL-Prozesse',
      description:
        'Durch die individuelle Anpassung der JTL-Warenwirtschaft konnte unser Kunde seine Auftragsabwicklung deutlich beschleunigen und Fehlerquellen minimieren.',
    },
  },
];

export const ServiceList = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white py-24">
      {/* Decorative elements */}
      <motion.div
        className="absolute left-0 top-0 h-1 w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #FF7A35 50%, transparent 100%)',
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <motion.div
        className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-[#3D5A73]/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      <motion.div
        className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-[#FF7A35]/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />

      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <motion.div
          ref={containerRef}
          className="mx-auto max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-16 text-center" variants={titleVariants}>
            <motion.div
              className="mx-auto mb-4 h-1 w-16 bg-gradient-to-r from-[#FF7A35] to-[#FF9A65]"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <h2 className="bg-gradient-to-r from-[#1A2027] to-[#3D5A73] bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
              Unsere Leistungsbereiche
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#3D5A73]/80">
              Entdecken Sie unser umfassendes Angebot an digitalen Lösungen für Ihr Unternehmen. Von
              der Datenanalyse bis zur Software-Entwicklung bieten wir maßgeschneiderte Dienste für
              Ihre individuellen Anforderungen.
            </p>
          </motion.div>

          <div className="space-y-12">
            {services.map((service, index) => (
              <ServiceItem
                key={service.id}
                service={service}
                index={index}
                videoRef={el => (videoRefs.current[index] = el)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface ServiceItemProps {
  service: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    videoUrl?: string;
    link: string;
    icon: React.ReactNode;
    benefitPoints: string[];
    technologies: string[];
    useCases: { title: string; description: string }[];
    caseStudy: { title: string; result: string; description: string };
  };
  index: number;
  videoRef: (el: HTMLVideoElement | null) => void;
}

const ServiceItem = ({ service, index, videoRef }: ServiceItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Auto-play videos when component mounts
  useEffect(() => {
    if (service.videoUrl) {
      const videoElement = document.getElementById(
        `service-video-${service.id}`
      ) as HTMLVideoElement;
      if (videoElement) {
        videoElement.play().catch(error => {
          console.log('Video autoplay prevented:', error);
        });
      }
    }
  }, [service.id, service.videoUrl]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: { duration: 0.4 },
        opacity: { duration: 0.4, delay: 0.1 },
      },
    },
  };

  // Alternate layout for even/odd items
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-lg hover:shadow-[#FF7A35]/10"
    >
      {/* Accent line */}
      <motion.div
        className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#FF7A35] to-[#FF9A65] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
      />

      <div className={cn('flex flex-col md:flex-row', !isEven && 'md:flex-row-reverse')}>
        {/* Image or Video section */}
        <div className="relative h-64 w-full md:w-2/5">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2027]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {service.videoUrl ? (
            <video
              id={`service-video-${service.id}`}
              ref={videoRef}
              src={service.videoUrl}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <Image
              src={
                service.imageUrl || '/placeholder.svg?height=400&width=600&query=digital+technology'
              }
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-[#FF7A35]">
              {service.icon}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="flex flex-1 flex-col p-6 md:p-8">
          <h3 className="mb-4 text-2xl font-semibold text-[#1A2027]">
            <span className="relative">
              {service.title}
              <motion.span
                className="absolute -left-4 top-1/2 h-6 w-1 -translate-y-1/2 bg-[#FF7A35] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                initial={{ height: 0 }}
                whileInView={{ height: 24 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              />
            </span>
          </h3>

          <p className="mb-6 text-[#3D5A73]/80">{service.description}</p>

          {/* Technologies */}
          <div className="mb-6">
            <p className="mb-2 text-sm font-medium text-[#1A2027]">Eingesetzte Technologien</p>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <Badge key={idx} variant="outline" className="bg-[#F8FAFC]">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Toggle button */}
          <div className="mt-auto flex justify-between">
            <Link href={service.link}>
              <Button
                variant="ghost"
                className="group relative overflow-hidden rounded-full border border-[#1A2027] px-6 py-2 text-[#1A2027] transition-all duration-300 hover:border-transparent hover:text-white"
              >
                <span className="relative z-10 flex items-center">
                  <span>Mehr erfahren</span>
                  <motion.div
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                    initial={{ x: -5, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-r from-[#1A2027] to-[#2A3F56] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleExpand}
              className="flex items-center gap-1 text-[#3D5A73] hover:text-[#FF7A35]"
            >
              <span>{isExpanded ? 'Weniger anzeigen' : 'Details anzeigen'}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable details section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            variants={expandVariants}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 p-8">
              <div className="grid gap-8 md:grid-cols-2">
                {/* Left column */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-[#1A2027]">Ihre Vorteile</h4>
                  <ul className="space-y-3">
                    {service.benefitPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-[#FF7A35]/10 p-1 text-[#FF7A35]">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-[#3D5A73]">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <h4 className="mb-4 text-lg font-medium text-[#1A2027]">Anwendungsfälle</h4>
                    <div className="space-y-3">
                      {service.useCases.map((useCase, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-[#3D5A73]/10 bg-[#F8FAFC] p-3"
                        >
                          <h5 className="font-medium text-[#1A2027]">{useCase.title}</h5>
                          <p className="mt-1 text-sm text-[#3D5A73]">{useCase.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div>
                  <h4 className="mb-4 text-lg font-medium text-[#1A2027]">Erfolgsbeispiel</h4>
                  <div className="rounded-lg bg-gradient-to-br from-[#1A2027] to-[#2A3F56] p-6 text-white">
                    <h5 className="mb-2 text-xl font-semibold">{service.caseStudy.title}</h5>
                    <div className="mb-4 inline-block rounded-full bg-[#FF7A35] px-3 py-1 text-sm font-medium">
                      {service.caseStudy.result}
                    </div>
                    <p className="text-white/90">{service.caseStudy.description}</p>

                    <div className="mt-6">
                      <Link href={`${service.link}/case-studies`}>
                        <Button className="w-full bg-white/10 text-white hover:bg-white/20">
                          Weitere Erfolgsgeschichten
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href={service.link}>
                      <Button className="w-full bg-[#FF7A35] text-white hover:bg-[#FF7A35]/90">
                        Mehr zu {service.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ServiceList;
