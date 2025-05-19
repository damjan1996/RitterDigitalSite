import os
import sys
import re
from colorama import init, Fore, Style

# Initialisiere colorama für farbige Ausgabe
init()

# Stammverzeichnis des Projekts
root_dir = r'C:\Users\damja\WebstormProjects\RitterDigitalSite'

# Liste der zu bereinigenden Dateien mit ihren Bereinigungsaktionen
files_to_clean = {
    # Supabase-Referenzen
    'next.config.js': {
        'action': 'modify',
        'description': 'Entferne Supabase-Hostname und Blog-Redirects'
    },
    'src/pages/_app.tsx': {
        'action': 'modify',
        'description': 'Entferne Supabase DNS Prefetch-Kommentar'
    },
    'src/pages/api/server-sitemap.xml.ts': {
        'action': 'replace',
        'description': 'Komplett durch bereinigte Version ersetzen'
    },
    'src/pages/leistungen/softwareentwicklung/index.tsx': {
        'action': 'modify',
        'description': 'Entferne Supabase aus Technologie-Liste'
    },

    # Blog-Referenzen
    'config/menu.ts': {
        'action': 'modify',
        'description': 'Entferne Blog-Einträge aus Navigation'
    },
    'src/components/layout/header.tsx': {
        'action': 'modify',
        'description': 'Entferne Blog-Navigation'
    },
    'src/components/layout/footer.tsx': {
        'action': 'modify',
        'description': 'Entferne Blog-Links'
    },
    'src/components/layout/mobile-navigation.tsx': {
        'action': 'modify',
        'description': 'Entferne Blog-Navigation'
    },
    'src/components/layout/navigation.tsx': {
        'action': 'modify',
        'description': 'Entferne Blog-Links'
    },
    'config/seo.ts': {
        'action': 'modify',
        'description': 'Entferne Blog-bezogene SEO-Einstellungen'
    },
    'src/config/seo.ts': {
        'action': 'modify',
        'description': 'Entferne Blog-Schema und -Konfigurationen'
    },
    'next-sitemap.config.js': {
        'action': 'modify',
        'description': 'Entferne Blog-bezogene Sitemap-Einträge'
    },
    'src/lib/api.ts': {
        'action': 'modify',
        'description': 'Entferne Blog-API-Endpunkte'
    },
    'src/lib/constants.ts': {
        'action': 'modify',
        'description': 'Entferne BLOG_CATEGORIES'
    },
    'src/types/index.ts': {
        'action': 'modify',
        'description': "Entferne 'export * from './blog';' und 'blog' aus LayoutType"
    }
}

# Suchbegriffe
supabase_patterns = [
    r'supabase',
    r'krqoaacidcyghxhdxtce\.supabase\.co',
    r'createServerSupabaseClient',
    r'NEXT_PUBLIC_SUPABASE'
]

blog_patterns = [
    r'\bblog\b',
    r'\bBlog\b',
    r'\bBLOG\b',
    r'\bblogPost',
    r'\bBlogPost',
    r'\/blog',
    r'blog\/',
    r'LatestBlogPosts'
]

def create_backup(file_path):
    """Erstellt eine Sicherungskopie der Datei"""
    backup_path = f"{file_path}.bak"
    try:
        with open(file_path, 'r', encoding='utf-8') as src:
            with open(backup_path, 'w', encoding='utf-8') as dst:
                dst.write(src.read())
        return True
    except Exception as e:
        print(f"{Fore.RED}Fehler beim Erstellen der Sicherung für {file_path}: {e}{Style.RESET_ALL}")
        return False

def display_file_content(file_path):
    """Zeigt den vollständigen Inhalt einer Datei an und hebt problematische Zeilen hervor"""
    if not os.path.exists(file_path):
        print(f"{Fore.RED}Datei nicht gefunden: {file_path}{Style.RESET_ALL}")
        return

    rel_path = os.path.relpath(file_path, root_dir)

    print(f"\n{Fore.CYAN}{'='*80}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}DATEI: {rel_path}{Style.RESET_ALL}")
    print(f"{Fore.CYAN}{'='*80}{Style.RESET_ALL}\n")

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            lines = content.splitlines()

            for i, line in enumerate(lines, 1):
                # Prüfe auf Supabase- und Blog-Muster
                has_supabase = any(re.search(pattern, line, re.IGNORECASE) for pattern in supabase_patterns)
                has_blog = any(re.search(pattern, line, re.IGNORECASE) for pattern in blog_patterns)

                line_num = f"{i:4}"

                if has_supabase and has_blog:
                    print(f"{Fore.YELLOW}{line_num} {Fore.RED}[SUPABASE+BLOG] {Style.RESET_ALL}{line}")
                elif has_supabase:
                    print(f"{Fore.YELLOW}{line_num} {Fore.RED}[SUPABASE] {Style.RESET_ALL}{line}")
                elif has_blog:
                    print(f"{Fore.YELLOW}{line_num} {Fore.MAGENTA}[BLOG] {Style.RESET_ALL}{line}")
                else:
                    print(f"{Fore.YELLOW}{line_num}{Style.RESET_ALL} {line}")

            # Zeige Anzahl der gefundenen Probleme
            supabase_count = sum(1 for line in lines if any(re.search(pattern, line, re.IGNORECASE) for pattern in supabase_patterns))
            blog_count = sum(1 for line in lines if any(re.search(pattern, line, re.IGNORECASE) for pattern in blog_patterns))

            print(f"\n{Fore.YELLOW}Gefundene Referenzen: {Fore.RED}{supabase_count} Supabase, {Fore.MAGENTA}{blog_count} Blog{Style.RESET_ALL}")

    except Exception as e:
        print(f"{Fore.RED}Fehler beim Lesen der Datei: {e}{Style.RESET_ALL}")

