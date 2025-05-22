// src/components/common/schema-generator.tsx
import Head from 'next/head';
import React from 'react';

import { SEO, COMPANY_INFO, SITE_URL } from '@/lib/constants';

// Typdefinitionen für Schema-Objekte

// Allgemeines Schema für eine Organisation
interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  address?: AddressSchema;
  contactPoint?: ContactPointSchema[];
  [key: string]: unknown;
}

// Schema für eine Adresse
interface AddressSchema {
  '@type': string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressCountry: string;
}

// Schema für einen Kontaktpunkt
interface ContactPointSchema {
  '@type': string;
  telephone: string;
  contactType: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

// Schema für eine Website
interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description?: string;
  publisher?: {
    '@type': string;
    name: string;
  };
  inLanguage?: string;
  potentialAction?: unknown[];
}

// Schema für eine Webseite
interface WebPageSchema {
  '@context': string;
  '@type': string;
  url: string;
  name: string;
  description?: string;
  isPartOf?: {
    '@id': string;
  };
  primaryImageOfPage?: {
    '@type': string;
    contentUrl: string;
  };
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
}

// Schema für einen Artikel/Blog-Post
interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description?: string;
  image?: string | string[];
  author?: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher?: {
    '@type': string;
    name: string;
    logo?: {
      '@type': string;
      url: string;
    };
  };
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: {
    '@type': string;
    '@id': string;
  };
  articleSection?: string;
  keywords?: string;
}

// Schema für Service/Dienstleistung
interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description?: string;
  provider?: {
    '@type': string;
    name: string;
    url?: string;
  };
  serviceType?: string;
  url?: string;
  areaServed?: string | string[] | object;
  category?: string;
  offers?: unknown;
}

// Schema für Breadcrumbs
interface BreadcrumbListSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item?: string;
  }>;
}

// Schema für FAQ-Seite
interface FAQPageSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

// Typdefinitionen für Komponenten-Props
interface BaseSchemaProps {
  className?: string;
}

interface OrganizationSchemaProps extends BaseSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  socialLinks?: string[];
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
  phoneNumber?: string;
  contactType?: string;
  areaServed?: string | string[];
  availableLanguage?: string | string[];
}

interface WebsiteSchemaProps extends BaseSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  inLanguage?: string;
}

interface WebPageSchemaProps extends BaseSchemaProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string;
}

interface ArticleSchemaProps extends BaseSchemaProps {
  title: string;
  description?: string;
  imageUrl?: string;
  authorName?: string;
  authorUrl?: string;
  datePublished?: string;
  dateModified?: string;
  url?: string;
  section?: string;
  keywords?: string[];
}

interface ServiceSchemaProps extends BaseSchemaProps {
  name: string;
  description?: string;
  serviceType?: string;
  url?: string;
  areaServed?: string | string[];
  category?: string;
}

interface BreadcrumbListSchemaProps extends BaseSchemaProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

interface FAQPageSchemaProps extends BaseSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Komponenten für Schema.org-Einbindung

