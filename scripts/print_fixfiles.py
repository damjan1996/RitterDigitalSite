#!/usr/bin/env python3
"""
Script to output all problematic router files for fixing
Shows current content and highlights issues
"""

import os
from pathlib import Path

def find_project_root():
    """Find the project root directory"""
    current = Path.cwd()

    # Look for package.json or next.config.js
    while current.parent != current:
        if (current / 'package.json').exists() or (current / 'next.config.js').exists():
            return current
        current = current.parent

    return Path.cwd()

def highlight_problematic_lines(content, filename):
    """Highlight lines that contain router issues"""
    lines = content.split('\n')
    problematic_patterns = [
        'next/router',
        'window.location.pathname',
        'router.asPath',
        'router.pathname',
        'router.query'
    ]

    output = []
    for i, line in enumerate(lines, 1):
        is_problematic = any(pattern in line for pattern in problematic_patterns)
        prefix = "🚨 " if is_problematic else "   "
        output.append(f"{prefix}{i:3}: {line}")

    return '\n'.join(output)

def main():
    print("📄 PROBLEMATIC ROUTER FILES OUTPUT")
    print("="*60)

    # Find and go to project root
    project_root = find_project_root()
    os.chdir(project_root)

    print(f"📁 Project root: {project_root}")

    # List of problematic files to output
    problematic_files = [
        {
            'path': 'src/components/common/seo.tsx',
            'description': 'SEO Component - Used by datenschutz/impressum pages',
            'issues': ['useRouter from next/router', 'router.asPath usage']
        },
        {
            'path': 'src/components/enhanced-seo.tsx',
            'description': 'Enhanced SEO Component - May be used by pages',
            'issues': ['useRouter from next/router', 'router.asPath usage']
        },
        {
            'path': 'src/components/common/page-transition.tsx',
            'description': 'Page Transition Component',
            'issues': ['useRouter from next/router']
        },
        {
            'path': 'src/components/layout/header.tsx',
            'description': 'Header Component - Used on all pages',
            'issues': ['window.location.pathname usage']
        },
        {
            'path': 'config/analytics.ts',
            'description': 'Analytics Configuration',
            'issues': ['window.location.pathname usage']
        }
    ]

    print(f"\n🎯 OUTPUTTING {len(problematic_files)} PROBLEMATIC FILES:")
    print("="*60)

    for i, file_info in enumerate(problematic_files, 1):
        file_path = Path(file_info['path'])

        print(f"\n{'='*80}")
        print(f"📄 FILE {i}/{len(problematic_files)}: {file_info['path']}")
        print(f"📝 Description: {file_info['description']}")
        print(f"🚨 Issues: {', '.join(file_info['issues'])}")
        print('='*80)

        if file_path.exists():
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                print(f"✅ File found ({len(content)} characters)")
                print(f"📋 Content with problematic lines highlighted:")
                print("-" * 80)

                highlighted_content = highlight_problematic_lines(content, file_info['path'])
                print(highlighted_content)

                print("-" * 80)
                print(f"📊 Total lines: {len(content.split(chr(10)))}")

            except Exception as e:
                print(f"❌ Error reading file: {e}")
        else:
            print(f"❌ FILE NOT FOUND: {file_path}")

            # Try to find similar files
            parent_dir = file_path.parent
            if parent_dir.exists():
                print(f"📁 Directory exists, contents:")
                try:
                    for item in parent_dir.iterdir():
                        if item.is_file() and item.suffix in ['.tsx', '.ts']:
                            print(f"   - {item.name}")
                except:
                    pass

        print(f"\n{'='*80}")

    print(f"\n🔧 NEXT STEPS:")
    print("="*20)
    print("1. Review each file above")
    print("2. Replace content with the corrected versions from the previous artifact")
    print("3. Pay attention to lines marked with 🚨")
    print("4. Test with 'npm run build' after changes")
    print("5. Deploy with 'git add . && git commit -m \"Fix router issues\" && git push'")

    print(f"\n💡 KEY CHANGES TO MAKE:")
    print("="*25)
    print("❌ import { useRouter } from 'next/router'")
    print("✅ import { usePathname } from 'next/navigation'")
    print("")
    print("❌ const router = useRouter(); router.asPath")
    print("✅ const pathname = usePathname()")
    print("")
    print("❌ window.location.pathname")
    print("✅ const pathname = usePathname() (in components)")
    print("")
    print("🔥 Add 'use client' directive at top of components!")

def export_to_files():
    """Export each problematic file to a backup"""
    project_root = find_project_root()
    os.chdir(project_root)

    backup_dir = Path('backup_router_files')
    backup_dir.mkdir(exist_ok=True)

    problematic_files = [
        'src/components/common/seo.tsx',
        'src/components/enhanced-seo.tsx',
        'src/components/common/page-transition.tsx',
        'src/components/layout/header.tsx',
        'config/analytics.ts'
    ]

    print(f"\n💾 CREATING BACKUPS IN: {backup_dir}")
    print("="*40)

    for file_path in problematic_files:
        source = Path(file_path)
        if source.exists():
            # Create backup filename
            backup_name = source.name.replace('.', '_backup.')
            backup_path = backup_dir / backup_name

            try:
                with open(source, 'r', encoding='utf-8') as f:
                    content = f.read()

                with open(backup_path, 'w', encoding='utf-8') as f:
                    f.write(content)

                print(f"✅ Backed up: {file_path} → {backup_path}")

            except Exception as e:
                print(f"❌ Failed to backup {file_path}: {e}")
        else:
            print(f"⚠️  File not found: {file_path}")

if __name__ == "__main__":
    main()

    # Ask if user wants to create backups
    print(f"\n❓ Create backups of current files? (y/n): ", end="")
    try:
        response = input().lower()
        if response in ['y', 'yes', 'j', 'ja']:
            export_to_files()
            print("✅ Backups created!")
    except:
        pass

    print(f"\n✅ ANALYSIS COMPLETE!")
    print("Now replace the problematic files with the corrected versions.")