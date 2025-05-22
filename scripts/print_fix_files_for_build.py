#!/usr/bin/env python3
"""
Fixed script to find NextRouter issues - runs from project root
"""

import os
import re
from pathlib import Path

def find_project_root():
    """Find the project root directory"""
    current = Path.cwd()

    # Check if we're in scripts folder
    if current.name == 'scripts':
        return current.parent

    # Look for package.json to identify project root
    while current.parent != current:
        if (current / 'package.json').exists():
            return current
        current = current.parent

    return Path.cwd()

def analyze_files():
    """Analyze files for router issues"""
    project_root = find_project_root()
    print(f"🎯 Project root: {project_root}")
    print(f"📁 Current working directory: {Path.cwd()}")

    # Change to project root
    os.chdir(project_root)

    print("\n" + "="*80)
    print("📄 ANALYZING CRITICAL FILES:")
    print("="*80)

    # These files are causing the build errors
    critical_files = [
        "src/app/datenschutz/page.tsx",
        "src/app/impressum/page.tsx",
        "src/app/layout.tsx",
        "src/app/(marketing)/layout.tsx",
        "src/components/layout/navigation.tsx",
        "src/components/layout/header.tsx",
        "src/components/layout/footer.tsx",
        "src/components/layout/mobile-navigation.tsx"
    ]

    for file_path in critical_files:
        print(f"\n📄 CHECKING: {file_path}")
        print("-" * 60)

        if os.path.exists(file_path):
            print(f"✅ File exists")

            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                print(f"📝 Content ({len(content)} chars):")
                print("=" * 40)
                print(content)
                print("=" * 40)

                # Check for router issues
                router_issues = []

                if 'next/router' in content:
                    router_issues.append("❌ Uses 'next/router' (Pages Router)")

                if 'useRouter()' in content and 'next/navigation' not in content:
                    router_issues.append("❌ Uses useRouter() without App Router import")

                if '.pathname' in content or '.query' in content or '.asPath' in content:
                    router_issues.append("❌ Uses Pages Router properties")

                if router_issues:
                    print(f"\n🚨 ISSUES FOUND:")
                    for issue in router_issues:
                        print(f"   {issue}")
                else:
                    print(f"\n✅ No obvious router issues")

            except Exception as e:
                print(f"❌ Error reading file: {e}")
        else:
            print(f"❌ File does not exist")

        print("\n" + "="*80)

    # Now scan ALL files for router usage
    print("\n🔍 SCANNING ALL FILES FOR ROUTER PATTERNS:")
    print("="*60)

    problematic_files = []

    for file_path in Path('.').glob('**/*.{tsx,ts,jsx,js}'):
        # Skip node_modules, .next, etc.
        if any(skip in str(file_path) for skip in ['node_modules', '.next', 'dist', 'build']):
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

                issues = []

                # Check for specific problematic patterns
                if re.search(r"import.*useRouter.*from.*['\"]next/router['\"]", content):
                    issues.append("Pages Router import")

                if re.search(r"import.*withRouter.*from.*['\"]next/router['\"]", content):
                    issues.append("withRouter import")

                if re.search(r"\.pathname", content) and 'usePathname' not in content:
                    issues.append("router.pathname usage")

                if re.search(r"\.query", content) and 'useSearchParams' not in content:
                    issues.append("router.query usage")

                if issues:
                    problematic_files.append({
                        'file': str(file_path),
                        'issues': issues
                    })

                    print(f"\n❌ {file_path}")
                    for issue in issues:
                        print(f"   - {issue}")

        except Exception as e:
            continue

    print(f"\n📊 SUMMARY:")
    print("="*30)
    print(f"Files with router issues: {len(problematic_files)}")

    if problematic_files:
        print("\n🔧 QUICK FIXES:")
        print("1. Replace 'next/router' → 'next/navigation'")
        print("2. Add 'use client' directive if using router in components")
        print("3. Replace router.pathname → usePathname()")
        print("4. Replace router.query → useSearchParams()")

        print(f"\n📝 FILES TO FIX:")
        for pf in problematic_files:
            print(f"   📄 {pf['file']}")
            for issue in pf['issues']:
                print(f"      • {issue}")

    return problematic_files

if __name__ == "__main__":
    print("🚀 NEXTJS ROUTER ERROR ANALYSIS (FIXED VERSION)")
    print("="*60)

    problematic_files = analyze_files()

    print(f"\n✅ ANALYSIS COMPLETE!")
    if problematic_files:
        print(f"Found {len(problematic_files)} files that need fixing")
        print("📧 Share this output to get specific code fixes")
    else:
        print("No router issues found - the problem might be elsewhere")
        print("💡 Try running 'npm run build' locally to see the exact error")