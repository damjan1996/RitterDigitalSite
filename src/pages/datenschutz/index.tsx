'use client';

import { ArrowLeft, FileText, Lock, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

import { SEO } from '@/components/common/seo';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils';

export default function DatenschutzPage() {
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

  // Privacy policy sections
  const sections = [
    {
      id: 'verantwortliche',
      title: '1. Verantwortliche Stelle',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten
            im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          </p>
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
            <div className="mt-4 border-t border-[#3D5A73]/10 pt-4">
              <p className="text-[#3D5A73]">
                Telefon: (+49) 0208 306 74 850
                <br />
                E-Mail: team@ritterdigital.de
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'erhebung',
      title: '2. Erhebung und Speicherung personenbezogener Daten',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <p className="text-[#3D5A73]">
          Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung oder bei
          einer Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) freiwillig mitteilen.
          Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Wir
          verwenden die von Ihnen mitgeteilten Daten zur Vertragsabwicklung und zur Bearbeitung
          Ihrer Anfragen.
        </p>
      ),
    },
    {
      id: 'cookies',
      title: '3. Cookies und Webanalyse',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien, die
            auf Ihrem Endgerät gespeichert werden und die bestimmte Einstellungen und Daten zum
            Austausch mit unserem System über Ihren Browser speichern.
          </p>
          <p className="mb-6 text-[#3D5A73]">
            Wir verwenden sowohl technisch notwendige Cookies, ohne die die Funktionalität unserer
            Website eingeschränkt wäre, als auch optionale Cookies zu Analyse- und Marketingzwecken.
            Sie können Ihre Einwilligung zur Verwendung optionaler Cookies jederzeit über unser
            Cookie-Banner anpassen.
          </p>

          <div className="mb-6 space-y-6">
            <div className="rounded-lg border border-[#3D5A73]/10 p-5">
              <h3 className="mb-3 text-lg font-medium text-[#1A2027]">3.1 Google Analytics</h3>
              <p className="mb-3 text-[#3D5A73]">
                Diese Website nutzt, vorbehaltlich Ihrer Einwilligung, Google Analytics, einen
                Webanalysedienst der Google Ireland Limited. Verantwortlicher für die
                Datenverarbeitung ist die Google Ireland Limited, Gordon House, Barrow Street,
                Dublin 4, Irland.
              </p>
              <p className="text-[#3D5A73]">
                Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch
                Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung
                dieser Website werden in der Regel an einen Server von Google in den USA übertragen
                und dort gespeichert.
              </p>
            </div>

            <div className="rounded-lg border border-[#3D5A73]/10 p-5">
              <h3 className="mb-3 text-lg font-medium text-[#1A2027]">3.2 LeadInfo</h3>
              <p className="text-[#3D5A73]">
                Auf dieser Website werden mit Technologien der LeadInfo GmbH (Hannover, Deutschland)
                Daten zu Marketing- und Optimierungszwecken gesammelt und gespeichert. Aus diesen
                Daten können unter einem Pseudonym Nutzungsprofile erstellt werden. Hierzu können
                Cookies eingesetzt werden, die jedoch ausschließlich mit Ihrer Einwilligung gesetzt
                werden.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: 'kontakt',
      title: '4. Kontaktformular und E-Mail-Kontakt',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
            der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p className="text-[#3D5A73]">
            Für die Verarbeitung Ihrer Daten im Rahmen des Kontaktformulars holen wir Ihre
            Einwilligung ein und verweisen dazu auf diese Datenschutzerklärung.
          </p>
        </>
      ),
    },
    {
      id: 'newsletter',
      title: '5. Newsletter',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von
            Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten,
            dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des
            Newsletters einverstanden sind.
          </p>
          <p className="mb-4 text-[#3D5A73]">
            Wir verwenden für den Versand unseres Newsletters das Verfahren des Double-Opt-In, d.h.
            wir werden Ihnen erst dann Newsletter zusenden, wenn Sie Ihre Anmeldung über eine Ihnen
            zu diesem Zweck zugesandte Bestätigungs-E-Mail per darin enthaltenem Link bestätigen.
          </p>
          <p className="text-[#3D5A73]">
            Ihre Einwilligung zum Empfang des Newsletters können Sie jederzeit widerrufen und somit
            das Newsletter-Abonnement kündigen. Den Widerruf können Sie durch Klick auf den in jeder
            Newsletter-E-Mail bereitgestellten Link oder durch eine Nachricht an die oben
            angegebenen Kontaktdaten erklären.
          </p>
        </>
      ),
    },
    {
      id: 'rechte',
      title: '6. Ihre Rechte',
      icon: <Shield className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">Sie haben das Recht:</p>
          <ul className="mb-4 space-y-3 text-[#3D5A73]">
            {[
              'gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;',
              'gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;',
              'gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;',
              'gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen;',
              'gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;',
              'gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen;',
              'gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren.',
            ].map((right, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-[#FF7A35]/20" />
                <span>{right}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: 'sicherheit',
      title: '7. Datensicherheit',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <p className="text-[#3D5A73]">
          Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket
          Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser
          unterstützt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung.
          Falls Ihr Browser keine 256-Bit Verschlüsselung unterstützt, greifen wir stattdessen auf
          128-Bit v3 Technologie zurück.
        </p>
      ),
    },
    {
      id: 'aktualitaet',
      title: '8. Aktualität und Änderung dieser Datenschutzerklärung',
      icon: <FileText className="h-5 w-5" />,
      content: (
        <>
          <p className="mb-4 text-[#3D5A73]">
            Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2023.
          </p>
          <p className="text-[#3D5A73]">
            Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund
            geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden,
            diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann
            jederzeit auf dieser Website von Ihnen abgerufen werden.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Datenschutzerklärung"
        description="Informationen zum Datenschutz bei der RITTER Gesellschaft für digitale Geschäftsprozesse mbH"
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
                  Datenschutzerklärung
                  <span className="text-[#FF7A35]">.</span>
                </h1>
              </div>

              <p className="text-[#3D5A73]">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Hier erfahren Sie, wie
                wir mit Ihren Daten umgehen.
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