// Organisationsschema
export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = SEO.SITE_NAME,
  url = SITE_URL,
  logo = `${SITE_URL}/images/logos/logo_ritterdigital.png`,
  socialLinks = [],
  streetAddress = COMPANY_INFO.ADDRESS.STREET,
  city = COMPANY_INFO.ADDRESS.CITY,
  postalCode = COMPANY_INFO.ADDRESS.ZIP,
  countryCode = 'DE',
  phoneNumber = COMPANY_INFO.PHONE,
  contactType = 'customer service',
  areaServed = 'DE',
  availableLanguage = ['German', 'English'],
}) => {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    ...(socialLinks.length > 0 && { sameAs: socialLinks }),
    address: {
      '@type': 'PostalAddress',
      streetAddress,
      addressLocality: city,
      postalCode,
      addressCountry: countryCode,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: phoneNumber,
        contactType,
        areaServed,
        availableLanguage,
      },
    ],
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Website-Schema
export const WebsiteSchema: React.FC<WebsiteSchemaProps> = ({
  name = SEO.SITE_NAME,
  url = SITE_URL,
  description = SEO.DEFAULT_DESCRIPTION,
  inLanguage = 'de-DE',
}) => {
  const schema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
    description,
    inLanguage,
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${url}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    ],
    publisher: {
      '@type': 'Organization',
      name,
    },
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Webseiten-Schema
export const WebPageSchema: React.FC<WebPageSchemaProps> = ({
  url = SITE_URL,
  title = SEO.SITE_NAME,
  description,
  imageUrl,
  datePublished,
  dateModified = new Date().toISOString(),
  inLanguage = 'de-DE',
}) => {
  const schema: WebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url,
    name: title,
    description,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    inLanguage,
    datePublished: datePublished || new Date().toISOString(),
    dateModified,
  };

  if (imageUrl) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      contentUrl: imageUrl,
    };
  }

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Artikel/Blog-Post-Schema
export const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  imageUrl,
  authorName = COMPANY_INFO.NAME,
  authorUrl,
  datePublished = new Date().toISOString(),
  dateModified,
  url = typeof window !== 'undefined' ? window.location.href : '',
  section = 'Blog',
  keywords = [],
}) => {
  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl && { url: authorUrl }),
    },
    publisher: {
      '@type': 'Organization',
      name: SEO.SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logos/logo_ritterdigital.png`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: section,
    ...(keywords.length > 0 && { keywords: keywords.join(', ') }),
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Service/Dienstleistung-Schema
export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  serviceType,
  url = typeof window !== 'undefined' ? window.location.href : '',
  areaServed = 'DE',
  category,
}) => {
  const schema: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: SEO.SITE_NAME,
      url: SITE_URL,
    },
    ...(serviceType && { serviceType }),
    url,
    areaServed,
    ...(category && { category }),
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Breadcrumb-Schema
export const BreadcrumbListSchema: React.FC<BreadcrumbListSchemaProps> = ({
  items,
}) => {
  const schema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// FAQ-Schema
export const FAQPageSchema: React.FC<FAQPageSchemaProps> = ({ questions }) => {
  const schema: FAQPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <Head>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
};

// Verbesserte Typdefinitionen für SchemaGeneratorProps
interface ArticleData extends ArticleSchemaProps {}
interface ServiceData extends ServiceSchemaProps {}
interface OrganizationData extends OrganizationSchemaProps {}
interface WebsiteData extends WebsiteSchemaProps {}
interface WebPageData extends WebPageSchemaProps {}

interface AllSchemaData {
  organization?: Partial<OrganizationSchemaProps>;
  website?: Partial<WebsiteSchemaProps>;
  webpage?: Partial<WebPageSchemaProps>;
  breadcrumb?: Array<{ name: string; url?: string }>;
  faq?: Array<{ question: string; answer: string }>;
}

// Kombiniere alle Schema für eine Seite in einer Komponente
type SchemaGeneratorProps =
  | { type: 'website'; data: Partial<WebsiteData> }
  | { type: 'webpage'; data: Partial<WebPageData> }
  | { type: 'article'; data: ArticleData }
  | { type: 'service'; data: ServiceData }
  | { type: 'organization'; data: Partial<OrganizationData> }
  | { type: 'all'; data: AllSchemaData };

export const SchemaGenerator: React.FC<SchemaGeneratorProps> = ({
  type,
  data,
}) => {
  switch (type) {
    case 'website':
      return <WebsiteSchema {...data} />;
    case 'webpage':
      return <WebPageSchema {...data} />;
    case 'article':
      // Hier ist data vom Typ ArticleData, das den erforderlichen 'title' haben muss
      return <ArticleSchema {...data} />;
    case 'service':
      // Hier ist data vom Typ ServiceData, das den erforderlichen 'name' haben muss
      return <ServiceSchema {...data} />;
    case 'organization':
      return <OrganizationSchema {...data} />;
    case 'all':
      return (
        <>
          <OrganizationSchema {...(data.organization || {})} />
          <WebsiteSchema {...(data.website || {})} />
          <WebPageSchema {...(data.webpage || {})} />
          {data.breadcrumb && <BreadcrumbListSchema items={data.breadcrumb} />}
          {data.faq && <FAQPageSchema questions={data.faq} />}
        </>
      );
    default:
      return null;
  }
};

export default SchemaGenerator;
