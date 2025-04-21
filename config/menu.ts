// config/menu.ts
// Definition der Navigationselemente für die gesamte Website

export interface MenuItem {
  title: string;
  href: string;
  submenu?: MenuItem[];
}

export const mainMenuItems: MenuItem[] = [
  {
    title: 'Leistungen',
    href: '/leistungen',
    submenu: [
      { title: 'Business Intelligence', href: '/leistungen/business-intelligence' },
      { title: 'Data Warehouse', href: '/leistungen/data-warehouse' },
      { title: 'Softwareentwicklung', href: '/leistungen/softwareentwicklung' },
      { title: 'Künstliche Intelligenz', href: '/leistungen/kuenstliche-intelligenz' },
    ],
  },
  { title: 'Über Uns', href: '/ueber-uns' },
  { title: 'Blog', href: '/blog' },
];

// Menüpunkte für den Footer
export const footerMenuItems = {
  services: [
    { title: 'Business Intelligence', href: '/leistungen/business-intelligence' },
    { title: 'Data Warehouse', href: '/leistungen/data-warehouse' },
    { title: 'Softwareentwicklung', href: '/leistungen/softwareentwicklung' },
    { title: 'Künstliche Intelligenz', href: '/leistungen/kuenstliche-intelligenz' },
  ],
  company: [
    { title: 'Über Uns', href: '/ueber-uns' },
    { title: 'Blog', href: '/blog' },
    { title: 'Karriere', href: '/karriere' },
  ],
  legal: [
    { title: 'Impressum', href: '/impressum' },
    { title: 'Datenschutz', href: '/datenschutz' },
  ],
};

// Soziale Medien
export const socialMedia = [
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ritter-digital-gmbh/',
    icon: 'Linkedin',
  },
  { title: 'Xing', href: 'https://www.xing.com/pages/ritterdigitalgmbh', icon: 'Xing' },
];
