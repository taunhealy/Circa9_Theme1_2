"use client";

// YourMainComponent.tsx
import React, { useState } from "react";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";
import StretchSlider from "./components/Slider/StretchSlider/StretchSlider";
import "./page.css";

import ItemsData, { DataProp } from "./data/data";

interface PageProps {
  onClick: Function;
}

enum ActiveSlider {
  Swiper,
  Stretch,
}

function Page() {
  const [selectedItem, setSelectedItem] = useState<DataProp | null>(null);
  const [activeSlider, setActiveSlider] = useState<ActiveSlider>(
    ActiveSlider.Stretch
  );

  const handleThumbnailClick = (item: DataProp) => {
    setSelectedItem(item);
  };

  const closeModal = () => {};

  const handleSliderChange = (slider: ActiveSlider) => {
    setActiveSlider(slider);
  };

  return (
    <div>
      {/* Other components */}
      {activeSlider === ActiveSlider.Swiper && (
        <SliderSwiper items={ItemsData} onItemClicked={handleThumbnailClick} />
      )}
      {activeSlider === ActiveSlider.Stretch && (
        <StretchSlider items={ItemsData} onItemClicked={handleThumbnailClick} />
      )}

      {/* Buttons to toggle between sliders */}
      <div className="button-toggle">
        <button onClick={() => handleSliderChange(ActiveSlider.Swiper)}>
          Swiper
        </button>
        <button onClick={() => handleSliderChange(ActiveSlider.Stretch)}>
          Horizontal
        </button>
      </div>
    </div>
  );
}

export default Page;
