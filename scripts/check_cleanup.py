import os
import re
import sys
from colorama import init, Fore, Style

# Colorama für farbige Konsolenausgaben initialisieren
init()

# Stammverzeichnis des Projekts
root_dir = r'C:\Users\damja\WebstormProjects\RitterDigitalSite'

# Keywords zum Suchen
supabase_keywords = [
    r'supabase',
    r'createClient',
    r'createServerSupabaseClient',
    r'AuthProvider',
    r'AuthWrapper',
    r'useSupabase',
    r'@/lib/supabase',
    r'@/hooks/use-supabase',
    r'useUser',
    r'useAuth'
]

blog_keywords = [
    r'blog',
    r'post',
    r'BlogList',
    r'LatestBlogPosts',
    r'BlogSidebar',
    r'PostHeader',
    r'PostContent',
    r'Categories',
    r'@/types/blog',
    r'@/pages/blog'
]

# Datei-Erweiterungen, die durchsucht werden sollen
extensions_to_search = [
    '.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.css',
    '.html', '.xml', '.yml', '.yaml'
]

# Ordner, die übersprungen werden sollen
dirs_to_skip = [
    'node_modules',
    '.next',
    '.git',
    'public'  # Optional überspringen, wenn dort keine Referenzen sein sollten
]

def should_skip_dir(dir_path):
    """Überprüft, ob ein Verzeichnis übersprungen werden soll"""
    dir_name = os.path.basename(dir_path)
    return dir_name in dirs_to_skip or dir_name.startswith('.')

