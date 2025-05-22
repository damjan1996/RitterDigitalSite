# scripts/run_migration.py
import subprocess
import sys
import os
from pathlib import Path

def run_migration():
    """Führt die App Router Migration aus"""

    # Prüfe ob wir im richtigen Verzeichnis sind
    project_root = Path(r"C:\Users\damja\WebstormProjects\RitterDigitalSite")

    if not project_root.exists():
        print("❌ Projektverzeichnis nicht gefunden!")
        print(f"Erwartet: {project_root}")
        return False

    # Prüfe ob src/pages existiert
    pages_dir = project_root / "src" / "pages"
    if not pages_dir.exists():
        print("❌ src/pages Verzeichnis nicht gefunden!")
        return False

    print("🔍 Projektverzeichnis gefunden")
    print("🔍 src/pages Verzeichnis gefunden")
    print("\n⚠️  WICHTIG: Diese Migration wird Ihre Projektstruktur ändern!")
    print("📦 Ein Backup wird automatisch erstellt.")

    # Bestätigung vom Nutzer
    response = input("\n🤔 Möchten Sie mit der Migration fortfahren? (j/n): ")

    if response.lower() not in ['j', 'ja', 'y', 'yes']:
        print("❌ Migration abgebrochen.")
        return False

    try:
        # Migration Script importieren und ausführen
        sys.path.append(str(project_root / "scripts"))
        from migrate_to_app_router import AppRouterMigration

        migration = AppRouterMigration(str(project_root))
        migration.run_migration()

        return True

    except ImportError:
        print("❌ Migration Script nicht gefunden!")
        print("Stellen Sie sicher, dass migrate_to_app_router.py im scripts/ Ordner liegt.")
        return False
    except Exception as e:
        print(f"❌ Migration fehlgeschlagen: {e}")
        return False

if __name__ == "__main__":
    success = run_migration()

    if success:
        print("\n🎉 Migration abgeschlossen!")
        print("\n📋 Nächste Schritte:")
        print("1. npm run dev - Server starten und testen")
        print("2. Alle Routen überprüfen")
        print("3. API Endpoints testen")
        print("4. Bei Erfolg: pages/ Ordner löschen")
    else:
        print("\n💡 Bei Problemen:")
        print("1. Überprüfen Sie den Projektpfad")
        print("2. Stellen Sie sicher, dass alle Dateien existieren")
        print("3. Kontaktieren Sie den Support")