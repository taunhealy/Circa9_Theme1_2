// MuxGIF.tsx

import React from "react";

interface MuxGIFProps {
  src: string;
  alt: string;
  className?: string; // Make className optional
}

const MuxGIF: React.FC<MuxGIFProps> = ({ src, alt, className }) => {
  // Add the className to the img element
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
};

export default MuxGIF;
