import React, { useState, useEffect } from "react";

export interface MuxThumbnailProps {
  playbackId?: string | number;
  time: number;
  src?: string;
  className?: string;
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({
  playbackId,
  time,
  className,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.png?time=${time}`;

  useEffect(() => {
    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = thumbnailUrl;

    return () => {
      // Cleanup the image object
      img.onload = null;
    };
  }, [thumbnailUrl]);

  return (
    <div className={`thumbnail-container ${className}`}>
      {isImageLoaded ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumbnailUrl}
          alt="Video Thumbnail"
          className="thumbnail-image"
        />
      ) : (
        // Loading spinner or placeholder while the image is loading
        <div className="loading-spinner">Loading...</div>
      )}
    </div>
  );
};

export default MuxThumbnail;
