import os
import re
import sys

# Stammverzeichnis des Projekts
root_dir = r'C:\Users\damja\WebstormProjects\RitterDigitalSite'

# Dateien, die noch Supabase/Blog-Referenzen enthalten
files_to_modify = [
    os.path.join(root_dir, 'src', 'pages', 'api', 'contact', 'index.ts'),
    os.path.join(root_dir, 'src', 'pages', 'api', 'newsletter', 'index.ts'),
    os.path.join(root_dir, 'src', 'pages', '_app.tsx'),
    os.path.join(root_dir, 'package.json')
]

def print_file_content(file_path):
    """Gibt den vollständigen Inhalt einer Datei aus"""
    if not os.path.isfile(file_path):
        print(f"Datei nicht gefunden: {file_path}")
        return

    print(f"\n{'='*80}\n{file_path}\n{'='*80}")
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
            print(content)
    except Exception as e:
        print(f"Fehler beim Lesen der Datei: {e}")

def suggest_modifications(file_path):
    """Gibt Vorschläge zur Bereinigung einer Datei aus"""
    if not os.path.isfile(file_path):
        return

    filename = os.path.basename(file_path)

    print(f"\n{'#'*40}\nVorschläge für {filename}:\n{'#'*40}")

    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

            # Supabase-Importe finden
            supabase_imports = re.findall(r'import.*from [\'\"]@/lib/supabase/.*[\'\"]', content)

            if 'contact/index.ts' in file_path or 'newsletter/index.ts' in file_path:
                print("Diese API-Route verwendet Supabase. Vorschlag:")
                print("1. Entferne den Import: `import { createServerSupabaseClient } from '@/lib/supabase/server'`")
                print("2. Ersetze die Supabase-Funktionalität mit einer alternativen Lösung (z.B. direktes Senden einer E-Mail)")
                print("3. Beispielcode für eine vereinfachte Version ohne Supabase:")
                print("""
import { NextApiRequest, NextApiResponse } from 'next';
import { validateContactForm } from '@/lib/validation';
// Import für alternative Email-Lösung, z.B. nodemailer oder API wie SendGrid
// import { sendEmail } from '@/lib/email';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const data = req.body;
    
    // Validiere die Daten
    const validationResult = validateContactForm(data);
    if (!validationResult.success) {
      return res.status(400).json({ message: validationResult.error });
    }
    
    // Sende die E-Mail mit einer alternativen Lösung
    // await sendEmail({
    //   to: 'kontakt@example.com',
    //   subject: 'Neue Kontaktanfrage',
    //   text: `Name: ${data.name}\\nEmail: ${data.email}\\nNachricht: ${data.message}`
    // });
    
    // Für Testzwecke
    console.log('Kontaktformular-Daten:', data);
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Fehler beim Verarbeiten der Kontaktanfrage:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
                """)

            elif '_app.tsx' in file_path:
                # Überprüfe auf AuthProvider
                auth_wrapper = re.search(r'<AuthProvider>.*?</AuthProvider>', content, re.DOTALL)
                if auth_wrapper:
                    print("Diese Datei enthält möglicherweise einen AuthProvider. Vorschlag:")
                    print("1. Entferne Imports zu AuthProvider")
                    print("2. Entferne das <AuthProvider>-Wrapping um die Komponente")
                else:
                    print("Keine direkten Referenzen zu Supabase gefunden. Überprüfe trotzdem auf Importe.")

            elif 'package.json' in file_path:
                print("Überprüfe die package.json auf Supabase-Abhängigkeiten und entferne sie:")
                print("- @supabase/supabase-js")
                print("- Weitere Supabase-bezogene Pakete")

    except Exception as e:
        print(f"Fehler bei der Analyse: {e}")

def main():
    """Hauptfunktion zum Ausführen des Scripts"""
    print(f"Python Version: {sys.version}")
    print(f"Arbeitsverzeichnis: {os.getcwd()}")
    print(f"Stammverzeichnis: {root_dir}")
    print("\nAusgabe der Inhalte der zu modifizierenden Dateien...")

    for file_path in files_to_modify:
        print_file_content(file_path)
        suggest_modifications(file_path)

if __name__ == "__main__":
    main()