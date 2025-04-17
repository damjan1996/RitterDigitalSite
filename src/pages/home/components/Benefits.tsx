// src/pages/home/components/Benefits.tsx
import React from 'react';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/common/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/common/icon-with-fallback';
import { cn } from '@/lib/utils';
import { BENEFITS } from '@/lib/constants';
import { CheckCircle, Award, Users, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Farbdefinitionen aus dem Farbschema - konsistent mit anderen Komponenten
const colors = {
    primary: '#23282D', // Primarna boja za strukturiranje
    secondary: '#50697D', // Glavna boja za pozadinske
    accent: '#FF8A4C', // Akcentna boja za isticanje
    background: '#F4F5F8', // Osnovna boja za pozadinu
    secondaryAccent: '#3A4F66' // Sekundarna akcentna boja
};

interface BenefitItem {
    title: string;
    description: string;
    icon?: React.ReactNode;
}

interface BenefitsProps {
    title?: string;
    subtitle?: string;
    benefits?: BenefitItem[];
    className?: string;
}

export const Benefits: React.FC<BenefitsProps> = ({
                                                      title = "Warum Ritter Digital wählen?",
                                                      subtitle = "Erfahren Sie, wie wir Ihr Unternehmen mit unseren digitalen Lösungen auf die nächste Stufe bringen",
                                                      benefits = [],
                                                      className,
                                                  }) => {
    // Default-Benefits verwenden, wenn keine angegeben wurden
    const displayBenefits = benefits.length > 0 ? benefits : [
        {
            title: "Stručnost u digitalnim procesima",
            description: "Optimizujemo vaše poslovne procese za maksimalnu efikasnost i rast",
            icon: <CheckCircle className="h-8 w-8 text-[#FF8A4C]" />,
        },
        {
            title: "Donošenje odluka na osnovu podataka",
            description: "Pružamo vam pravovremene uvide koji vode ka profitabilnijim poslovnim odlukama",
            icon: <TrendingUp className="h-8 w-8 text-[#3A4F66]" />,
        },
        {
            title: "Prilagođena rešenja",
            description: "Razvijamo softver koji tačno odgovara vašim jedinstvenim poslovnim potrebama",
            icon: <Award className="h-8 w-8 text-[#FF8A4C]" />,
        },
        {
            title: "Dokazano iskustvo",
            description: "20+ godina iskustva i više od 90 zadovoljnih klijenata širom sveta",
            icon: <Users className="h-8 w-8 text-[#3A4F66]" />,
        },
        {
            title: "Dugoročno partnerstvo",
            description: "Ne nudimo samo rešenja, već i kontinuiranu podršku za održivi rast vašeg poslovanja",
            icon: <Clock className="h-8 w-8 text-[#FF8A4C]" />,
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
        }
    };

    return (
      <section className={cn("py-16 md:py-24 bg-white", className)}>
          <Container>
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
                    className="mb-16"
                  />
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={containerVariants}
              >
                  {displayBenefits.map((benefit, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Card
                          className="border border-[#F4F5F8] shadow-sm hover:shadow-md transition-all duration-300 h-full overflow-hidden"
                        >
                            {/* Subtle accent line at the top with alternating colors */}
                            <div className={`h-1 ${index % 2 === 0 ? 'bg-[#FF8A4C]' : 'bg-[#3A4F66]'}`} />

                            <CardContent className="pt-6">
                                <motion.div
                                  className="flex flex-col items-center text-center"
                                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                                >
                                    <motion.div
                                      className={`mb-4 p-3 rounded-full ${index % 2 === 0 ? 'bg-[#FF8A4C]/10' : 'bg-[#3A4F66]/10'}`}
                                      whileHover={{
                                          scale: 1.1,
                                          backgroundColor: index % 2 === 0 ? 'rgba(255, 138, 76, 0.2)' : 'rgba(58, 79, 102, 0.2)',
                                          transition: { duration: 0.3 }
                                      }}
                                    >
                                        {benefit.icon || <CheckCircle className="h-8 w-8 text-[#FF8A4C]" />}
                                    </motion.div>
                                    <motion.h3
                                      className="text-xl font-semibold text-[#23282D] mb-3"
                                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                    >
                                        {benefit.title}
                                    </motion.h3>
                                    <p className="text-[#50697D]">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            </CardContent>

                            {/* Subtle accent in the corner */}
                            <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-5 ${index % 2 === 0 ? 'bg-[#FF8A4C]' : 'bg-[#3A4F66]'}`}></div>
                        </Card>
                    </motion.div>
                  ))}
              </motion.div>
          </Container>
      </section>
    );
};

export default Benefits;