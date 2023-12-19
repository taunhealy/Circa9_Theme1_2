"use client";

// YourMainComponent.tsx
import React, { useState } from "react";
import PortfolioItemModal from "./components/PortfolioItemsModal/ModalComponent";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";

import ItemsData, { DataProp } from "./data/data";

interface PageProps {
  onClick: Function;
}

function Page() {
  const [selectedItem, setSelectedItem] = useState<DataProp | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleThumbnailClick = (item: DataProp) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* Other components */}
      <SliderSwiper items={ItemsData} onItemClicked={handleThumbnailClick} />

      {/* Render the modal conditionally */}
      {selectedItem && (
        <PortfolioItemModal
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedItem={selectedItem}
        />
      )}
    </div>
  );
}

export default Page;
