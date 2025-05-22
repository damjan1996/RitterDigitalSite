# scripts/migrate_to_app_router.py
import os
import shutil
import json
from datetime import datetime
from pathlib import Path

class AppRouterMigration:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.src_dir = self.project_root / "src"
        self.pages_dir = self.src_dir / "pages"
        self.app_dir = self.src_dir / "app"
        self.backup_dir = self.project_root / f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"

        # Migration mapping für Seiten
        self.page_migrations = {
            "index.tsx": "page.tsx",
            "home/index.tsx": "(site)/page.tsx",
            "leistungen/index.tsx": "(site)/leistungen/page.tsx",
            "leistungen/business-intelligence/index.tsx": "(site)/leistungen/business-intelligence/page.tsx",
            "leistungen/data-warehouse/index.tsx": "(site)/leistungen/data-warehouse/page.tsx",
            "leistungen/digitalisierung/index.tsx": "(site)/leistungen/digitalisierung/page.tsx",
            "leistungen/jtl-wawi/index.tsx": "(site)/leistungen/jtl-wawi/page.tsx",
            "leistungen/kuenstliche-intelligenz/index.tsx": "(site)/leistungen/kuenstliche-intelligenz/page.tsx",
            "leistungen/softwareentwicklung/index.tsx": "(site)/leistungen/softwareentwicklung/page.tsx",
            "leistungen/service/index.tsx": "(site)/leistungen/service/page.tsx",
            "ueber-uns/index.tsx": "(site)/ueber-uns/page.tsx",
            "kontakt/index.tsx": "(site)/kontakt/page.tsx",
            "karriere/index.tsx": "(site)/karriere/page.tsx",
            "impressum/index.tsx": "impressum/page.tsx",
            "datenschutz/index.tsx": "datenschutz/page.tsx",
            "404.tsx": "not-found.tsx",
            "500.tsx": "error.tsx"
        }

        # API Routes Migration
        self.api_migrations = {
            "api/contact/index.ts": "api/contact/route.ts",
            "api/newsletter/index.ts": "api/newsletter/route.ts"
        }

    def create_backup(self):
        """Erstellt ein Backup der aktuellen Struktur"""
        print(f"📦 Erstelle Backup in: {self.backup_dir}")

        if self.backup_dir.exists():
            shutil.rmtree(self.backup_dir)

        # Backup der src/pages Struktur
        backup_pages = self.backup_dir / "src" / "pages"
        backup_pages.parent.mkdir(parents=True, exist_ok=True)

        if self.pages_dir.exists():
            shutil.copytree(self.pages_dir, backup_pages)
            print(f"✅ Pages Backup erstellt")

        # Backup wichtiger Konfigurationsdateien
        config_files = ["package.json", "next.config.js", "tsconfig.json", "tailwind.config.js"]
        for config_file in config_files:
            src_file = self.project_root / config_file
            if src_file.exists():
                shutil.copy2(src_file, self.backup_dir / config_file)

        print(f"✅ Backup abgeschlossen")

    def create_app_structure(self):
        """Erstellt die neue App Router Struktur"""
        print("🏗️  Erstelle App Router Struktur")

        # App Router Ordnerstruktur
        app_dirs = [
            "(site)",
            "(site)/leistungen",
            "(site)/leistungen/business-intelligence",
            "(site)/leistungen/data-warehouse",
            "(site)/leistungen/digitalisierung",
            "(site)/leistungen/jtl-wawi",
            "(site)/leistungen/kuenstliche-intelligenz",
            "(site)/leistungen/softwareentwicklung",
            "(site)/leistungen/service",
            "(site)/ueber-uns",
            "(site)/kontakt",
            "(site)/karriere",
            "impressum",
            "datenschutz",
            "api/contact",
            "api/newsletter"
        ]

        for dir_path in app_dirs:
            full_path = self.app_dir / dir_path
            full_path.mkdir(parents=True, exist_ok=True)

        print("✅ App Router Ordnerstruktur erstellt")

    def migrate_pages(self):
        """Migriert die Page Router Seiten zu App Router"""
        print("📄 Migriere Seiten zu App Router")

        for old_path, new_path in self.page_migrations.items():
            src_file = self.pages_dir / old_path
            dest_file = self.app_dir / new_path

            if src_file.exists():
                # Erstelle Zielordner falls nicht vorhanden
                dest_file.parent.mkdir(parents=True, exist_ok=True)

                # Kopiere Datei
                shutil.copy2(src_file, dest_file)
                print(f"  ✅ {old_path} → {new_path}")
            else:
                print(f"  ⚠️  {old_path} nicht gefunden")

    def migrate_api_routes(self):
        """Migriert API Routes zu App Router Format"""
        print("🔌 Migriere API Routes")

        for old_path, new_path in self.api_migrations.items():
            src_file = self.pages_dir / old_path
            dest_file = self.app_dir / new_path

            if src_file.exists():
                dest_file.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src_file, dest_file)
                print(f"  ✅ {old_path} → {new_path}")
            else:
                print(f"  ⚠️  {old_path} nicht gefunden")

    def migrate_page_components(self):
        """Migriert Komponenten aus pages/ zu components/"""
        print("🧩 Migriere Page-spezifische Komponenten")

        page_component_dirs = [
            "home/components",
            "leistungen/components",
            "ueber-uns/components",
            "kontakt/components",
            "karriere/components"
        ]

        components_dir = self.src_dir / "components" / "pages"

        for page_comp_dir in page_component_dirs:
            src_dir = self.pages_dir / page_comp_dir
            if src_dir.exists():
                page_name = page_comp_dir.split('/')[0]
                dest_dir = components_dir / page_name
                dest_dir.parent.mkdir(parents=True, exist_ok=True)

                if dest_dir.exists():
                    shutil.rmtree(dest_dir)
                shutil.copytree(src_dir, dest_dir)
                print(f"  ✅ {page_comp_dir} → components/pages/{page_name}")

    def create_layout_files(self):
        """Erstellt die notwendigen Layout-Dateien"""
        print("📐 Erstelle Layout-Dateien")

        # Root Layout
        root_layout = '''// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CookieBanner } from '@/components/layout/cookie-banner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ritter Digital - Ihr Partner für digitale Transformation',
    template: '%s | Ritter Digital'
  },
  description: 'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung. Über 20 Jahre Erfahrung in der Digitalisierung von Geschäftsprozessen.',
  keywords: ['JTL WaWi', 'Business Intelligence', 'Softwareentwicklung', 'Digitalisierung'],
  authors: [{ name: 'Ritter Digital GmbH' }],
  creator: 'Ritter Digital GmbH',
  publisher: 'Ritter Digital GmbH',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://ritter-digital.de',
    siteName: 'Ritter Digital',
    title: 'Ritter Digital - Ihr Partner für digitale Transformation',
    description: 'Experten für JTL WaWi, Business Intelligence und Softwareentwicklung.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}'''

        # Marketing Layout
        marketing_layout = '''// src/app/(site)/layout.tsx
import { ReactNode } from 'react'

export default function MarketingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}'''

        # Leistungen Layout
        leistungen_layout = '''// src/app/(site)/leistungen/layout.tsx
import { ReactNode } from 'react'

export default function LeistungenLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="bg-gray-50">
      {children}
    </div>
  )
}'''

        # Error Boundary
        error_page = '''// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Etwas ist schiefgelaufen!</h2>
        <Button onClick={() => reset()}>
          Erneut versuchen
        </Button>
      </div>
    </div>
  )
}'''

        # Loading Component
        loading_page = '''// src/app/loading.tsx
import { LoadingSpinner } from '@/components/common/loading-spinner'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  )
}'''

        # Not Found
        not_found_page = '''// src/app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-gray-600 mb-6">Diese Seite konnte nicht gefunden werden.</p>
        <Button asChild>
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  )
}'''

        # Schreibe Layout-Dateien
        layouts = [
            (self.app_dir / "layout.tsx", root_layout),
            (self.app_dir / "(site)" / "layout.tsx", marketing_layout),
            (self.app_dir / "(site)" / "leistungen" / "layout.tsx", leistungen_layout),
            (self.app_dir / "error.tsx", error_page),
            (self.app_dir / "loading.tsx", loading_page),
            (self.app_dir / "not-found.tsx", not_found_page),
        ]

        for file_path, content in layouts:
            file_path.parent.mkdir(parents=True, exist_ok=True)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ {file_path.relative_to(self.src_dir)} erstellt")

    def move_styles(self):
        """Verschiebt globale Styles zu App Router"""
        print("🎨 Migriere Styles")

        # Kopiere globals.css
        src_globals = self.src_dir / "styles" / "globals.css"
        dest_globals = self.app_dir / "globals.css"

        if src_globals.exists():
            shutil.copy2(src_globals, dest_globals)
            print(f"  ✅ globals.css → app/globals.css")

    def update_imports_and_exports(self):
        """Aktualisiert Imports in den migrierten Dateien"""
        print("🔧 Aktualisiere Imports und Exports")

        # Finde alle .tsx/.ts Dateien im app Verzeichnis
        for file_path in self.app_dir.rglob("*.tsx"):
            self._update_file_imports(file_path)

        for file_path in self.app_dir.rglob("*.ts"):
            if not file_path.name.endswith('.d.ts'):
                self._update_file_imports(file_path)

    def _update_file_imports(self, file_path: Path):
        """Aktualisiert Imports in einer einzelnen Datei"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content

            # Update component imports von pages zu components/pages
            content = content.replace(
                "from '@/pages/",
                "from '@/components/pages/"
            )

            # Remove getServerSideProps, getStaticProps etc. (werden später manuell ersetzt)
            lines = content.split('\n')
            filtered_lines = []
            skip_until_brace = 0

            for line in lines:
                # Skip Next.js Page Router spezifische Exports
                if any(pattern in line for pattern in [
                    'export { getServerSideProps }',
                    'export { getStaticProps }',
                    'export { getStaticPaths }',
                    'export async function getServerSideProps',
                    'export async function getStaticProps',
                    'export async function getStaticPaths'
                ]):
                    skip_until_brace = 1
                    continue

                if skip_until_brace > 0:
                    if '{' in line:
                        skip_until_brace += line.count('{')
                    if '}' in line:
                        skip_until_brace -= line.count('}')
                    if skip_until_brace <= 0:
                        skip_until_brace = 0
                    continue

                filtered_lines.append(line)

            content = '\n'.join(filtered_lines)

            # Nur schreiben wenn sich etwas geändert hat
            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"  ✅ {file_path.relative_to(self.app_dir)} aktualisiert")

        except Exception as e:
            print(f"  ⚠️  Fehler beim Aktualisieren von {file_path}: {e}")

    def create_migration_report(self):
        """Erstellt einen Migrationsbericht"""
        print("📊 Erstelle Migrationsbericht")

        report = f"""# App Router Migration Report
