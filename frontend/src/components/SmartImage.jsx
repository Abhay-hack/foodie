import React from 'react';

const SmartImage = ({ src, alt = '', className = '', fallback = '/assets/placeholder-300x200.png', altTextFallback = 'Image' }) => {
  const svgPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'>
      <rect width='100%' height='100%' fill='#FAFAFA'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#2B2D42' font-family='Nunito, sans-serif' font-size='20'>${altTextFallback}</text>
    </svg>`
  )}`;

  const handleError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = fallback || svgPlaceholder;
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      decoding="async"
    />
  );
};

export default SmartImage;