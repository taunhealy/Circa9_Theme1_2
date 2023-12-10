// Slider.tsx
import React, { useState } from "react";
import "../slider.scss"; // Import external CSS file

interface SliderProps {
  items: JSX.Element[];
}

const SliderButtons: React.FC<SliderProps> = ({ items }) => {
  const [slider, setSlider] = useState(0);

  const moveRight = () => {
    setSlider((prev) => prev + 1);
  };

  const moveLeft = () => {
    setSlider((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="slider-container">
      <button className="left-button" onClick={moveLeft} aria-label="Move Left">
        <div className="text">&#60;</div>
      </button>
      <div
        className={`slider`}
        style={{ transform: `translateX(-${slider * (100 / items.length)}%)` }}
      >
        {items}
      </div>
      <button
        className="right-button"
        onClick={moveRight}
        aria-label="Move Right"
      >
        <div className="text">&#62;</div>
      </button>
    </div>
  );
};

export default SliderButtons;
