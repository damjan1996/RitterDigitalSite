#!/usr/bin/env python3
"""
Fixed Router Problem Scanner - finds NextRouter issues in the correct directory
"""

import os
import re
import sys
from pathlib import Path

def find_project_root():
    """Find the actual project root"""
    current = Path.cwd()

    # Look for package.json or next.config.js
    while current.parent != current:
        if (current / 'package.json').exists() or (current / 'next.config.js').exists():
            return current
        current = current.parent

    return Path.cwd()

def main():
    print("🔍 FIXED NEXTJS ROUTER PROBLEM SCANNER")
    print("="*50)

    # Find and go to project root
    project_root = find_project_root()
    os.chdir(project_root)

    print(f"📁 Project root: {project_root}")
    print(f"📁 Working directory: {Path.cwd()}")

    # Verify we're in the right place
    if not (Path.cwd() / 'src').exists():
        print("❌ ERROR: 'src' directory not found!")
        print("Current directory contents:")
        for item in Path.cwd().iterdir():
            print(f"  - {item.name}")
        return

    print(f"✅ Found 'src' directory")

    # Scan for all TypeScript files
    print(f"\n🔍 SCANNING FOR TYPESCRIPT FILES:")
    print("="*40)

    ts_files = []
    for pattern in ['**/*.tsx', '**/*.ts']:
        for file_path in Path.cwd().glob(pattern):
            if any(skip in str(file_path) for skip in ['node_modules', '.next', 'dist', 'build']):
                continue
            ts_files.append(file_path)

    print(f"📊 Found {len(ts_files)} TypeScript files")

    # Show first few files to verify
    print(f"\nFirst 10 files:")
    for i, file_path in enumerate(ts_files[:10]):
        print(f"  {i+1}. {file_path}")

    # Scan for router issues
    print(f"\n🚨 SCANNING FOR ROUTER ISSUES:")
    print("="*40)

    problematic_files = []

    for file_path in ts_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            issues = []

            # Check for problematic patterns
            patterns = [
                (r"import.*useRouter.*from.*['\"]next/router['\"]", "Pages Router useRouter import"),
                (r"import.*withRouter.*from.*['\"]next/router['\"]", "withRouter import"),
                (r"import.*NextRouter.*from.*['\"]next/router['\"]", "NextRouter import"),
                (r"window\.location\.pathname", "window.location.pathname usage"),
                (r"window\.location\.search", "window.location.search usage"),
                (r"router\.pathname", "router.pathname usage"),
                (r"router\.query", "router.query usage"),
                (r"router\.asPath", "router.asPath usage"),
            ]

            for pattern, description in patterns:
                matches = list(re.finditer(pattern, content, re.IGNORECASE | re.MULTILINE))
                if matches:
                    for match in matches:
                        line_num = content[:match.start()].count('\n') + 1
                        issues.append(f"{description} (Line {line_num})")

            if issues:
                problematic_files.append({
                    'file': str(file_path),
                    'issues': issues,
                    'content_preview': content[:500] + "..." if len(content) > 500 else content
                })

        except Exception as e:
            print(f"❌ Error reading {file_path}: {e}")

    # Display results
    print(f"\n📋 RESULTS:")
    print("="*20)
    print(f"Total problematic files: {len(problematic_files)}")

    if problematic_files:
        print(f"\n🚨 FILES WITH ROUTER ISSUES:")
        print("="*50)

        for pf in problematic_files:
            print(f"\n❌ {pf['file']}")
            print("-" * len(pf['file']))

            for issue in pf['issues']:
                print(f"  • {issue}")

            print(f"\nContent preview:")
            print(f"```")
            print(pf['content_preview'])
            print(f"```")
            print("="*60)
    else:
        print("✅ No obvious router issues found!")

        # Let's check what imports the problematic pages are using
        print(f"\n🔍 CHECKING IMPORTS IN PROBLEMATIC PAGES:")
        print("="*50)

        problematic_pages = [
            'src/app/datenschutz/page.tsx',
            'src/app/impressum/page.tsx'
        ]

        for page in problematic_pages:
            if Path(page).exists():
                print(f"\n📄 {page}")
                print("-" * 30)

                with open(page, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Extract imports
                import_lines = re.findall(r"import.*from.*['\"]([^'\"]+)['\"]", content)
                print("Imports found:")
                for imp in import_lines:
                    print(f"  → {imp}")

                    # Check if these imported files exist and show their first few lines
                    if imp.startswith('@/'):
                        actual_path = Path(imp.replace('@/', 'src/'))
                        # Try different extensions
                        for ext in ['.tsx', '.ts', '.js', '.jsx']:
                            full_path = actual_path.with_suffix(ext)
                            if full_path.exists():
                                print(f"    📁 Found: {full_path}")
                                try:
                                    with open(full_path, 'r', encoding='utf-8') as f:
                                        first_lines = f.read().split('\n')[:5]
                                    print(f"    📝 First 5 lines:")
                                    for i, line in enumerate(first_lines, 1):
                                        print(f"      {i}: {line}")
                                except:
                                    pass
                                break
            else:
                print(f"❌ {page} not found")

    # Manual commands for Windows
    print(f"\n💡 MANUAL COMMANDS TO TRY:")
    print("="*30)
    print("Windows PowerShell commands:")
    print('findstr /r /s "next/router" src\\')
    print('findstr /r /s "window.location" src\\')
    print('findstr /r /s "\\.pathname" src\\')
    print('findstr /r /s "useRouter" src\\')

if __name__ == "__main__":
    main()