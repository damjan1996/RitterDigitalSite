import os
import re
import sys

def extract_file_paths(lint_output):
    """Extrahiert die Dateipfade aus der ESLint-Ausgabe."""
    pattern = r'\./(.+?)\n'
    return re.findall(pattern, lint_output)

def read_file_content(base_path, relative_path):
    """Liest den Inhalt einer Datei aus."""
    # Konvertiere ./ zum relativen Pfad
    if relative_path.startswith('./'):
        relative_path = relative_path[2:]

    full_path = os.path.join(base_path, relative_path)
    try:
        with open(full_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return content
    except Exception as e:
        return f"Fehler beim Lesen der Datei {full_path}: {str(e)}"

def main():
    # Projektpfad
    base_path = r"C:\Users\damja\WebstormProjects\RitterDigitalSite"

    # Direkter ESLint-Output als String (anstatt aus einer Datei zu lesen)
    lint_output = """./src/components/common/schema-generator.tsx
19:18  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
52:21  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
119:12  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
492:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/components/layout/footer.tsx
129:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

./src/components/layout/header.tsx
92:17  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

./src/components/ui/container.tsx
19:18  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/config/seo.ts
265:22  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/lib/improved-analytics.ts
12:12  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
13:11  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
14:15  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
101:3  Warning: Unexpected console statement.  no-console
121:3  Warning: Unexpected console statement.  no-console
138:3  Warning: Unexpected console statement.  no-console
152:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
153:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
154:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
157:23  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
158:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
159:22  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
161:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
162:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
163:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
164:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
176:3  Warning: Unexpected console statement.  no-console
214:3  Warning: Unexpected console statement.  no-console
268:3  Warning: Unexpected console statement.  no-console
301:3  Warning: Unexpected console statement.  no-console
338:3  Warning: Unexpected console statement.  no-console
371:3  Warning: Unexpected console statement.  no-console
555:3  Warning: Unexpected console statement.  no-console
559:39  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/pages/api/contact/index.ts
61:5  Warning: Unexpected console statement.  no-console

./src/pages/api/newsletter/index.ts
91:5  Warning: Unexpected console statement.  no-console

./src/pages/api/server-sitemap.xml.ts
12:39  Warning: 'req' is defined but never used. Allowed unused args must match /^_/u.  @typescript-eslint/no-unused-vars
12:60  Warning: 'res' is defined but never used. Allowed unused args must match /^_/u.  @typescript-eslint/no-unused-vars

./src/pages/home/components/Hero.tsx
124:10  Warning: 'videoLoaded' is assigned a value but never used.  @typescript-eslint/no-unused-vars
171:6  Warning: React Hook useEffect has an unnecessary dependency: 'services.length'. Either exclude it or remove the dependency array. Outer scope values like 'services.length' aren't valid dependencies because mutating them doesn't re-render the component.  react-hooks/exhaustive-deps
214:6  Warning: React Hook useEffect has an unnecessary dependency: 'services.length'. Either exclude it or remove the dependency array. Outer scope values like 'services.length' aren't valid dependencies because mutating them doesn't re-render the component.  react-hooks/exhaustive-deps
512:25  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

./src/pages/home/index.tsx
3:8  Warning: 'Head' is defined but never used.  @typescript-eslint/no-unused-vars

./src/pages/index.tsx
15:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
16:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/pages/karriere/components/ApplicationForm.tsx
15:7  Warning: 'colors' is assigned a value but never used.  @typescript-eslint/no-unused-vars
31:3  Warning: 'jobId' is defined but never used. Allowed unused args must match /^_/u.  @typescript-eslint/no-unused-vars

./src/pages/karriere/components/Hero.tsx
15:7  Warning: 'colors' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/pages/leistungen/service/ServiceHero.tsx
14:7  Warning: 'colors' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/pages/ueber-uns/components/Hero.tsx
15:7  Warning: 'colors' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/pages/ueber-uns/components/Values.tsx
77:9  Warning: 'itemVariants' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/pages/_app.tsx
87:9  Warning: `rel="preconnect"` is missing from Google Font. See: https://nextjs.org/docs/messages/google-font-preconnect  @next/next/google-font-preconnect

./src/types/common.ts
35:34  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
134:29  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/types/forms.ts
133:22  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any"""

    # Extrahiere die Dateipfade
    file_paths = extract_file_paths(lint_output)

    # Entferne Duplikate
    file_paths = list(set(file_paths))

    # Sortiere die Dateipfade für eine bessere Lesbarkeit
    file_paths.sort()

    # Gib den Inhalt jeder Datei aus
    for file_path in file_paths:
        print("\n" + "=" * 80)
        print(f"DATEI: {file_path}")
        print("=" * 80)
        content = read_file_content(base_path, file_path)
        print(content)

if __name__ == "__main__":
    main()