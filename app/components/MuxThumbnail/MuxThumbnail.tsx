import React from "react";
import { DataProp } from "@/app/data/data";

interface MuxThumbnailProps {
  playbackId?: string | number;
  time: number;
  className?: string;
  itemData?: DataProp; // Add itemData prop here
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({
  playbackId,
  time,
  className = "",
  itemData,
}) => {
  return (
    <div className={`thumbnail-container ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://image.mux.com/${playbackId}/thumbnail.png?time=${time}`}
        alt="Video Thumbnail"
        className="thumbnail-image"
      />
    </div>
  );
};

export default MuxThumbnail;
