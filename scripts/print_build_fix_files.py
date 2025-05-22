#!/usr/bin/env python3
"""
Script zum Ausgeben aller Dateien, die für die Behebung der Build-Probleme benötigt werden.
Fokus auf NextRouter-Fehler und ESLint-Warnungen.
"""

import os
import sys

def print_file_content(file_path, base_path):
    """Gibt den Inhalt einer Datei aus, falls sie existiert."""
    full_path = os.path.join(base_path, file_path)

    print(f"\n{'='*80}")
    print(f"DATEI: {file_path}")
    print(f"VOLLSTÄNDIGER PFAD: {full_path}")
    print(f"{'='*80}")

    try:
        with open(full_path, 'r', encoding='utf-8') as file:
            content = file.read()
            print(content)
    except FileNotFoundError:
        print(f"❌ DATEI NICHT GEFUNDEN: {full_path}")
    except UnicodeDecodeError:
        try:
            with open(full_path, 'r', encoding='latin-1') as file:
                content = file.read()
                print(content)
        except Exception as e:
            print(f"❌ FEHLER BEIM LESEN DER DATEI: {e}")
    except Exception as e:
        print(f"❌ UNERWARTETER FEHLER: {e}")

def main():
    # Basis-Pfad des Projekts
    base_path = r"C:\Users\damja\WebstormProjects\RitterDigitalSite"

    # Prioritätsliste der Dateien für Build-Fix
    critical_files = [
        # Kritische Dateien für NextRouter-Fehler
        "src/app/datenschutz/page.tsx",
        "src/app/impressum/page.tsx",
        "src/app/layout.tsx",

        # Konfigurationsdateien
        "next.config.js",
        "src/config/seo.ts",

        # API-Routes mit ESLint-Warnungen
        "src/app/api/contact/route.ts",
        "src/app/api/newsletter/route.ts",

        # Komponenten mit ESLint-Warnungen
        "src/components/pages/leistungen/Hero.tsx",
        "src/components/pages/leistungen/ServiceList.tsx",
        "src/lib/improved-analytics.ts",

        # Zusätzliche wichtige Dateien
        "src/components/pages/karriere/ApplicationForm.tsx",
        "package.json",
        "tsconfig.json"
    ]

    print("🔧 BUILD-FIX DATEIEN ANALYSE")
    print("="*80)
    print("Analysiere Dateien für folgende Probleme:")
    print("1. NextRouter was not mounted (datenschutz, impressum)")
    print("2. metadataBase is not set Warning")
    print("3. ESLint-Warnungen (console.log, unused variables)")
    print("4. Mögliche App/Pages Router Konflikte")

    # Überprüfe ob Basis-Pfad existiert
    if not os.path.exists(base_path):
        print(f"❌ FEHLER: Basis-Pfad nicht gefunden: {base_path}")
        print("Bitte passe den base_path in der main() Funktion an.")
        sys.exit(1)

    print(f"\n📁 Basis-Verzeichnis: {base_path}")
    print(f"📋 Anzahl zu analysierende Dateien: {len(critical_files)}")

    # Gebe alle kritischen Dateien aus
    for file_path in critical_files:
        print_file_content(file_path, base_path)

    print(f"\n{'='*80}")
    print("✅ ANALYSE ABGESCHLOSSEN")
    print("="*80)
    print("ZUSAMMENFASSUNG DER HAUPTPROBLEME:")
    print("1. NextRouter-Fehler: Wahrscheinlich useRouter aus 'next/router' statt 'next/navigation'")
    print("2. metadataBase: Muss in src/config/seo.ts oder layout.tsx gesetzt werden")
    print("3. ESLint: console.log entfernen, ungenutzte Variablen bereinigen")
    print("4. Duplizierte Strukturen: App Router vs Pages Router aufräumen")

if __name__ == "__main__":
    main()