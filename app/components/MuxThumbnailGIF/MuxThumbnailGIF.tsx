/* eslint-disable @next/next/no-img-element */
// MuxThumbnailGIF.tsx

import React from "react";

interface MuxThumbnailGIFProps {
  playbackId: string;
  className?: string; // Add class
}

const MuxThumbnailGIF: React.FC<MuxThumbnailGIFProps> = ({
  playbackId,
  className,
}) => {
  return (
    <div className={className}>
      <img
        src={`https://image.mux.com/${playbackId}/animated.gif?width=540`}
        alt="mux-gif"
        className="card-gif" // Add the class here
      />
    </div>
  );
};

export default MuxThumbnailGIF;
