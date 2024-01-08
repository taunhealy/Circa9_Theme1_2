/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import "./stretchslider.css";
import { DataProp } from "@/app/data/data";
import Image from "next/image";

type Slide = DataProp;
interface StretchSliderProps {
  items?: DataProp[];
  onItemClicked: (item: DataProp) => void;
  onCloseModal: () => void;
}

const StretchSlider: React.FC<StretchSliderProps> = ({
  items = [],
  onItemClicked,
  onCloseModal,
}) => {
  const slides: Slide[] = require("../../../data/data").default;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false); // Add isModalOpen state

  const handleSlide = (direction: "prev" | "next") => {
    setActiveSlide((prevActiveSlide) =>
      direction === "next"
        ? Math.min(prevActiveSlide + 1, slides.length - 1)
        : Math.max(prevActiveSlide - 1, 0)
    );
  };

  const handleModal = () => {
    if (onCloseModal) {
      onCloseModal();
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    // Add logic to handle modal visibility, e.g., adding/removing classes to the modal element
    // You can use a state variable to manage modal visibility
    if (isModalOpen) {
      // Add logic to show the modal
      // For example, add a CSS class to the modal element
    } else {
      // Add logic to hide the modal
      // For example, remove a CSS class from the modal element
    }
  }, [isModalOpen]);

  return (
    <div className="stretch-slider-container">
      <div
        className="slides"
        style={{ transform: `translateY(-${activeSlide * 100}vh)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={`stretch-slider-item`}>
            <Image
              className="thumbnail-image"
              src="/images/marcell-rubies-cKGtI-S5EPY-unsplash.webp" // Hardcoded path for testing
              alt="Thumbnail Image"
              width="500"
              height="500"
            />
          </div>
        ))}
      </div>
      <button onClick={() => handleSlide("prev")}>Previous</button>
      <button onClick={() => handleSlide("next")}>Next</button>
    </div>
  );
};

export default StretchSlider;
