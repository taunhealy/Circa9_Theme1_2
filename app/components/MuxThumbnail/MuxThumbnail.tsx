// app\components\MuxThumbnail\MuxThumbnail.tsx

import React from "react";

export interface MuxThumbnailProps {
  playbackId?: string | number;
  time: number;
  src?: string;
  className?: string;
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({ playbackId }) => {
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?time=7`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={thumbnailUrl}
      alt="Video Thumbnail"
      className="thumbnail-image"
      // Add className prop if needed
    />
  );
};

export default MuxThumbnail;