Datum: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Projekt: Ritter Digital Website

## Migration Summary
- ✅ Backup erstellt: {self.backup_dir}
- ✅ App Router Struktur erstellt
- ✅ {len(self.page_migrations)} Seiten migriert
- ✅ {len(self.api_migrations)} API Routes migriert
- ✅ Layout-Dateien erstellt
- ✅ Styles migriert

## Nächste Schritte (manuell)
1. **API Routes aktualisieren**: Ändere exports zu Next.js 13+ Format
2. **Server Components**: Entferne client-side Logik aus Server Components
3. **Metadata**: Implementiere neue Metadata API
4. **Testing**: Teste alle Routen
5. **Cleanup**: Entferne alte pages/ Struktur nach erfolgreichem Test

## Wichtige Dateien zu überprüfen
- src/app/layout.tsx (Root Layout)
- src/app/(site)/layout.tsx (Marketing Layout)
- API Routes in src/app/api/

## Backup Location
{self.backup_dir}

## Potentielle Probleme
- Client Components müssen mit 'use client' markiert werden
- Server-side nur Code muss aus Client Components entfernt werden
- Routing Hooks haben sich geändert (useRouter → useRouter aus next/navigation)
"""

        report_file = self.project_root / "MIGRATION_REPORT.md"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write(report)

        print(f"✅ Migrationsbericht erstellt: {report_file}")

    def run_migration(self):
        """Führt die komplette Migration durch"""
        print("🚀 Starte App Router Migration für Ritter Digital")
        print("=" * 60)

        try:
            # 1. Backup erstellen
            self.create_backup()

            # 2. App Router Struktur erstellen
            self.create_app_structure()

            # 3. Seiten migrieren
            self.migrate_pages()

            # 4. API Routes migrieren
            self.migrate_api_routes()

            # 5. Page-Komponenten migrieren
            self.migrate_page_components()

            # 6. Layout-Dateien erstellen
            self.create_layout_files()

            # 7. Styles migrieren
            self.move_styles()

            # 8. Imports aktualisieren
            self.update_imports_and_exports()

            # 9. Migrationsbericht erstellen
            self.create_migration_report()

            print("\n" + "=" * 60)
            print("🎉 Migration erfolgreich abgeschlossen!")
            print("\n📋 Nächste Schritte:")
            print("1. Überprüfe die migrierten Dateien")
            print("2. Aktualisiere API Routes zu App Router Format")
            print("3. Teste alle Routen")
            print("4. Entferne pages/ Ordner nach erfolgreichem Test")
            print(f"\n💾 Backup verfügbar unter: {self.backup_dir}")

        except Exception as e:
            print(f"\n❌ Migration fehlgeschlagen: {e}")
            print(f"💾 Backup verfügbar unter: {self.backup_dir}")
            raise

if __name__ == "__main__":
    # Projektstamm
    PROJECT_ROOT = r"C:\Users\damja\WebstormProjects\RitterDigitalSite"

    # Migration ausführen
    migration = AppRouterMigration(PROJECT_ROOT)
    migration.run_migration()