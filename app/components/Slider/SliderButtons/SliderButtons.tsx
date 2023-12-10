// SliderButtons.tsx
import React, { useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface Item {
  id: number;
  title: string;
  img: string;
  date: string;
}

interface SliderProps {
  items: Item[];
  itemsPerSlide: number;
  onMoveButtonClick: () => void;
}

const SliderButtons: React.FC<SliderProps> = ({
  items,
  itemsPerSlide,
  onMoveButtonClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = Math.ceil(items.length / itemsPerSlide);

  const moveRight = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    onMoveButtonClick();
  };

  const moveLeft = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    onMoveButtonClick();
  };

  const renderItemsForCurrentSlide = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return items.slice(startIndex, endIndex).map((item, index) => (
      <div key={index} className={`layoutall item item${index + 1}`}>
        <Image
          src={item.img}
          alt={item.title}
          width={600}
          height={400}
          className="image"
        />
        <div className="item-title">
          <h2>{item.title}</h2>
        </div>
      </div>
    ));
  };

  // Helper function for fade-in and fade-out
  const animateFadeInOut = (fadeIn: boolean) => {
    const layoutItems = document.querySelectorAll(".layoutall .item");
    if (layoutItems) {
      gsap.to(layoutItems, {
        opacity: fadeIn ? 1 : 0,
        duration: 0.4,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <div className="slider-container">
      <button
        className="left-button"
        onClick={() => {
          moveLeft();
          animateFadeInOut(false);
        }}
        aria-label="Move Left"
      >
        <div className="text">&#60;</div>
      </button>
      <div
        className={`slider`}
        style={{
          transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
        }}
      >
        {renderItemsForCurrentSlide()}
      </div>
      <button
        className="right-button"
        onClick={() => {
          moveRight();
          animateFadeInOut(true);
        }}
        aria-label="Move Right"
      >
        <div className="text">&#62;</div>
      </button>
    </div>
  );
};

export default SliderButtons;
