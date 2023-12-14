/* eslint-disable @next/next/no-img-element */
// ModalComponent.tsx
import React from "react";
import Modal from "react-modal";
import { DataProp } from "@/app/data/data";

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: DataProp | null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  if (!selectedItem) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Portfolio Item Modal"
      className="portfolio-item-modal"
      overlayClassName="portfolio-item-modal-overlay"
    >
      {/* Render your item details inside the modal */}
      <div className="portfolio-item-details">
  

        <div className="credits-sidebar">
          {/* Render your credits titles and values here */}
          <div className="credit-item">
            <div className="credit-title">Production2222:</div>
            <div className="credit-value">{selectedItem.production}</div>
          </div>
          <div className="credit-item">
            <div className="credit-title">Director:</div>
            <div className="credit-value">{selectedItem.director}</div>
          </div>
          <div className="credit-item">
            <div className="credit-title">Producer:</div>
            <div className="credit-value">{selectedItem.producer}</div>
          </div>
          <div className="credit-item">
            <div className="credit-title">DOP:</div>
            <div className="credit-value">
              {selectedItem.directorofphotography}
            </div>
          </div>
          <div className="credit-item">
            <div className="credit-title">Editor:</div>
            <div className="credit-value">{selectedItem.editor}</div>
          </div>
          {/* Add more divs for other credits */}
        </div>

        {/* Add other details like thumbnail, video player, etc. */}
        <div className="item-thumbnail">
          {/* Render your thumbnail here */}
          <img
            src={`https://image.mux.com/${selectedItem.playbackId}/thumbnail.png?time=7`}
            alt="Video Thumbnail"
          />
        </div>

        {/* Add more details as needed */}
        <div className="item-description">{selectedItem.desc}</div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
