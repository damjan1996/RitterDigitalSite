// src/pages/datenschutz/index.tsx
import React from 'react';
import Head from 'next/head';
import { Container } from '@/components/ui/container';
import { SEO } from '@/components/common/seo';

export default function DatenschutzPage() {
    return (
        <>
            <SEO
                title="Datenschutzerklärung"
                description="Informationen zum Datenschutz bei der Ritter Digital GmbH"
                noindex={false}
            />

            <div className="bg-background py-12 md:py-16">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">Datenschutzerklärung</h1>

                        <div className="prose prose-lg max-w-none bg-white p-8 rounded-lg shadow-sm">
                            <h2>1. Verantwortliche Stelle</h2>
                            <p>
                                Verantwortlich für die Erhebung, Verarbeitung und Nutzung Ihrer personenbezogenen Daten im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
                            </p>
                            <p>
                                <strong>Ritter Digital GmbH</strong><br />
                                Musterstraße 123<br />
                                12345 Musterstadt<br />
                                Deutschland
                            </p>
                            <p>
                                Telefon: +49 (0) 123 456 789<br />
                                E-Mail: kontakt@ritterdigital.de
                            </p>

                            <h2>2. Erhebung und Speicherung personenbezogener Daten</h2>
                            <p>
                                Wir erheben personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung oder bei einer Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) freiwillig mitteilen. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Wir verwenden die von Ihnen mitgeteilten Daten zur Vertragsabwicklung und zur Bearbeitung Ihrer Anfragen.
                            </p>

                            <h2>3. Cookies und Webanalyse</h2>
                            <p>
                                Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden und die bestimmte Einstellungen und Daten zum Austausch mit unserem System über Ihren Browser speichern.
                            </p>
                            <p>
                                Wir verwenden sowohl technisch notwendige Cookies, ohne die die Funktionalität unserer Website eingeschränkt wäre, als auch optionale Cookies zu Analyse- und Marketingzwecken. Sie können Ihre Einwilligung zur Verwendung optionaler Cookies jederzeit über unser Cookie-Banner anpassen.
                            </p>

                            <h3>3.1 Google Analytics</h3>
                            <p>
                                Diese Website nutzt, vorbehaltlich Ihrer Einwilligung, Google Analytics, einen Webanalysedienst der Google Ireland Limited. Verantwortlicher für die Datenverarbeitung ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
                            </p>
                            <p>
                                Google Analytics verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                            </p>
                            <p>
                                Wir haben die IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
                            </p>

                            <h3>3.2 LeadInfo</h3>
                            <p>
                                Auf dieser Website werden mit Technologien der LeadInfo GmbH (Hannover, Deutschland) Daten zu Marketing- und Optimierungszwecken gesammelt und gespeichert. Aus diesen Daten können unter einem Pseudonym Nutzungsprofile erstellt werden. Hierzu können Cookies eingesetzt werden, die jedoch ausschließlich mit Ihrer Einwilligung gesetzt werden.
                            </p>

                            <h2>4. Kontaktformular und E-Mail-Kontakt</h2>
                            <p>
                                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                            </p>
                            <p>
                                Für die Verarbeitung Ihrer Daten im Rahmen des Kontaktformulars holen wir Ihre Einwilligung ein und verweisen dazu auf diese Datenschutzerklärung.
                            </p>

                            <h2>5. Newsletter</h2>
                            <p>
                                Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
                            </p>
                            <p>
                                Wir verwenden für den Versand unseres Newsletters das Verfahren des Double-Opt-In, d.h. wir werden Ihnen erst dann Newsletter zusenden, wenn Sie Ihre Anmeldung über eine Ihnen zu diesem Zweck zugesandte Bestätigungs-E-Mail per darin enthaltenem Link bestätigen.
                            </p>
                            <p>
                                Ihre Einwilligung zum Empfang des Newsletters können Sie jederzeit widerrufen und somit das Newsletter-Abonnement kündigen. Den Widerruf können Sie durch Klick auf den in jeder Newsletter-E-Mail bereitgestellten Link oder durch eine Nachricht an die oben angegebenen Kontaktdaten erklären.
                            </p>

                            <h2>6. Ihre Rechte</h2>
                            <p>
                                Sie haben das Recht:
                            </p>
                            <ul>
                                <li>gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;</li>
                                <li>gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
                                <li>gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
                                <li>gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen;</li>
                                <li>gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesebaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</li>
                                <li>gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen;</li>
                                <li>gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren.</li>
                            </ul>

                            <h2>7. Datensicherheit</h2>
                            <p>
                                Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von Ihrem Browser unterstützt wird. In der Regel handelt es sich dabei um eine 256 Bit Verschlüsselung. Falls Ihr Browser keine 256-Bit Verschlüsselung unterstützt, greifen wir stattdessen auf 128-Bit v3 Technologie zurück.
                            </p>

                            <h2>8. Aktualität und Änderung dieser Datenschutzerklärung</h2>
                            <p>
                                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Mai 2023.
                            </p>
                            <p>
                                Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website von Ihnen abgerufen werden.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export function getStaticProps() {
    return {
        props: {}
    };
}