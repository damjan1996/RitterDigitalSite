# scripts/output_migration_files.py
import os
from pathlib import Path

def output_migration_files():
    """Gibt alle wichtigen Dateien für die App Router Migration aus"""

    project_root = Path(r"C:\Users\damja\WebstormProjects\RitterDigitalSite")

    # Liste der wichtigen Dateien für die Migration
    files_to_output = [
        # Layout-Komponenten (Höchste Priorität)
        "src/components/layout/cookie-banner.tsx",
        "src/components/layout/header.tsx",
        "src/components/layout/navigation.tsx",
        "src/components/layout/mobile-navigation.tsx",
        "src/components/layout/footer.tsx",
        "src/app/layout.tsx",

        # Homepage-Komponenten
        "src/app/page.tsx",
        "src/components/pages/home/Hero.tsx",
        "src/components/pages/home/CTAForm.tsx",

        # UI-Komponenten
        "src/components/common/cta-button.tsx",
        "src/components/ui/button.tsx",
        "src/components/ui/form.tsx",

        # Hooks und Utilities
        "src/hooks/use-analytics.ts",
        "src/lib/analytics.ts",

        # Weitere wichtige Komponenten
        "src/components/pages/home/ServiceTeaser.tsx",
        "src/components/pages/home/Benefits.tsx",
        "src/components/pages/home/References.tsx",
        "src/components/pages/home/Clients.tsx",

        # Validation
        "src/lib/validation.ts",

        # API Routes (neue)
        "src/app/api/contact/route.ts",
        "src/app/api/newsletter/route.ts",
    ]

    print("=" * 80)
    print("🔍 APP ROUTER MIGRATION - DATEI AUSGABE")
    print("=" * 80)
    print(f"Projektverzeichnis: {project_root}")
    print(f"Anzahl Dateien: {len(files_to_output)}")
    print("=" * 80)

    # Statistiken
    found_files = 0
    missing_files = 0

    for file_path in files_to_output:
        full_path = project_root / file_path

        print(f"\n{'='*60}")
        print(f"📄 DATEI: {file_path}")
        print(f"{'='*60}")

        if full_path.exists():
            found_files += 1
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                print(f"✅ Gefunden: {full_path}")
                print(f"📏 Größe: {len(content)} Zeichen")
                print(f"📋 Inhalt:")
                print("-" * 40)
                print(content)
                print("-" * 40)

            except Exception as e:
                print(f"❌ Fehler beim Lesen: {e}")

        else:
            missing_files += 1
            print(f"⚠️  NICHT GEFUNDEN: {full_path}")
            print("💡 Diese Datei muss möglicherweise noch erstellt werden.")

    # Zusammenfassung
    print(f"\n{'='*80}")
    print("📊 ZUSAMMENFASSUNG")
    print(f"{'='*80}")
    print(f"✅ Gefundene Dateien: {found_files}")
    print(f"⚠️  Fehlende Dateien: {missing_files}")
    print(f"📁 Gesamtanzahl: {len(files_to_output)}")

    if missing_files > 0:
        print(f"\n💡 HINWEISE:")
        print("- Fehlende Dateien werden bei der Migration automatisch erstellt")
        print("- Oder sind bereits in der neuen App Router Struktur vorhanden")

    print(f"\n🎯 NÄCHSTE SCHRITTE:")
    print("1. Kopieren Sie die Dateiinhalte in Claude")
    print("2. Claude wird alle Anpassungen vornehmen")
    print("3. Erstellen/Überschreiben Sie die Dateien mit den neuen Inhalten")
    print("4. Server neustarten: npm run dev")

    return found_files, missing_files

if __name__ == "__main__":
    try:
        found, missing = output_migration_files()
        print(f"\n🎉 Script erfolgreich ausgeführt!")
        print(f"📋 {found} Dateien ausgegeben, {missing} Dateien fehlen")

    except Exception as e:
        print(f"\n❌ Script-Fehler: {e}")
        print("💡 Überprüfen Sie den Projektpfad und die Berechtigung")