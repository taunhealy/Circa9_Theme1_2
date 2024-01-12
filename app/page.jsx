"use client";

import React, { useState } from "react";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";
import StretchSlider from "./components/Slider/StretchSlider/StretchSlider";
import SliderScrollVertical from "./components/Slider/SliderScrollVertical/SliderScrollVertical";
import "./page.css"; // Adjust the path accordingly
import ItemsData from "./data/data";
import LenisHorizontal from "./components/Slider/LenisHorizontal/LenisHorizontal";

function Page() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeSlider, setActiveSlider] = useState("Scroll");

  const handleThumbnailClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    // Add logic to close the modal or any cleanup
  };

  const handleSliderChange = (slider) => {
    setActiveSlider(slider);
  };

  return (
    <div>
      {/* Other components */}
      {activeSlider === "Swiper" && (
        <SliderSwiper items={ItemsData} onItemClicked={handleThumbnailClick} />
      )}
      {activeSlider === "Scroll" && (
        <SliderScrollVertical
          items={ItemsData}
          onItemClicked={handleThumbnailClick}
        />
      )}
      {activeSlider === "Stretch" && (
        <StretchSlider
          items={ItemsData}
          onItemClicked={handleThumbnailClick}
          onCloseModal={handleCloseModal} // Pass the onCloseModal prop
        />
      )}
      {activeSlider === "Horizontal" && (
        <LenisHorizontal
          items={ItemsData}
          onItemClicked={handleThumbnailClick}
          onCloseModal={handleCloseModal} // Pass the onCloseModal prop
        />
      )}

      {/* Buttons to toggle between sliders */}
      <div className="button-toggle">
        <button onClick={() => handleSliderChange("Swiper")}>Swiper</button>
        <button onClick={() => handleSliderChange("Scroll")}>Scroll</button>
        <button onClick={() => handleSliderChange("Horizontal")}>
          Horizontal
        </button>
      </div>
    </div>
  );
}

export default Page;
