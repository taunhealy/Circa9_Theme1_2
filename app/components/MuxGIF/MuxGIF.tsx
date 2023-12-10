// MuxGIF.tsx

import React from "react";

interface MuxGIFProps {
  src: string;
  alt: string; // Add alt property
}

const MuxGIF: React.FC<MuxGIFProps> = ({ src, alt }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} />;
};

export default MuxGIF;
