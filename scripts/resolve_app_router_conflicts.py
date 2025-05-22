# scripts/resolve_app_router_conflicts.py
import os
import shutil
from datetime import datetime
from pathlib import Path

class AppRouterConflictResolver:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.src_dir = self.project_root / "src"
        self.pages_dir = self.src_dir / "pages"
        self.app_dir = self.src_dir / "app"
        self.backup_dir = self.project_root / f"pages_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        # Liste der konfliktträchtigen Dateien
        self.conflicting_files = [
            "src/pages/index.tsx",
            "src/pages/api/contact/index.ts",
            "src/pages/api/newsletter/index.ts",
            "src/pages/datenschutz/index.tsx",
            "src/pages/karriere/index.tsx",
            "src/pages/impressum/index.tsx",
            "src/pages/ueber-uns/index.tsx",
            "src/pages/leistungen/index.tsx",
            "src/pages/leistungen/business-intelligence/index.tsx",
            "src/pages/leistungen/digitalisierung/index.tsx",
            "src/pages/leistungen/jtl-wawi/index.tsx",
            "src/pages/leistungen/kuenstliche-intelligenz/index.tsx",
            "src/pages/leistungen/softwareentwicklung/index.tsx",
            "src/pages/leistungen/data-warehouse/index.tsx",
            "src/pages/leistungen/service/index.tsx",
            "src/pages/kontakt/index.tsx",
            "src/pages/_app.tsx",
            "src/pages/_document.tsx",
            "src/pages/404.tsx",
            "src/pages/500.tsx",
        ]

    def create_safety_backup(self):
        """Erstellt ein vollständiges Backup des pages Verzeichnisses"""
        print(f"📦 Erstelle Sicherheitsbackup in: {self.backup_dir}")

        if self.pages_dir.exists():
            shutil.copytree(self.pages_dir, self.backup_dir)
            print(f"✅ Backup erstellt: {self.backup_dir}")
            return True
        else:
            print("⚠️  Kein pages/ Verzeichnis gefunden")
            return False

    def verify_app_router_files(self):
        """Überprüft, ob alle notwendigen App Router Dateien vorhanden sind"""
        print("🔍 Überprüfe App Router Dateien...")

        required_app_files = [
            "src/app/layout.tsx",
            "src/app/page.tsx",
            "src/app/api/contact/route.ts",
            "src/app/api/newsletter/route.ts",
        ]

        missing_files = []
        for file_path in required_app_files:
            full_path = self.project_root / file_path
            if not full_path.exists():
                missing_files.append(file_path)

        if missing_files:
            print("❌ Fehlende App Router Dateien:")
            for file in missing_files:
                print(f"   - {file}")
            return False
        else:
            print("✅ Alle wichtigen App Router Dateien sind vorhanden")
            return True

    def remove_conflicting_files(self):
        """Entfernt die konfliktträchtigen Dateien aus dem pages Verzeichnis"""
        print("🗑️  Entferne konfliktträchtige Dateien...")

        removed_files = []
        for file_path in self.conflicting_files:
            full_path = self.project_root / file_path
            if full_path.exists():
                try:
                    full_path.unlink()
                    removed_files.append(file_path)
                    print(f"   ✅ Entfernt: {file_path}")
                except Exception as e:
                    print(f"   ❌ Fehler beim Entfernen von {file_path}: {e}")

        return removed_files

    def clean_empty_directories(self):
        """Entfernt leere Verzeichnisse im pages Ordner"""
        print("🧹 Bereinige leere Verzeichnisse...")

        def remove_empty_dirs(path):
            if not path.is_dir():
                return

            # Erst alle Unterverzeichnisse bereinigen
            for item in path.iterdir():
                if item.is_dir():
                    remove_empty_dirs(item)

            # Dann das aktuelle Verzeichnis, wenn es leer ist
            try:
                if path.exists() and not any(path.iterdir()):
                    path.rmdir()
                    print(f"   ✅ Leeres Verzeichnis entfernt: {path.relative_to(self.project_root)}")
            except OSError as e:
                # Verzeichnis nicht leer oder andere Probleme
                pass

        if self.pages_dir.exists():
            remove_empty_dirs(self.pages_dir)

            # Wenn pages komplett leer ist, auch dieses entfernen
            try:
                if not any(self.pages_dir.iterdir()):
                    self.pages_dir.rmdir()
                    print(f"   ✅ Komplettes pages/ Verzeichnis entfernt")
            except OSError:
                pass

    def update_imports_in_app_files(self):
        """Aktualisiert Imports in App Router Dateien"""
        print("🔧 Aktualisiere Imports in App Router Dateien...")

        # Finde alle TypeScript/JavaScript Dateien im app Verzeichnis
        app_files = []
        for ext in ['*.tsx', '*.ts', '*.jsx', '*.js']:
            app_files.extend(self.app_dir.rglob(ext))

        import_replacements = {
            'from "@/pages/': 'from "@/components/pages/',
            'from "../pages/': 'from "../components/pages/',
            'from "./pages/': 'from "./components/pages/',
            'import { NextPage }': '// import { NextPage } - Not needed in App Router',
            'export { getServerSideProps }': '// getServerSideProps not used in App Router',
            'export { getStaticProps }': '// getStaticProps not used in App Router',
        }

        for file_path in app_files:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                original_content = content

                # Führe alle Ersetzungen durch
                for old_import, new_import in import_replacements.items():
                    content = content.replace(old_import, new_import)

                # Nur schreiben wenn sich etwas geändert hat
                if content != original_content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"   ✅ Imports aktualisiert: {file_path.relative_to(self.project_root)}")

            except Exception as e:
                print(f"   ⚠️  Fehler beim Aktualisieren von {file_path}: {e}")

    def create_resolution_report(self, removed_files):
        """Erstellt einen Bericht über die Konfliktauflösung"""
        print("📊 Erstelle Auflösungsbericht...")

        report = f"""# App Router Konflikt-Auflösung Bericht
Datum: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Entfernte Dateien ({len(removed_files)})
"""

        for file in removed_files:
            report += f"- {file}\n"

        report += f"""
## Backup Location
{self.backup_dir}

## Nächste Schritte
1. Starten Sie den Entwicklungsserver: `npm run dev`
2. Testen Sie alle Routen im Browser
3. Überprüfen Sie die Funktionalität des Kontaktformulars
4. Bei Problemen können Sie das Backup verwenden

## App Router Dateien
Die folgenden neuen Dateien wurden erstellt:
- src/app/layout.tsx (Root Layout)
- src/app/page.tsx (Homepage)
- src/app/api/contact/route.ts (Contact API)
- src/app/api/newsletter/route.ts (Newsletter API)
- src/app/(marketing)/* (Marketing Seiten)

## Wichtige Hinweise
- Page Router (_app.tsx, _document.tsx) wurde durch App Router Layout ersetzt
- API Routes verwenden jetzt NextRequest/NextResponse
- Metadata wird jetzt über die Metadata API verwaltet
- Client Components müssen mit 'use client' markiert werden
"""

        report_file = self.project_root / "APP_ROUTER_MIGRATION_REPORT.md"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)

        print(f"✅ Bericht erstellt: {report_file}")

    def run_conflict_resolution(self):
        """Führt die komplette Konfliktauflösung durch"""
        print("🚀 Starte App Router Konflikt-Auflösung")
        print("=" * 60)

        try:
            # 1. Sicherheitsbackup erstellen
            backup_created = self.create_safety_backup()
            if not backup_created:
                print("⚠️  Kein Backup nötig - pages/ Verzeichnis existiert nicht")

            # 2. App Router Dateien überprüfen
            app_files_ok = self.verify_app_router_files()
            if not app_files_ok:
                print("❌ App Router Dateien unvollständig. Bitte erstellen Sie diese zuerst.")
                return False

            # 3. Konfliktträchtige Dateien entfernen
            removed_files = self.remove_conflicting_files()

            # 4. Leere Verzeichnisse bereinigen
            self.clean_empty_directories()

            # 5. Imports aktualisieren
            self.update_imports_in_app_files()

            # 6. Bericht erstellen
            self.create_resolution_report(removed_files)

            print("\n" + "=" * 60)
            print("🎉 Konfliktauflösung erfolgreich abgeschlossen!")
            print("\n📋 Nächste Schritte:")
            print("1. npm run dev - Server starten")
            print("2. http://localhost:3000 - Website testen")
            print("3. Alle Routen und Formulare prüfen")
            print(f"\n💾 Backup verfügbar unter: {self.backup_dir}")

            return True

        except Exception as e:
            print(f"\n❌ Konfliktauflösung fehlgeschlagen: {e}")
            print(f"💾 Backup verfügbar unter: {self.backup_dir}")
            return False

if __name__ == "__main__":
    # Projektstamm
    PROJECT_ROOT = r"C:\Users\damja\WebstormProjects\RitterDigitalSite"

    # Bestätigung vom Benutzer
    print("⚠️  WICHTIG: Diese Operation wird Page Router Dateien löschen!")
    print("📦 Ein vollständiges Backup wird erstellt.")
    print(f"📁 Projekt: {PROJECT_ROOT}")

    response = input("\n🤔 Möchten Sie fortfahren? (j/n): ")

    if response.lower() in ['j', 'ja', 'y', 'yes']:
        resolver = AppRouterConflictResolver(PROJECT_ROOT)
        success = resolver.run_conflict_resolution()

        if success:
            print("\n🎯 Sie können jetzt 'npm run dev' ausführen!")
        else:
            print("\n💡 Bei Problemen das Backup wiederherstellen.")
    else:
        print("❌ Operation abgebrochen.")