import os

def print_file_content(file_path):
    """Print the content of a file with a nice header."""
    print("\n" + "=" * 80)
    print(f"FILE: {file_path}")
    print("=" * 80)

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            print(content)
    except Exception as e:
        print(f"Error reading file: {str(e)}")

def main():
    # Projektroot-Verzeichnis
    project_root = "C:\\Users\\damja\\WebstormProjects\\RitterDigitalSite"

    # Liste der Dateien, die wir untersuchen und korrigieren müssen
    files_to_fix = [
        os.path.join(project_root, "next.config.js"),
        os.path.join(project_root, "src", "pages", "_document.tsx"),
        os.path.join(project_root, "src", "pages", "_app.tsx"),
        os.path.join(project_root, "src", "pages", "home", "components", "Benefits.tsx"),
        os.path.join(project_root, "src", "components", "common", "image-with-fallback.tsx")
    ]

    # Suche nach Dateien, die auf fehlende Bilder verweisen
    image_references = []
    for root, dirs, files in os.walk(os.path.join(project_root, "src")):
        for file in files:
            if file.endswith((".tsx", ".ts", ".jsx", ".js")):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if "modern-office-building.png" in content or "abstract-tech-logo.png" in content:
                            if file_path not in files_to_fix and file_path not in image_references:
                                image_references.append(file_path)
                except:
                    pass

    # Ausgabe aller Dateien
    print(f"Found {len(files_to_fix)} primary files to fix:")
    for file in files_to_fix:
        if os.path.exists(file):
            print_file_content(file)
        else:
            print(f"\nWARNING: File not found: {file}")

    # Ausgabe aller Dateien mit Bildreferenzen
    if image_references:
        print(f"\n\nFound {len(image_references)} additional files with image references:")
        for file in image_references:
            print_file_content(file)

    # Alternative Bilder auflisten
    print("\n\nAvailable alternative images:")
    images_dir = os.path.join(project_root, "public", "images")
    public_dir = os.path.join(project_root, "public")

    all_images = []

    # Bilder im public-Verzeichnis
    for file in os.listdir(public_dir):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.gif')):
            all_images.append(os.path.join("public", file))

    # Bilder in Unterverzeichnissen
    for root, dirs, files in os.walk(images_dir):
        rel_path = os.path.relpath(root, project_root)
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg', '.gif')):
                all_images.append(os.path.join(rel_path, file))

    for image in sorted(all_images):
        print(f"  - {image}")

if __name__ == "__main__":
    main()