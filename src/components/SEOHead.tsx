import React, { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  schema?: Record<string, any> | Array<Record<string, any>>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'sewa motor labuan bajo, scooter rental labuan bajo, car rental labuan bajo, komodo speedboat tour, hellobajo, rental motor bandara komodo',
  canonicalUrl = 'https://hellobajo.com',
  ogImage = '/logo.png',
  ogType = 'website',
  schema,
}) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Helper to set meta attribute
    const setMeta = (selector: string, attr: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          element.setAttribute('name', selector.replace("meta[name='", '').replace("']", ''));
        } else if (selector.startsWith('meta[property=')) {
          element.setAttribute('property', selector.replace("meta[property='", '').replace("']", ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attr, value);
    };

    // Format image URL to ensure absolute path for social media crawlers
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `https://hellobajo.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    setMeta("meta[name='description']", 'content', description);
    setMeta("meta[name='keywords']", 'content', keywords);

    // OpenGraph
    setMeta("meta[property='og:title']", 'content', title);
    setMeta("meta[property='og:description']", 'content', description);
    setMeta("meta[property='og:image']", 'content', fullImageUrl);
    setMeta("meta[property='og:type']", 'content', ogType);

    // Canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Dynamic JSON-LD Schema
    const schemaId = 'dynamic-json-ld-schema';
    let scriptTag = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (scriptTag) {
      scriptTag.remove();
    }

    if (schema) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaId;
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schema);
      document.head.appendChild(scriptTag);
    }

    return () => {
      // Clean up script on unmount
      const existing = document.getElementById(schemaId);
      if (existing) {
        existing.remove();
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
};
