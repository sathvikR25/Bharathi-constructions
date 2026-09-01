import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, image, url }) {
  const defaultTitle = "Bharathi Constructions | Luxury Real Estate in Hyderabad";
  const defaultDesc = "Experience unparalleled luxury with Bharathi Constructions. Premium gated communities and residential apartments in Hyderabad.";
  const defaultImage = "https://bharathiconstructionshyd.com/wp-content/uploads/2023/11/Bharathi-constructions-new-logo.png";
  
  const seoTitle = title ? `${title} | Bharathi Constructions` : defaultTitle;
  
  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || window.location.href} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
