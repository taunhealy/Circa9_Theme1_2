// Slider.tsx
import React, { useState, useRef, useEffect } from "react";
import "./slider.scss"; // Import external CSS file

interface SliderProps {
  items: JSX.Element[];
}

const Slider: React.FC<SliderProps> = ({ items }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderLeft, setSliderLeft] = useState(0);

  const handleWheel = (e: React.WheelEvent) => {
    // Adjust the scroll speed based on your preference
    const scrollSpeed = 10;
    const delta = e.deltaY || e.detail || e.wheelDelta;

    setSliderLeft((prevLeft) => {
      const newLeft = prevLeft + delta / scrollSpeed;
      return Math.max(0, Math.min(newLeft, getMaxSliderLeft()));
    });
  };

  const getMaxSliderLeft = () => {
    if (sliderRef.current) {
      return sliderRef.current.clientWidth - sliderRef.current.scrollWidth;
    }
    return 0;
  };

  // Attach and detach the wheel event listener
  useEffect(() => {
    const sliderElement = sliderRef.current;

    const handleScroll = (e: Event) => {
      e.preventDefault();
    };

    if (sliderElement) {
      sliderElement.addEventListener("wheel", handleWheel, { passive: false });
      sliderElement.addEventListener("scroll", handleScroll, {
        passive: false,
      });
    }

    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener("wheel", handleWheel);
        sliderElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div ref={sliderRef} className="slider-container">
      <div
        className={`slider`}
        style={{ transform: `translateX(-${sliderLeft}px)` }}
      >
        {items}
      </div>
    </div>
  );
};

export default Slider;
