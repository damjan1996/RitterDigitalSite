'use client';

import { ArrowLeft, Building, FileText, LinkIcon, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { SEO } from '@/components/common/seo';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export default function ImpressumPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Add offset for better UX

      // Find the section that is currently in view
      const currentSection = Object.entries(sectionRefs.current)
        .filter(([_, element]) => element !== null)
        .find(([_, element]) => {
          if (!element) return false;
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          return scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight;
        });

      if (currentSection) {
        setActiveSection(currentSection[0]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Imprint sections
  const sections = [
    {
      id: 'angaben',
      title: '1. Angaben gemäß § 5 TMG',
      icon: <Building className="h-5 w-5" />,
      content: (
        <>
          <div className="mb-4 rounded-lg bg-[#F8F9FC] p-6">
            <p className="mb-2 font-medium text-[#1A2027]">
              <strong>RITTER Gesellschaft für digitale Geschäftsprozesse mbH</strong>
            </p>
            <p className="text-[#3D5A73]">
              Essener Straße 2-24
              <br />
              46047 Oberhausen
              <br />
              Deutschland
            </p>
          </div>

          <h3 className="mb-3 text-lg font-medium text-[#1A2027]">Vertreten durch</h3>
          <p className="mb-4 text-[#3D5A73]">Peter Heim, Geschäftsführer</p>

          <h3 className="mb-3 text-lg font-medium text-[#1A2027]">Kontakt</h3>
          <p className="mb-4 text-[#3D5A73]">
            Telefon: (+49) 0208 306 74 850
            <br />
            E-Mail: team@ritterdigital.de
          </p>

          <h3 className="mb-3 text-lg font-medium text-[#1A2027]">Registereintrag</h3>
          <p className="text-[#3D5A73]">
            Eintragung im Handelsregister.
            <br />
            Registergericht: Handelsregister Duisburg
            <br />
            Registernummer: HRB 37173
          </p>
        </>
      ),
    },
    {
      id: 'haftung',
      title: '2. Haftungsbeschränkung',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <p className="text-[#3D5A73]">
          Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Der Anbieter
          übernimmt jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität der
          bereitgestellten Inhalte. Die Nutzung der Inhalte der Website erfolgt auf eigene Gefahr
          des Nutzers. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors
          und nicht immer die Meinung des Anbieters wieder. Mit der reinen Nutzung der Website des
          Anbieters kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter
          zustande.
        </p>
      ),
    },
    {
      id: 'links',
      title: '3. Externe Links',
      icon: <LinkIcon className="h-5 w-5" />,
      content: (
        <p className="text-[#3D5A73]">
          Diese Website enthält Verknüpfungen zu Websites Dritter („externe Links&#34;). Diese
          Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der
          erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob
          etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich.
          Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die
          Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich
          der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine
          ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf
          Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige
          externe Links unverzüglich gelöscht.
        </p>
      ),
    },
    {
      id: 'urheberrecht',
      title: '4. Urheber- und Leistungsschutzrechte',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und
            Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht
            zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder
            jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung,
            Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken
            oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei
            als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner
            Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die
            Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht
            kommerziellen Gebrauch ist erlaubt.
          </p>
          <p className="text-[#3D5A73]">
            Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis
            zulässig.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Impressum"
        description="Impressum der RITTER Gesellschaft für digitale Geschäftsprozesse mbH"
        noindex={false}
      />

      <div className="relative w-full bg-white">
        <Container className="py-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            {/* Header */}
            <div className="mb-8">
              <div className="mb-2">
                <Link href="/" className="flex items-center gap-2 text-sm text-[#3D5A73]">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Zurück zur Startseite</span>
                </Link>
              </div>

              <div className="mb-4">
                <h1 className="text-4xl font-medium text-[#1A2027]">
                  Impressum
                  <span className="text-[#FF7A35]">.</span>
                </h1>
              </div>

              <p className="text-[#3D5A73]">
                Hier finden Sie alle rechtlich relevanten Informationen zu unserem Unternehmen.
              </p>
            </div>

            {/* Content */}
            <div className="grid gap-12 md:grid-cols-[220px_1fr]">
              {/* Navigation sidebar */}
              <div className="md:sticky md:top-24 md:self-start">
                <div className="space-y-6">
                  {sections.map(section => {
                    const sectionTitle = section.title.split('. ')[1];
                    return (
                      <div key={section.id} className="flex items-start">
                        <button
                          className={cn(
                            'flex w-full items-start gap-2 text-left text-sm',
                            activeSection === section.id && 'font-medium text-[#FF7A35]'
                          )}
                          onClick={() => scrollToSection(section.id)}
                        >
                          <div
                            className={cn(
                              'mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center',
                              activeSection === section.id ? 'text-[#FF7A35]' : 'text-[#3D5A73]'
                            )}
                          >
                            {section.icon}
                          </div>
                          <span
                            className={cn(
                              activeSection === section.id ? 'text-[#FF7A35]' : 'text-[#3D5A73]'
                            )}
                          >
                            {sectionTitle}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Main content */}
              <div className="w-full">
                <div className="space-y-12">
                  {sections.map(section => (
                    <div
                      key={section.id}
                      id={section.id}
                      ref={(el: HTMLDivElement | null) => {
                        sectionRefs.current[section.id] = el;
                      }}
                      className={cn(
                        'scroll-mt-24',
                        activeSection === section.id && 'rounded-lg bg-[#F8F9FC] p-6'
                      )}
                    >
                      <div className="mb-4 flex items-start gap-2">
                        <div
                          className={cn(
                            'mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center',
                            activeSection === section.id ? 'text-[#FF7A35]' : 'text-[#3D5A73]'
                          )}
                        >
                          {section.icon}
                        </div>
                        <h2 className="text-xl font-medium text-[#1A2027]">{section.title}</h2>
                      </div>
                      <div className="ml-8">{section.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