def generate_clean_instructions(file_path):
    """Generiert spezifische Bereinigungsanweisungen für die Datei"""
    rel_path = os.path.relpath(file_path, root_dir)
    file_info = files_to_clean.get(rel_path, {})
    action = file_info.get('action', 'unknown')
    description = file_info.get('description', 'Keine Beschreibung')

    print(f"\n{Fore.GREEN}BEREINIGUNGSANWEISUNGEN für {rel_path}:{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Aktion: {action.upper()}{Style.RESET_ALL}")
    print(f"{Fore.GREEN}Beschreibung: {description}{Style.RESET_ALL}")

    if action == 'replace':
        print(f"{Fore.GREEN}Diese Datei sollte komplett durch die bereinigte Version ersetzt werden.{Style.RESET_ALL}")
    elif action == 'modify':
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                lines = content.splitlines()

                # Finde die zu entfernenden Zeilen
                supabase_lines = [i for i, line in enumerate(lines, 1)
                                  if any(re.search(pattern, line, re.IGNORECASE) for pattern in supabase_patterns)]
                blog_lines = [i for i, line in enumerate(lines, 1)
                              if any(re.search(pattern, line, re.IGNORECASE) for pattern in blog_patterns)]

                if supabase_lines:
                    print(f"{Fore.GREEN}Zu entfernende Supabase-Zeilen: {', '.join(map(str, supabase_lines))}{Style.RESET_ALL}")

                if blog_lines:
                    print(f"{Fore.GREEN}Zu entfernende Blog-Zeilen: {', '.join(map(str, blog_lines))}{Style.RESET_ALL}")

                # Spezifische Anweisungen je nach Datei
                if 'next.config.js' in file_path:
                    print(f"{Fore.GREEN}Entferne die Zeile mit 'hostname: 'krqoaacidcyghxhdxtce.supabase.co','{Style.RESET_ALL}")
                    print(f"{Fore.GREEN}Entferne Blog-Kategorien-Weiterleitungen{Style.RESET_ALL}")

                elif '_app.tsx' in file_path:
                    print(f"{Fore.GREEN}Entferne den Kommentar zum Supabase DNS Prefetch{Style.RESET_ALL}")

                elif 'softwareentwicklung/index.tsx' in file_path:
                    print(f"{Fore.GREEN}Entferne Supabase aus der Technologie-Liste{Style.RESET_ALL}")

                elif 'menu.ts' in file_path or 'header.tsx' in file_path or 'footer.tsx' in file_path:
                    print(f"{Fore.GREEN}Entferne Blog-Einträge aus den Navigationsarrays{Style.RESET_ALL}")

                elif 'api.ts' in file_path:
                    print(f"{Fore.GREEN}Entferne Blog-API-Endpunkte und -Funktionen{Style.RESET_ALL}")

                elif 'constants.ts' in file_path:
                    print(f"{Fore.GREEN}Entferne BLOG_CATEGORIES-Array und -Export{Style.RESET_ALL}")

                elif 'index.ts' in file_path and 'types' in file_path:
                    print(f"{Fore.GREEN}Entferne 'export * from './blog';'{Style.RESET_ALL}")
                    print(f"{Fore.GREEN}Entferne 'blog' aus dem LayoutType{Style.RESET_ALL}")

        except Exception as e:
            print(f"{Fore.RED}Fehler bei der Generierung von Anweisungen: {e}{Style.RESET_ALL}")

    print("\nSiehe bereitgestellte bereinigte Dateiversionen in den vorherigen Artefakten.")

def main():
    """Hauptfunktion zum Ausführen des Scripts"""
    print(f"{Fore.CYAN}============ VOLLSTÄNDIGE ANZEIGE DER ZU BEREINIGENDEN DATEIEN ============{Style.RESET_ALL}")
    print(f"Python Version: {sys.version}")
    print(f"Arbeitsverzeichnis: {os.getcwd()}")
    print(f"Stammverzeichnis: {root_dir}")
    print()

    for rel_path, file_info in files_to_clean.items():
        file_path = os.path.join(root_dir, rel_path)
        if os.path.exists(file_path):
            display_file_content(file_path)
            generate_clean_instructions(file_path)
        else:
            print(f"{Fore.RED}DATEI NICHT GEFUNDEN: {rel_path}{Style.RESET_ALL}\n")

    print(f"\n{Fore.CYAN}============ ZUSAMMENFASSUNG ============{Style.RESET_ALL}")
    print(f"Zu bereinigende Dateien: {len(files_to_clean)}")
    print(f"Aktionen:")

    replace_count = sum(1 for info in files_to_clean.values() if info.get('action') == 'replace')
    modify_count = sum(1 for info in files_to_clean.values() if info.get('action') == 'modify')

    print(f"- Ersetzen: {replace_count}")
    print(f"- Modifizieren: {modify_count}")

    print(f"\n{Fore.CYAN}Für jede Datei wurde eine bereinigte Version in den vorherigen Artefakten bereitgestellt.{Style.RESET_ALL}")
    print(f"{Fore.CYAN}Bitte verwende diese als Referenz für die Bereinigung.{Style.RESET_ALL}")

if __name__ == "__main__":
    main()