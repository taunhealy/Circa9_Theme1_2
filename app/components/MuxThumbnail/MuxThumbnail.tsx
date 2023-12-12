import React, { useState, useEffect } from "react";
import PortfolioItemModal from "../PortfolioItemsModal/ModalComponent";
import { DataProp } from "@/app/data/data"; // Import your data type

export interface MuxThumbnailProps {
  playbackId?: string | number;
  time: number;
  src?: string;
  className?: string;
  itemData: DataProp; // Pass the item data to the thumbnail
}

const MuxThumbnail: React.FC<MuxThumbnailProps> = ({
  playbackId,
  time,
  className,
  itemData,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Check if playbackId is defined before constructing the thumbnailUrl
  const thumbnailUrl = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.png?`
    : ""; // Provide a default empty string or handle it accordingly

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!playbackId) {
      console.warn("Playback ID is undefined:", itemData); // Log a warning
      return;
    }

    const img = new Image();
    img.onload = () => setIsImageLoaded(true);
    img.src = thumbnailUrl;

    return () => {
      // Cleanup the image object
      img.onload = null;
    };
  }, [thumbnailUrl, playbackId, itemData]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div
        className={`thumbnail-container ${className}`}
        onClick={openModal} // Open modal on thumbnail click
      >
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
      <PortfolioItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedItem={itemData}
      />
    </>
  );
};

export default MuxThumbnail;