def is_binary_file(file_path):
    """Überprüft, ob eine Datei binär ist (nicht als Text lesbar)"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            file.read(1024)
            return False
    except UnicodeDecodeError:
        return True
    except Exception:
        return True

def check_file(file_path, search_terms):
    """Überprüft eine Datei auf bestimmte Suchbegriffe und gibt Zeilen zurück, die Treffer enthalten"""
    results = []

    # Binärdateien überspringen
    if is_binary_file(file_path):
        return results

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line_num, line in enumerate(file, 1):
                for term in search_terms:
                    if re.search(term, line, re.IGNORECASE):
                        results.append({
                            'line_num': line_num,
                            'term': term,
                            'line': line.strip()
                        })
        return results
    except Exception as e:
        print(f"{Fore.YELLOW}Fehler beim Lesen von {file_path}: {e}{Style.RESET_ALL}")
        return []

def scan_for_references():
    """Durchsucht alle Dateien nach Referenzen zu Supabase und Blog"""
    supabase_references = []
    blog_references = []

    # Gesamtzahl der durchsuchten Dateien
    total_files = 0

    for root, dirs, files in os.walk(root_dir):
        # Zu überspringende Verzeichnisse filtern
        dirs[:] = [d for d in dirs if not should_skip_dir(os.path.join(root, d))]

        for file in files:
            # Dateiendung überprüfen
            file_ext = os.path.splitext(file)[1].lower()
            if file_ext not in extensions_to_search:
                continue

            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, root_dir)
            total_files += 1

            # Auf Supabase-Referenzen prüfen
            supabase_results = check_file(file_path, supabase_keywords)
            if supabase_results:
                supabase_references.append({
                    'file': rel_path,
                    'matches': supabase_results
                })

            # Auf Blog-Referenzen prüfen
            blog_results = check_file(file_path, blog_keywords)
            if blog_results:
                blog_references.append({
                    'file': rel_path,
                    'matches': blog_results
                })

    return supabase_references, blog_references, total_files

def check_package_json():
    """Überprüft die package.json auf Supabase-Abhängigkeiten"""
    package_json_path = os.path.join(root_dir, 'package.json')

    if not os.path.exists(package_json_path):
        print(f"{Fore.YELLOW}package.json nicht gefunden.{Style.RESET_ALL}")
        return []

    try:
        with open(package_json_path, 'r', encoding='utf-8') as file:
            content = file.read()
            # Suche nach Supabase-Paketen in den Abhängigkeiten
            matches = re.findall(r'"(@supabase/[^"]+)"\s*:\s*"([^"]+)"', content)
            return matches
    except Exception as e:
        print(f"{Fore.YELLOW}Fehler beim Überprüfen der package.json: {e}{Style.RESET_ALL}")
        return []

def check_verwaiste_importe():
    """Sucht nach verwaisten Importen, die auf nicht mehr vorhandene Module verweisen"""
    verwaiste_importe = []

    # Pfade, die nicht mehr existieren sollten
    nicht_existente_pfade = [
        '@/lib/supabase',
        '@/hooks/use-supabase',
        '@/types/blog',
        '@/pages/blog'
    ]

    for root, dirs, files in os.walk(os.path.join(root_dir, 'src')):
        # Zu überspringende Verzeichnisse filtern
        dirs[:] = [d for d in dirs if not should_skip_dir(os.path.join(root, d))]

        for file in files:
            # Nur TypeScript/JavaScript Dateien betrachten
            if not file.endswith(('.ts', '.tsx', '.js', '.jsx')):
                continue

            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, root_dir)

            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                    for pfad in nicht_existente_pfade:
                        # Suche nach Import-Statements mit diesen Pfaden
                        imports = re.findall(rf'import\s+.*?from\s+[\'"]({pfad}[^\'"]*)[\'"]', content)
                        if imports:
                            for imp in imports:
                                verwaiste_importe.append({
                                    'file': rel_path,
                                    'import': imp
                                })
            except Exception as e:
                print(f"{Fore.YELLOW}Fehler beim Überprüfen von {rel_path}: {e}{Style.RESET_ALL}")

    return verwaiste_importe

def main():
    """Hauptfunktion zum Ausführen des Scripts"""
    print(f"{Fore.CYAN}=============== SUPABASE & BLOG REFERENZ-CHECKER ==============={Style.RESET_ALL}")
    print(f"Python Version: {sys.version}")
    print(f"Arbeitsverzeichnis: {os.getcwd()}")
    print(f"Stammverzeichnis: {root_dir}")
    print(f"{Fore.CYAN}============================================================={Style.RESET_ALL}\n")

    print(f"{Fore.CYAN}Suche nach Referenzen...{Style.RESET_ALL}")

    # Dateien scannen
    start_time = __import__('time').time()
    supabase_refs, blog_refs, total_files = scan_for_references()
    end_time = __import__('time').time()

    # Verwaiste Importe überprüfen
    verwaiste_importe = check_verwaiste_importe()

    # package.json überprüfen
    supabase_packages = check_package_json()

    # Ergebnisse ausgeben
    print(f"\n{Fore.CYAN}============ SCAN-ERGEBNISSE ============{Style.RESET_ALL}")
    print(f"Dauer: {end_time - start_time:.2f} Sekunden")
    print(f"Durchsuchte Dateien: {total_files}")

    print(f"\n{Fore.CYAN}SUPABASE-REFERENZEN: {len(supabase_refs)}{Style.RESET_ALL}")
    if supabase_refs:
        for ref in supabase_refs:
            print(f"\n{Fore.YELLOW}Datei: {ref['file']}{Style.RESET_ALL}")
            for match in ref['matches']:
                print(f"  Zeile {match['line_num']}: {match['line']}")
    else:
        print(f"{Fore.GREEN}Keine Supabase-Referenzen gefunden!{Style.RESET_ALL}")

    print(f"\n{Fore.CYAN}BLOG-REFERENZEN: {len(blog_refs)}{Style.RESET_ALL}")
    if blog_refs:
        for ref in blog_refs:
            print(f"\n{Fore.YELLOW}Datei: {ref['file']}{Style.RESET_ALL}")
            for match in ref['matches']:
                print(f"  Zeile {match['line_num']}: {match['line']}")
    else:
        print(f"{Fore.GREEN}Keine Blog-Referenzen gefunden!{Style.RESET_ALL}")

    print(f"\n{Fore.CYAN}VERWAISTE IMPORTE: {len(verwaiste_importe)}{Style.RESET_ALL}")
    if verwaiste_importe:
        for imp in verwaiste_importe:
            print(f"  {Fore.YELLOW}Datei: {imp['file']}{Style.RESET_ALL}")
            print(f"  Import: {imp['import']}")
    else:
        print(f"{Fore.GREEN}Keine verwaisten Importe gefunden!{Style.RESET_ALL}")

    print(f"\n{Fore.CYAN}SUPABASE-PAKETE IN PACKAGE.JSON: {len(supabase_packages)}{Style.RESET_ALL}")
    if supabase_packages:
        for package, version in supabase_packages:
            print(f"  {Fore.YELLOW}{package}: {version}{Style.RESET_ALL}")
    else:
        print(f"{Fore.GREEN}Keine Supabase-Pakete in der package.json gefunden!{Style.RESET_ALL}")

    print(f"\n{Fore.CYAN}================= ZUSAMMENFASSUNG ================={Style.RESET_ALL}")
    if not supabase_refs and not blog_refs and not verwaiste_importe and not supabase_packages:
        print(f"{Fore.GREEN}ERFOLG: Das Projekt wurde vollständig von Supabase und Blog-Referenzen bereinigt!{Style.RESET_ALL}")
    else:
        total_issues = len(supabase_refs) + len(blog_refs) + len(verwaiste_importe) + len(supabase_packages)
        print(f"{Fore.YELLOW}ACHTUNG: Es wurden noch {total_issues} Probleme gefunden, die behoben werden müssen.{Style.RESET_ALL}")

    print(f"{Fore.CYAN}====================================================={Style.RESET_ALL}")

if __name__ == "__main__":
    main()